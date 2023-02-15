
module.exports = {
  
    addUser : async (req , res) => {

        const email = 'parimalt8960@zignuts.com';
        const id = '63eb5c61de202114a9ec542a';

        // const email = req.body.email;
        // const id =  req.params.id;

        const user = [];

        const findUser = await Account.findOne({_id : id})
        console.log(findUser);

        for(let i = 0; i<findUser.users.length ; i++){
            user.push(findUser.users[i])
        }
        user.push(email);
        console.log(user);

        await Account.updateOne({ _id : id}).set({
            users : user
        })
        
    },

    createAccount : async (req , res) => {

       await Account.create({createrId : '63ec82e89aebdb0bf4c60ab3'   , accountName : 'GoaTrip' ,userAccountType : 'Expense' , users : []} ).fetch().then(result => {
            
            console.log('New Account Created',result);
            res.status(200).json({
                message : 'New Account Created',
                result : result
            })
           
         }).catch(err => {
             res.status(404).json({
               err : err,
               message : 'Account Creation is Failed'
             })
         })
     
         const users = await User.findOne({ _id : '63ec889717643a0d4190a848'}).populate('userAccounts');
         console.log(users);
    },

    deleteAccount : async ( req , res) => {

        const id = req.params.id;

        Account.destroy(id).then(result => {
            res.status(200).json({
                message : "Account Deleted"
            })
        }).catch(err => {
            res.status(404).json({
                message: "Account Deletion is Failed"
            })
        })
    },

    updateAccount : async ( req , res) => {

        Account.updateOne({id : req.params.id} , { accountName : 'GoaTrip' ,userAccountType : 'Expense' , users : [] }).then(result => {

            res.status(200).json({
                message : 'Updated Successfully'
            })
        }).catch(err => {
            res.status(404).json({
                message : 'updation failed'
            })
        })
    },

    getallAccount : async (req , res) => {
       await Account.find({}).then(result => {
            // res.status(200).json({
            //     result : result,
            //     message : "All Accounts"
            // })
            console.log(result);

            res.view('pages/dashboard' , { accounts : result });

        }).catch(err => {
            res.status(404).then({
                message : "Failed"
            })
        })
    },

    getallAccountByID : async ( req , res) => {
        Account.find({_id : req.params.id}).exec( (error , account) => {
            if(error){
                res.send(500 , { error : 'Database Error'})
            }
            res.view('pages/accounts' , )
        })

    }

};

