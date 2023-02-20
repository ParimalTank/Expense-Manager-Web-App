
module.exports = {
  
    addUser : async (req , res) => {

        const account_id = req.query.accountId;

        const email = req.body.email;

        const user = [];

        const findUser = await Account.findOne({_id : account_id})

        for(let i = 0; i<findUser.users.length ; i++){
            user.push(findUser.users[i])
        }
        user.push(email);

        await Account.updateOne({ _id : account_id}).set({
            users : user
        })

        res.redirect(`/transaction/getallTransaction?accountId=${account_id}`);
        
    },

    createAccount : async (req , res) => {

        const createrId = req.params.createrId;

                                          //creater id // user id
       await Account.create({createrId : createrId   , accountName : req.body.accountName , users : []} ).fetch().then(result => {
            
            // console.log('New Account Created',result);
            res.redirect('/account/getallAccount');
           
         }).catch(err => {
             res.status(404).json({
               err : err,
               message : 'Account Creation is Failed'
             })
         })

    },

    deleteAccount : async ( req , res) => {

        const id = req.params.id;

        Account.destroy(id).then(result => {
        
            res.redirect('/account/getallAccount');

        }).catch(err => {
            res.status(404).json({
                message: "Account Deletion is Failed"
            })
        })
    },

    updateAccount : async ( req , res) => {

       await Account.update({id : req.params.id} , { accountName : req.body.accountName}).then(result => {

            res.redirect('/account/getallAccount')

        }).catch(err => {
            res.status(404).json({
                message : 'updation failed'
            })
        })
    },

    getallAccount : async (req , res) => {
       await Account.find({}).then(result => {

            res.view('pages/dashboard' , { accounts : result });

        }).catch(err => {
            res.view('pages/dashboard' , { accounts : result });
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

