import jwt from 'jsonwebtoken';
import { getEnvValue } from '../env';
import { EnvVarTypeEnum } from '../../enums/EnvVarTypeEnum';
import { JWTPayload } from './IPayload';

export async function verifyToken(token: string) {
    let payload: JWTPayload = new JWTPayload(await jwt.verify(token, <string>getEnvValue(EnvVarTypeEnum.JwtSecretKey)));
    return payload;
}

export async function generateToken(payload: JWTPayload) {
    let token: string = await jwt.sign(payload.getPayload(), <string>getEnvValue(EnvVarTypeEnum.JwtSecretKey), { expiresIn: '3d' })
    return token;
}