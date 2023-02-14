
module.exports =  {
  tableName : 'user',
  attributes: {

   userName : {
    //  type : 'string',
    //  required: true  
    collection : 'account',
    via: 'userName'
   },
   email : {
    type : 'string',
    unique : true
   },
   password : {
    type: 'string'
   }
  },
};
