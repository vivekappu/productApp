const jwt=require("jsonwebtoken")
module.exports=(req,res,next)=>{
  try{
    console.log(req.headers)
    const token=req.headers.authorization.split(" ")[1];
    console.log(req.headers);
    const decoded=jwt.verify(token,'vivekkey');
    req.userData=decoded;
    next();

  }catch(error){
    console.log(error)
    return res.status(401).json({
      message:'Auth failed, please signin or signup if you haven\'t'
    })
  }
}
