const UserController = require('../api/controllers/UserController');

module.exports.routes = {


  '/': { view: 'layouts/login' },
  '/homepage' : { view : 'pages/homepage'},
  
  '/signup': {view: 'layouts/signup'},
  '/user/signup' : UserController.signUp,
  '/user/login' :  UserController.login,
  '/logout' : UserController.logout,


  '/conformation' : { view : 'layouts/verification'},
  '/user/verification/:token' : UserController.verification

};
