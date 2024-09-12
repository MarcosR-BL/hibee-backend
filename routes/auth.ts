import { Router } from 'express';
import { login, loginIntoCondo, registerAdmin, registerCondo } from '../controllers/auth';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';
import { validateCondoId, validatePlanId, validateSessionId } from '../helpers/db-validators';

const router = Router();

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
    check('email').notEmpty().bail().isEmail(),
    check('password').notEmpty(),
    check('phone').notEmpty(),
    check('condo_id').custom(validateCondoId),
    validateFields
], registerAdmin);

router.post('/register/resident', [

]);
export default router;

