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


  'UserController': {
    '*': 'isAuthenticated',
    login: true,
    signUp: true,
  },
  'AccountController': {
    '*': 'isAuthenticated'
  },
  'TransactionController' : {
    '*': 'isAuthenticated'
  }

};
