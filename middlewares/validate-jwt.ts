import { Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from "../models/user";

export interface TokenPayload extends JwtPayload {
    userId: number;
    aptmId : number;
    sessionId: number;
    condoId : number
  }

const validateJWT = async (req: Request, res: Response, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'no hay token en la peticion '
        });
    }

    try {
        const { userId } = jwt.verify(token, process.env.SECRETORPRIVATEKEY) as TokenPayload;
        const user = await User.findByPk(userId);
        console.log(user);
        
        // if (!user) {
        //     return res.status(401).json({
        //         msg: 'usuario no existe en db'
        //     });
        // }

        //verificar si el uid tiene estado en true
        // if (!usuario.estado) {
        //     return res.status(401).json({
        //         msg: 'token no valido - usuario con estado false'
        //     });
        // }

        //req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'token no valido '
        })
    }
}

export default validateJWT;