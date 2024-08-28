import { Router } from 'express';
import { login, loginIntoCondo } from '../controllers/auth';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';
import validateJWT from '../middlewares/validate-jwt';

const router = Router();

router.post('/login', [
    check('email', 'el correo es obligatorio').isEmail(),
    check('password', 'La contrasela es obligatoria').not().isEmpty(),
    validateFields
], login);

router.post('/login/condo', [
    validateFields
], loginIntoCondo);


export default router;

