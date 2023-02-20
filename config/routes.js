const AccountController = require('../api/controllers/AccountController');
const TransactionController = require('../api/controllers/TransactionController');
const UserController = require('../api/controllers/UserController');

module.exports.routes = {

  '/': { view: 'pages/login'},
  // '/dashboard' : { view : 'pages/accounts'},
  '/transaction' : { view : 'pages/transaction'},
  
  // User Login , Signup , Log out
  '/signup': {view: 'pages/signup'},
  '/user/signup' : UserController.signUp,
  '/user/login' :  UserController.login,
  '/user/logout' : UserController.logout,

  // Email Verifiaction
  '/conformation' : { view : 'pages/verification'},
  '/user/verification' : UserController.verification,

   // NEW User add
  '/user/adduser' : AccountController.addUser,



// Transaction Section
  
  // ADD Transaction
  '/transaction/addtransaction/:accountId':  TransactionController.addTransaction,

  // Get All Transaction Details
  '/transaction/getallTransaction' : TransactionController.getallTransaction,

  // Delete Transaction
  '/transaction/deleteTransaction/:transactionId/:accountId' : TransactionController.deleteTransaction,

  // Get Transaction Details By ID
  '/transaction/getTransaction/:id' : TransactionController.getTransactionById,


  // Update the Transaction By Id
  '/transaction/updateTransaction/:transactionId/:accountId' : TransactionController.updateTransaction,



  // Account Section


  // Create Account
  '/account/createaccount/:createrId' : AccountController.createAccount,
  // Delete Account
  '/account/deleteAccount/:id' : AccountController.deleteAccount,

  // Update Account
  '/account/updateAccount/:id' : AccountController.updateAccount,

  // Get all Account
  '/account/getallAccount' : AccountController.getallAccount,

  // Get account by Id
  '/account/getAccountByID/:id' : AccountController.getAccountByID,




  
  '/profile' : { view : 'pages/profile'},
  '/basic' : { view : 'pages/basic-table'},
  '/blank' : { view : 'pages/blank'},
  '/fontawesome' : { view : 'pages/fontawesome'}


};