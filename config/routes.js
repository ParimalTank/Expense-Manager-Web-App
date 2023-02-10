const UserController = require('../api/controllers/UserController');

module.exports.routes = {

  '/': { view: 'pages/login'},
  '/dashboard' : { view : 'pages/dashboard'},
  
  '/signup': {view: 'pages/signup'},
  '/user/signup' : UserController.signUp,
  '/user/login' :  UserController.login,
  '/user/logout' : UserController.logout,


  '/conformation' : { view : 'pages/verification'},
  '/user/verification' : UserController.verification,


  '/dashboard' : { view : 'pages/dashboard'}
};
