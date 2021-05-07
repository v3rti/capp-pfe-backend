const jwt = require('jsonwebtoken');

const requireAuth = (req,res,next) => {

  if(req.cookies.jwt){
    jwt.verify(req.cookies.jwt, process.env.TOKEN_SECRET, (err,decodedToken) => {
      if(err){
        res.status(400);
      }else{
        console.log(decodedToken);
        next();
      }
    })
  }else {
    res.redirect('/login');
    console.log("oops");
  }
}

module.exports = {requireAuth};
