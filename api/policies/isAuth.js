const jwt = require('jsonwebtoken');

module.exports = async function (req, res, proceed) {

    // If `req.me` is set, then we know that this request originated
    // from a logged-in user.  So we can safely proceed to the next policy--
    // or, if this is the last policy, the relevant action.
    // > For more about where `req.me` comes from, check out this app's
    // > custom hook (`api/hooks/custom/index.js`).
    // if (req.me) {

    

    //   return proceed();
    // }

    console.log("Hello From Auth");
    const token = req.cookies.token;

    if(token){
      // Verifie the user
      const verifyUser = jwt.verify(token , process.env.JWT_KEY);
      req.userData = verifyUser;
    }else{
      res.send(404);
    }

   
    // next();

   

    //--•
    // Otherwise, this request did not come from a logged-in user.
    // return res.forbidden();
  
  };