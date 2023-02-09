const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

module.exports = {
  
    // User Signup
    signUp : async function(req ,res){

        console.log('Respoce From Signup side' + req.body);

       await User.find({ email : req.body.email}).then((user) => {
        
            if(user.length >= 1){
                
                res.status(409).json({
                    message : "Already Have a Account Using This Email , Try Another one"
                })
            } else {
                bcrypt.hash(req.body.password , 10 , async (err , hash) => {
                   
                    if(err){
                        return res.status(500).json({
                            error : err,
                        })
                    } else {
                       
                     await User.create({userName: req.body.userName , email : req.body.email , password: hash}).fetch().then((user) => {

                            const token = jwt.sign(
                                {
                                    email : user.email,
                                    password : user.id
                                },
                                process.env.JWT_KEY,
                                {
                                    expiresIn : '1h'
                                }
                            )

                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                  user: 'parimaltank132@gmail.com',
                                  pass: ''
                                }
                              });
                              
                              const mailOptions = {
                                from: 'parimaltank132@gmail.com',
                                to:  user.email,
                                subject: 'Welcome To Expense Manager',
                                text: `Hi! There, You have recently visited our website and entered your email.Please follow the given link to verify your email
                                http://localhost:1337/user/verification/${token} 
                                
                                Thanks`
                              };
                              
                              transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });
                          
                        res.cookie("token" , token , { httpOnly : true}).view('layouts/verification', { error: null, token: token});
                        
                        })
                        .catch((err) => {
                            console.log(err);

                            res.status(400).json({
                                error : err,
                                message: 'Auth Fail'
                            })
                        })
                    }
                })
            }

            
        }).catch(error => {

            res.status(500).json({
                message: "Auth Fails",
            })
        })
    },

    // User Login
    
    login : async function(req , res) {

        console.log(req.body);

        await User.findOne({email : req.body.email})
        .then(user => {
            if(user.length < 1){
                return res.status(404).json({
                    message : "Auth Fail"
                })
            } else{

                // chech entered userName exist into a database or not.

                 bcrypt.compare(req.body.password , user.password , (err , result) =>{

                    if(err){
                        res.status(401).json({
                            message : "Auth Fails"
                        })
                    }
 
                    if(result){
                        const token = jwt.sign({
                            email: user.email,
                            password:user._id
                        },
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }
                     );
                     console.log("Login Sucessfully");
                     res.cookie("token" , token , {httpOnly : true }).send();
                    } else{
                        res.status(400).json({
                            message : 'Auth Failed'
                        })
                    }
                })
         
          }
        })
        .catch(err => {
            return res.status(400).json({
                message : 'Auth Failed'
            })
        })

    },

   

    // For Logout 

    logout : async function(req , res){
        try{
            console.log("SuccessFully Logout");
            res.clearCookie('token');
        }catch(err){
            res.status(500).json({
                error : err
            })
        }
    },

    verification : async function(req , res){
        console.log("Verification Called");
        res.redirect('/homepage');
    }
};

