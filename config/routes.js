const AccountController = require('../api/controllers/AccountController');
const TransactionController = require('../api/controllers/TransactionController');
const UserController = require('../api/controllers/UserController');

module.exports.routes = {

  '/': { view: 'pages/login'},
  '/dashboard' : { view : 'pages/dashboard'},
  
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




  
  '/profile' : { view : 'pages/profile'},
  '/basic' : { view : 'pages/basic-table'},
  '/blank' : { view : 'pages/blank'},
  '/fontawesome' : { view : 'pages/fontawesome'}

};