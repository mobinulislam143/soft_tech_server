const jwt = require('jsonwebtoken')

exports.EncodeToken = (email, user_id) =>{
    let Key = "free_palestine_5548";
    let EXPIRE = {expiresIn: '24h'}
    let PAYLOAD = {
        email:email,
        user_id:user_id
    }
    return jwt.sign(PAYLOAD, Key, EXPIRE)
}
exports.DecodeToken = (Token) => {
    try{
        let Key = "free_palestine_5548";
        return jwt.verify(Token,Key)
    }catch(err){
        return null
    }
}