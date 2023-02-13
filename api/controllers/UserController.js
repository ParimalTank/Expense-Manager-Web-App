const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let otp = Math.random();
otp = otp * 1000000;
otp = parseInt(otp);

module.exports = {
  
    // User Signup
    signUp : async (req ,res) => {

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
                                  pass: 'qorlqlshjnfdleoy'
                                }
                              });
                              
                              const mailOptions = {
                                from: 'parimaltank132@gmail.com',
                                to:  user.email,
                                subject: 'Welcome To Expense Manager',
                                html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" // html body"
                              };
                              
                              transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });

                              Account.create({userAccount : 'default' , userName : req.body.userName , users : [] }).fetch().then(result => {
                                // res.status(200).json({
                                //    result : result,
                                //    message : 'Default Account Created.....'
                                // })
                                res.cookie("token" , token , { httpOnly : true}).view('pages/verification' , { msg : -1});
                                console.log('Default Account Created',result);
                             }).catch(err => {
                                 res.status(404).json({
                                   err : err,
                                   message : 'Default Account Creation is Failed'
                                 })
                             })

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
    
    login : async (req , res) => {

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
                     res.cookie("token" , token , {httpOnly : true }).redirect('/dashboard');
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

    logout : async (req , res) => {
        try{
            res.clearCookie('token').redirect('/');
        }catch(err){
            res.status(500).json({
                error : err
            })
        }
    },

    verification : async (req , res) => {
        if(req.body.otp==otp){
            res.view('pages/verification',{msg : 1});
        }
        else{
            res.view('pages/verification',{msg : 0});
        }
    }
};

