import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import generateJWT from "../helpers/generate-jwt";
import UserSessions from "../models/user_session";
import Condo from "../models/condo";
import Apartment from "../models/apartment";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({ where: { email }, include: UserSessions });

        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }
        //verificar si esta activo 
        if (!user.user_sessions) {
            return res.status(400).json({
                msg: 'No se encontraron sesiones del usuario'
            })
        }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        res.json({
            user
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal'
        });
    }
}

export const loginIntoCondo = async (req: Request, res: Response) => {
    const { session_id } = req.body;

    try {

        const session = await UserSessions.findByPk(session_id, { include: [User, Condo, Apartment] });
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
            msg: 'Algo salio mal'
        });
    }
}