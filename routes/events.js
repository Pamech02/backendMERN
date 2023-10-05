const {Router} = require('express');
const router = Router();
const {check} = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { validarJwt } = require('../middlewares/validar-Jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//utilizar el mismo middleware en todas las rutas
router.use(validarJwt)

router.get('/', getEvents);
router.post('/',[
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start','fecha de inicio es obligatoria').custom(isDate),
    check('end','fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos,
], createEvent);
router.put('/:id',[
    check('title', 'el titulo es obligatorio').not().isEmpty(),
    check('start','fecha de inicio es obligatoria').custom(isDate),
    check('end','fecha de finalizacion es obligatoria').custom(isDate),
    validarCampos,
], updateEvent);
router.delete('/:id', deleteEvent)

module.exports = router;