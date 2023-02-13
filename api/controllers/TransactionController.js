
module.exports = {
  
  addTransaction : (req , res) =>{

    const account_Id = req.body.account_Id;
    const transactionuserName = req.body.transactionuserName;
    const transactionType = req.body.transactionType;
    const transactionAmount = req.body.transactionAmount;
    const transactionDescription = req.body.transactionDescription;


    Transaction.create({account_Id : account_Id , transactionuserName : transactionuserName , transactionType: transactionType , transactionAmount : transactionAmount , transactionDescription : transactionDescription}).fetch()
    .then((result) => {
        res.status(200).json({
            result : result,
            message : "Transaction Successfully Added"
        })
    }).catch(err => {
        res.status(500).json({
            error : err,
            message : "Transaction Failed"
        })
    })

  },

  getallTransaction : (req , res) => {

    Transaction.find({}).then((result) => {
        res.status(200).json({
            result : result,
            message: "All Transaction Details"
        })
    }).catch(err => {
        res.status(500).json({
            err : err,
            message : 'Error in Get Blog'
        })
    })
  },


  getTransactionById : (req , res) => {

    Transaction.find(req.params.id).then((result) => {
        res.status(200).json({
            result : result,
        })
    }).catch(err => {
        res.status(500).json({
            err : err,
            message : 'Error in Get Blog'
        })
    })
  },

  deleteTransaction : (req , res ) => {

    const id = req.params.id;

    Transaction.destroy(id).then((result) => {
        res.status(200).json({
            message: "Transaction Deleted Successfully"
        })
    }).catch((err) =>{
        res.status(500).json({
            message : "Transaction Deletion Failed"
        })
    })
  },

  editTransaction : (req , res) => {
    
    const account_Id = req.body.account_Id;
    const transactionuserName = req.body.transactionuserName;
    const transactionType = req.body.transactionType;
    const transactionAmount = req.body.transactionAmount;
    const transactionDescription = req.body.transactionDescription;


    Transaction.update({ id : req.params.id} , {account_Id : account_Id , transactionuserName : transactionuserName , transactionType : transactionType , transactionAmount : transactionAmount , transactionDescription : transactionDescription}).then((result) => {

        res.status(200).json({
            message : 'Transaction Updated Successfully'
        })
    }).catch(err => {
        res.status(400).json({
            message : 'Transaction Updation Failed'
        })
    })

  }

};