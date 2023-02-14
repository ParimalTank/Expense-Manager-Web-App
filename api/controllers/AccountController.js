// const Account = require("../models/Account");

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
        user.push(email)
        console.log(user);

        await Account.updateOne({ _id : id}).set({
            users : user
        })
        
    },

    createAccount : async (req , res) => {

       await Account.create({accountName : 'GoaTrip' ,userAccountType : 'Expense' , users : []}).fetch().then(result => {
            
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
     
         const users = User.find().populate('userName');
         console.log("This is UserName" + JSON.stringify(users));
    }

};

