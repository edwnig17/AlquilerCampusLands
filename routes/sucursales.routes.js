import express from 'express';
import { check } from 'express-validator';
import { postSucursales } from '../controllers/sucursales.contollers.js';

const router = express.Router();

router.post('/sucursales', [
    check('nombre', "The branch name is required").not().isEmpty(),
    check('direccion', "The branch address is required").not().isEmpty(),
    check('ciudad', "The branch city is required").not().isEmpty(),
    check('telefono', "The phone number is required").not().isEmpty().isNumeric().withMessage("Phone number must be a number"),
    check('email', "The email is required").not().isEmpty().isEmail().withMessage("Must be a valid email"),
    check('gerente', "The manager name is required").not().isEmpty()
], postSucursales);

export default router;
