const {response} =require('express');
const Usuario = require('../models/Usuario')
const bcrypt = require('bcryptjs');
const { generarJwt } = require('../helpers/jwt');

const crearUsuario = async (req, res = response)=>{
    const {email, password} = req.body

    try {
        let usuario = await Usuario.findOne({email})
        if(usuario){
            return res.status(400).json({
                ok:false,
                msg:"este usuario ya existe"
            })
        }
        
        usuario = new Usuario(req.body);
        //ENCRYPTAR PASSWORD
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt)
        await usuario.save();
        const token = await generarJwt(usuario.id, usuario.name);

        res.status(201).json({
        ok:true,
        uid: usuario.id,
        name:usuario.name,
        token
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con armin'
        })
    }   
}

const loginUsuario = async (req, res = response)=>{
    const {email, password} = req.body

    try {
        const usuario = await Usuario.findOne({email})
        if(!usuario){
            return res.status(400).json({
                ok:false,
                msg:"El email no existe"
            })
        }
        const validPass = bcrypt.compareSync(password, usuario.password)
        if (!validPass){
            return res.status(400).json({
                ok:false,
                msg:"Password invalida"
            })
        }
        //generar token
        const token = await generarJwt(usuario.id, usuario.name);
        res.json({
                ok:true,
                uid: usuario.id,
                name:usuario.name,
                token       
            });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:'hable con armin'
        })
    }   
}

const revalidarToken = async(req, res = response)=>{
    const {uid, name} = req;

    //GENERAR NUEVO TOKEN
    const token = await generarJwt(uid, name);
    res.json({
        ok:true,
       token
    });
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}