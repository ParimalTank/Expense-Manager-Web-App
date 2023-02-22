/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {


  // 'admin/*': 'isAuthenticated',

  // '*': 'isAuthenticated',
  // 'user/login': true,
  // '/' : true

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/


  '*': true,
  'UserController': {
    login: true,
    signUp: true,
  },
  'AccountController': {
    '*': 'isAuthenticated',
  }

  //  '*': true,
  //  UserController : {
  //    '*' : 'isAuthenticated',
  //    'login' : true,
  //    'signUp' : true
  //  }


  // '*': 'isAuth',
  // 'api/controllers/UserController': true,

    // user: {
    //     '*': true
    // },
    // account: {
    //     '*': 'isAuth',
    // },
    // transaction : {
    //     '*': 'isAuth',
    // }

    // '*': 'isAuthenticated',
    // UsersController:{
    //   '*': true,
    // }

    // '*': 'isAuthenticated',
    // 'auth': {
    //   '*': true
    // }
};
