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




  
  // ADD Transaction
  '/transaction/addtransaction':  TransactionController.addTransaction,

  // Get All Transaction Details
  '/transaction/getallTransaction' : TransactionController.getallTransaction,

  // Delete Transaction
  '/transaction/deleteTransaction/:id' : TransactionController.deleteTransaction,

  // Get Transaction Details By ID
  '/transaction/getTransaction/:id' : TransactionController.getTransactionById,






  // Create Account
  '/account/createaccount' : AccountController.createAccount,
  // Delete Account
  '/account/deleteAccount/:id' : AccountController.deleteAccount,

  // Update Account
  '/account/updateAccount' : AccountController.updateAccount,

  // Get all Account BY ID
  '/account/getallAccount' : AccountController.getallAccount,

  // Get account by Id
  '/account/getallAccountByID/:id' : AccountController.getallAccountByID,




  
  '/profile' : { view : 'pages/profile'},
  '/basic' : { view : 'pages/basic-table'},
  '/blank' : { view : 'pages/blank'},
  '/fontawesome' : { view : 'pages/fontawesome'}


};