import jwt from 'jsonwebtoken';
import { TokenPayload } from '../middlewares/validate-jwt';

const generateJWT = ( payload : TokenPayload ) => {
    return new Promise(( resolve,reject ) => {
        jwt.sign( payload,process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h'
        },( err,token ) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el token');
            }else{
                resolve( token );
            }
        } );

    });
}

export default generateJWT;