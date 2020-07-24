import WebhooksRepository from "../repositories/webhooks.repository";
import AddCustomerDTO from "../dto/AddCustomerDTO";
import AccountRepository from "../repositories/account.repository";
import toAccountSchema from "../database/schemas/toAccountSchema";
import constants from "../constants";
import { date } from "joi";
import { NotificationTypeEnum } from "../enums/NotificationTypeEnum";
import { getEnvValue } from "../helpers/env";
import { EnvVarTypeEnum } from "../enums/EnvVarTypeEnum";

export default class WebhooksService {
    private _webhooksRepository: WebhooksRepository = new WebhooksRepository();
    private _accountRepository: AccountRepository = new AccountRepository();
    constructor() {
    }

    async enqueue(body: AddCustomerDTO) {
        const accountRecord = await this._accountRepository.addCustomer(toAccountSchema(body));
        const assignedToken = accountRecord.customers[accountRecord.customers.length - 1].token;
        const currentToken = accountRecord.customers[0].token;
        //const estimatedDuration = (assignedToken - currentToken) * (<number>getEnvValue(EnvVarTypeEnum.IntervalBetweenCustomer) / 60);
        const estimatedDuration = (assignedToken - currentToken) * (accountRecord.perCustomerTime / 60);
        /*if (accountRecord.notificationTypes & NotificationTypeEnum.none) {
            setTimeout(async () => {
                await this._accountRepository.deleteFrontCustomer(accountRecord, accountRecord.customers.length - 1);
            }, (estimatedDuration + 1) * 60000);
        }*/
        return this._webhooksRepository.getEnqueueResponse({
            channel: body.channel,
            assignedToken,
            currentToken,
            estimatedDuration
        });
    }
}