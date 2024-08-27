import { Request, Response } from "express";
import User from "../models/user";
import bcrypt from 'bcrypt';
import generateJWT from "../helpers/generate-jwt";
import UserSessions from "../models/user_session";

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    try {

        //verificar si el email existe
        const user = await User.findOne({ where: { email }, include : UserSessions });
        
        if (!user) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }
        //verificar si esta activo 
        // if (!usuario.estado) {
        //     return res.status(400).json({
        //         msg: 'Usuario / Password no son correctos - estado: false'
        //     })
        // }
        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, user.password);
        
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }

        //generar JWT
        const token = await generateJWT(String(user.id));

        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal'
        });
    }


}