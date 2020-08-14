import SendgridEmailSender, { IEmailPayload } from "../helpers/sendgrid";
import getNewRegistrationBody from "../helpers/email";

export default class EmailRepository {
    async sendNewRegistrationEmail(propspect: any) {
        await SendgridEmailSender.send(getNewRegistrationBody(propspect));
    }
}