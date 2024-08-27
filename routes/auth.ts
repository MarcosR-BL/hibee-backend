import { Router } from 'express';
import { login } from '../controllers/auth';
import { check } from 'express-validator';
import validateFields from '../middlewares/validate-fields';

const router = Router();

router.post('/login', [
    check('email', 'el correo es obligatorio').isEmail(),
    check('password', 'La contrasela es obligatoria').not().isEmpty(),
    validateFields
], login);


export default router;

