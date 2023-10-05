const {response} = require('express')
const jwt = require('jsonwebtoken')

const validarJwt=(req, res = response, next)=>{
    const token = req.header('x-token');
    if(!token){
        res.status(401).json({
            ok:false,
            msg:'No existe un token'
        })
    }

    try {
        const {uid, name} = jwt.verify(token, process.env.SECRET_JWT_SEED)
        req.uid = uid;
        req.name = name;
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok:false,
            msg:'El token no es valido'
        })
    }
    next();
}

module.exports={
    validarJwt
}