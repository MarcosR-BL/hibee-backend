"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../controllers/auth");
const express_validator_1 = require("express-validator");
const validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
const router = (0, express_1.Router)();
router.post('/login', [
    (0, express_validator_1.check)('email', 'el correo es obligatorio').isEmail(),
    (0, express_validator_1.check)('password', 'La contrasela es obligatoria').not().isEmpty(),
    validate_fields_1.default
], auth_1.login);
exports.default = router;
//# sourceMappingURL=auth.js.map