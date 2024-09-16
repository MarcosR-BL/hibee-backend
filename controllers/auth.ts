import { Request, response, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import generateJWT from "../helpers/generate-jwt";
import UserSessions from "../models/user_session";
import Condo from "../models/condo";
import Apartment from "../models/apartment";
import CondoSettings from "../models/condo_settings";
import Tower from "../models/towers";
import { v4 as uuidv4 } from 'uuid';
import { uploadFileS3 } from "../helpers/upload-s3";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({ where: { email }, include: UserSessions });

        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - email'
            })
        }
        //verificar si esta activo 
        if (!user.user_sessions) {
            return res.status(400).json({
                msg: 'Dont found user sessions'
            })
        }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are incorrect - password'
            })
        }

        res.json({
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong, please contact support.'
        });
    }
}

export const loginIntoCondo = async (req: Request, res: Response) => {
    const { session_id } = req.body;
    try {

        const session = await UserSessions.findByPk(session_id, { include: [User, { model: Condo, include: [CondoSettings] }, { model: Apartment, include: [Tower] }] });
        //generar JWT
        const token = await generateJWT({
            userId: session.user_id,
            aptmId: session.apartment_id,
            sessionId: session.id,
            condoId: session.condo_id
        });
        res.json({ session, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong, please contact support.'
        });
    }
}

export const registerCondo = async (req: Request, res: Response) => {
    const payload = req.body;
    const uuid = uuidv4().replace(/-/g, '');
    const code_register = uuid.slice(0, 10);
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No logo field empty.');
    }
    try {
        const logo = await uploadFileS3(req.files.logo, "logos");
        let condo = await Condo.create({ ...payload, status: 'pending', time_zone: "America/Mexico_City", code_register, logo_id: logo });
        res.json(condo);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong, please contact support.'
        });
    }
}

export const registerAdmin = async (req: Request, res: Response) => {
    const { condo_id, first_name, last_name, email, password, phone } = req.body;
    try {
        const apartment = await Tower.findOne({ where: { condo_id, type: 'admin' }, include: Apartment });
        const user = await User.create({ first_name, last_name, email, password, phone });
        const session = await UserSessions.create({ user_type: 'admin', condo_id, apartment_id: apartment.apartments[0].id, user_id: user.id });
        res.json({ session, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong, please contact support.'
        });
    }
}

export const registerResident = async (req: Request, res: Response) => {
    const { code_register, first_name, last_name, email, password, phone, apartment_id, user_type, comite_member } = req.body;
    try {
        const condo = await Condo.findOne({ where: { code_register } });
        const user = await User.create({ first_name, last_name, email, password, phone });
        const session = await UserSessions.create({ user_type, condo_id: condo.id, apartment_id, user_id: user.id, comite_member });

        res.json({ session, user });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong, please contact support.'
        });
    }
}

export const uploadFiletest = async (req: Request, res: Response) => {

    try {
        const files = req.files.test;

        const respose = await uploadFileS3(files);
        console.log(respose);

        res.json({ msg: "hola" });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Something went wrong, please contact support.'
        });
    }
}