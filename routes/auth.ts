import { Router } from 'express';
import { login, loginIntoCondo, registerAdmin, registerCondo, registerResident } from '../controllers/auth';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';
import { validateApartmentId, validateCodeCondo, validateCondoId, validateEmailDuplicate, validatePlanId, validateSessionId, validateTowerId } from '../helpers/db-validators';

const router = Router();

const typeUsers = ['admin', 'employee', 'resident', 'guard'];

router.post('/login', [
    check('email', 'el correo es obligatorio').isEmail(),
    check('password', 'La contrasela es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/login/condo', [
    check('session_id').notEmpty().bail().custom(validateSessionId),
    validateFields
], loginIntoCondo);

router.post('/register/condo', [
    check('name').notEmpty(),
    check('address').notEmpty(),
    check('state').notEmpty(),
    check('country').notEmpty(),
    check('city').notEmpty(),
    check('type_aptm').notEmpty(),
    check('plan_id').custom(validatePlanId),
    check('phone').notEmpty(),
    check('contact_email').notEmpty().bail().isEmail(),
    validateFields
], registerCondo);

router.post('/register/admin', [
    check('first_name').notEmpty(),
    check('last_name').notEmpty(),
    check('email').notEmpty().bail().isEmail().bail().custom(validateEmailDuplicate),
    check('password').notEmpty(),
    check('phone').notEmpty(),
    check('condo_id').custom(validateCondoId),
    validateFields
], registerAdmin);

router.post('/register/resident', [
    check('code_register').custom(validateCodeCondo),
    check('first_name').notEmpty(),
    check('last_name').notEmpty(),
    check('email').notEmpty().bail().isEmail(),
    check('password').notEmpty(),
    check('phone').notEmpty(),
    check('comite_member').notEmpty().bail().isBoolean(),
    check('tower_id').custom(validateTowerId),
    check('apartment_id').custom(validateApartmentId),
    check('user_type').notEmpty().bail().isIn(typeUsers),
    validateFields
], registerResident);

export default router;

