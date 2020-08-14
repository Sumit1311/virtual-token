import sgMail from '@sendgrid/mail';
import { getEnvValue } from '../env';
import { EnvVarTypeEnum } from '../../enums/EnvVarTypeEnum';

export interface IEmailPayload {
    to: string;
    from: string;
    body: string;
    subject: string;
}

export default class SendgridEmailSender {
    static async send(data: IEmailPayload) {
        console.log(<string>getEnvValue(EnvVarTypeEnum.SendGridAPIKey));
        sgMail.setApiKey(<string>getEnvValue(EnvVarTypeEnum.SendGridAPIKey));
        await sgMail.send({
            to: data.to,
            from: "sumittoshniwal92@gmail.com",
            subject: data.subject,
            text: data.body
        });
    }
}