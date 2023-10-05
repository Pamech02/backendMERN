/*
RUTA DE USUARIOS/AUTH
host + /api/auth
*/
const {Router} = require('express');
const router = Router();
const {check} = require('express-validator')

const {crearUsuario, loginUsuario, revalidarToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJwt } = require('../middlewares/validar-Jwt');

router.post('/new',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La password debe contener 6 caracteres como minimo').isLength({min:6}),
    validarCampos
],crearUsuario);

router.post('/',[
    check('email','El email es obligatorio').isEmail(),
    check('password','La password debe contener 6 caracteres como minimo').isLength({min:6}),
    validarCampos
], loginUsuario);

router.get('/renew',validarJwt, revalidarToken);

module.exports = router;