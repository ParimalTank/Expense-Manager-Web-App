
module.exports = {

  attributes: {

    adminId : {
      type : 'string',
      required : true
    },
    userAccount : {
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

