const jwt= require('jsonwebtoken');
const SECRET='qazxmlp!fhudiofsdflksdmcklmsdlcklkdfjklsjdflkdj';
const authfunction=(req,res,next)=>{
    const val=req.headers.authorization;
    if(val){
        const token=val.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                return res.status(403)
            }
            else{
                req.user=user;
                next();
            }
        })
    }
    else{
        res.status(401);
    }
}
module.exports={
    authfunction,
    SECRET
}