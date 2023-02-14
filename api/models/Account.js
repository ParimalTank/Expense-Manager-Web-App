
module.exports = {

  attributes: {

    // createrId:{
    //   // type : 'string',
    //   // required : true
    //   model : 'user'
    // },
    accountName:{
      type: 'string',
      required : true
    },
    userName : {
      model : 'user'
      // collection : 'account',
      // via: 'userName'
      // type : 'string',
      // required: true 
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

