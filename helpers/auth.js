const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Hashed Password
exports.hashPassword = (password) => {
    return new Promise((resolve,reject)=>{
        bcrypt.genSalt(12, (err,salt) => {
            if(err){
                reject(err);
            }
            bcrypt.hash(password,salt, (err,hash)=>{
                if(err){
                    reject(err);
                }
                resolve(hash);
            })
        })
    })
}
exports.checkPassword = (password,hashed) => {
    return bcrypt.compare(password,hashed);
}
exports.generateToken = (id) => {
    return jwt.sign({_id:id}, process.env.JWT_SECRET, {expiresIn:"7d"});
}