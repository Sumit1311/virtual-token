import bcrypt from 'bcryptjs';
import constants from '../../constants'

export async function getPasswordHash(password: string) {
    return await bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
    const isValid = await bcrypt.compare(password, hash);
    if (!isValid) {
        throw new Error(constants.INVALID_PASSWORD);
    }
}