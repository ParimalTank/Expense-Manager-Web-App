// const Account = require("../models/Account");

module.exports = {
  
    addUser : async (req , res) => {

        const email = 'parimalt8960@zignuts.com';
        const id = '63e9e223b2a88f0bdb096406';

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
        
    }

};

