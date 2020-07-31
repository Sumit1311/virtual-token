import UserRepository from "../repositories/user.repository";
import LoginDTO from "../dto/LoginDTO";
import toUserSchema from "../database/schemas/toUserSchema";
import { verifyPassword } from "../helpers/bcrypt";
import { JWTPayload } from "../helpers/jwt/IPayload";
import { generateToken } from "../helpers/jwt";

export default class UserService {
    private _userRepository: UserRepository = new UserRepository();

    async login(body: LoginDTO) {
        let user = await this._userRepository.findUserByUserName(await toUserSchema(body));
        await verifyPassword(body.password, user.password);
        let payload: JWTPayload = new JWTPayload({
            userId: user.userId,
            accountId: user.accountId
        });
        let jwtToken = await generateToken(payload);
        return {
            jwtToken
        }
    }

    async verifyUser(body: JWTPayload) {
        let user = await this._userRepository.findUserByUserId(await toUserSchema(body));
        return user;
    }
}