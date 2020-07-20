import WebhooksRepository from "../repositories/webhooks.repository";
import AddCustomerDTO from "../dto/AddCustomerDTO";
import AccountRepository from "../repositories/account.repository";
import toAccountSchema from "../database/schemas/toAccountSchema";

export default class WebhooksService {
    private _webhooksRepository: WebhooksRepository = new WebhooksRepository();
    private _accountRepository: AccountRepository = new AccountRepository();
    constructor() {
    }

    async enqueue(body:AddCustomerDTO) {
        await this._accountRepository.addCustomer(toAccountSchema(body));
        return this._webhooksRepository.getEnqueueResponse();
    }   
}