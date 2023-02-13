
module.exports = {

  attributes: {
    
    userName : {
      type : 'string',
      required : true
    },
    userAccountType : {
      type : 'string',
      required : true
    },
    users : 
      {
        type : 'json',
        columnType : 'array',
        required : true
      }
  },

};

