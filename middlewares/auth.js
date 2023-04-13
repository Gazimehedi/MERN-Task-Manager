const jwt = require('jsonwebtoken');

exports.CheckAuth = (req,res,next) => {
    try{
        const {token} = req.headers;
        const jwt_secret = process.env.JWT_SECRET;
        const AuthUser = jwt.verify(token,jwt_secret,(err,decoded)=>{
            if(err){
                res.status(401).json({status:'Unauthorized'});
            }else{
                let email = decoded['data'];
                req.headers.email=email;
                next();
            }
        });
    }catch (e) {
        res.status(400).json({message: "Authorization expired. Please login!"});
    }
}
