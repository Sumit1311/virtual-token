import { IEmailPayload } from "../sendgrid";

export default function getNewRegistrationBody(context: any) {
    return <IEmailPayload>{
        to: "sumittoshniwal92@gmail.com",
        subject: "New Registration",
        body: `You have a new registration with name : ${context.name} and Mobile Number : ${context.mobileNo}`
    }
}