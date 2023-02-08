
module.exports =  {
  tableName : 'user',
  attributes: {

   userName : {
     type : 'string',
     required: true
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

