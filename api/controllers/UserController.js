const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  
    // User Signup
    signUp : async function(req ,res){

       await User.find({ email : req.body.email}).then((user) => {
        
            if(user.length >= 1){
                res.status(409).json({
                    message : "Already Have a Account Using This Email , Try Another one"
                })
            } else {
                bcrypt.hash(req.body.password , 10 , async (err , hash) => {
                    console.log('This is Hash'+ hash);
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

                            // res.status(201).json({
                            //     user: user,
                            //     message: " User Created Successfully",
                            // })
                          
                        res.cookie("token" , token , { httpOnly : true}).send();
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
        await User.findOne({email : req.body.email})
        .then(user => {
            if(user.length < 1){
                return res.status(404).json({
                    message : "Auth Fail"
                })
            } else{

                // chech entered userName exist into a database or not.
                if(req.body.userName == user.userName)
                {
                 bcrypt.compare(req.body.password , user.password , (err , result) =>{

                    if(err){
                        res.status(401).json({
                            message : "Auth Fails"
                        })
                    }
 
                    if(result){
                        const token = jwt.sign({
                            userName: user.userName,
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
            }else{
                res.status(400).json({
                    message : 'Auth Failed'
                })
            }
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
    }
};

