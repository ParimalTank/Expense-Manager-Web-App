const UserController = require('../api/controllers/UserController');

module.exports.routes = {


  '/': { view: 'pages/homepage' },
  '/signup':  UserController.signUp,
  '/login' :  UserController.login,
  '/logout' : UserController.logout

};
