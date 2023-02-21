const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

module.exports = {
  
    addUser : async (req , res) => {

        const account_id = req.query.accountId;

        const email = req.body.email;

        const user = [];

        const findUser = await Account.findOne({_id : account_id})

        console.log("This is Account Details");
        console.log(findUser);

        for(let i = 0; i<findUser.users.length ; i++){
            user.push(findUser.users[i])
        }
        user.push(email);

        await Account.updateOne({ _id : account_id}).set({
            users : user
        })

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'parimaltank132@gmail.com',
              pass: 'qorlqlshjnfdleoy'
            }
          });

          // Find User Name
          const userDetails = await User.findOne({ id : findUser.createrId})
          
          const mailOptions = {
            from: 'parimaltank132@gmail.com',
            to:    email,
            subject: 'Welcome To Expense Manager',
            html: "<h2 style='font-weight:bold;'>"+ `${userDetails.userName}` + '</h2>' + '<h3>like to Invite you to keep track of the expense together via the Expense Manager and Collabrate With them.' + '</h3>' + "<br>" + '<h3>' + "Access Your Group Account Now."+ '</h3>' + "<br>" + "<h4>"+ "Thank & Regards,"+ '<br>' + "Team Expense Manager" + '</h4>' // html body"
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

        req.addFlash('success', 'User Successfully Added');
        res.redirect(`/transaction/getallTransaction?accountId=${account_id}`);
        
    },

    createAccount : async (req , res) => {

        const createrId = req.params.createrId;

                                          //creater id // user id
       await Account.create({createrId : createrId   , accountName : req.body.accountName , users : []} ).fetch().then(result => {
            
            // console.log('New Account Created',result);
            req.addFlash('success', 'Account Created Successfully');
            res.redirect('/account/getallAccount');
         }).catch(err => {
            req.addFlash('error', 'Account Created Failed!!! Please Try again');
            res.redirect('/account/getallAccount');
         })

    },

    deleteAccount : async ( req , res) => {

        const id = req.params.id;

        Account.destroy(id).then(result => {
        
            req.addFlash('successdelete', 'Deleted Account Successfully');
            res.redirect('/account/getallAccount');
            
        }).catch(err => {
            res.status(404).json({
                message: "Account Deletion is Failed"
            })
        })
    },

    updateAccount : async ( req , res) => {

       await Account.update({id : req.params.id} , { accountName : req.body.accountName}).then(result => {
            req.addFlash('success', 'Account Successfully Updated');
            res.redirect('/account/getallAccount')

        }).catch(err => {
            res.status(404).json({
                message : 'updation failed'
            })
        })
    },

    getallAccount : async (req , res) => {

       const token = req.cookies.token;

       const verifyUser = jwt.verify(token , process.env.JWT_KEY);
       const userId = verifyUser.password;

       console.log(userId);

       await Account.find({createrId : userId}).then(result => {

            res.view('pages/dashboard' , { accounts : result });

        }).catch(err => {
            res.status(505).json({
                message : "Erron in Get Allaccount"
            })
            // res.view('pages/dashboard' , { accounts : result });
        })
    },

    getAccountByID : async ( req , res) => {
        Account.findOne({id : req.params.id}).exec( (error , account) => {
            if(error){
                res.status(500).json({
                    message : 'Error in Get account'
                })
            }

            res.status(200).json({
                account : account
            })
            // res.send(account);
        //  res.view('pages/accounts' , { accounts : account } )
        })

    }

};

