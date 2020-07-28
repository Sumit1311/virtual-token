import WebhooksRepository from "../repositories/webhooks.repository";
import AddCustomerDTO from "../dto/AddCustomerDTO";
import AccountRepository from "../repositories/account.repository";
import toAccountSchema from "../database/schemas/toAccountSchema";
import QueueRepository from "../repositories/queue.repository";
import toQueueSchema from "../database/schemas/toQueueSchema";

export default class WebhooksService {
    private _webhooksRepository: WebhooksRepository = new WebhooksRepository();
    private _accountRepository: AccountRepository = new AccountRepository();
    private _queueRepository: QueueRepository = new QueueRepository();

    constructor() {
    }

    async enqueue(body: AddCustomerDTO) {
        let account = toAccountSchema(body);
        let assignedToken, currentToken;
        let accountRecord = await this._accountRepository.findAccountByMissedCallNumber(account);
        const queueRecord = toQueueSchema(body);
        queueRecord.accountId = accountRecord.accountId;
        queueRecord.token = accountRecord.lastToken + 1;
        const queue = await this._queueRepository.addToQueue(queueRecord);
        if (queue.queueId === queueRecord.queueId) {
            accountRecord = await this._accountRepository.incrementLastToken(account);
        }
        assignedToken = queue.token;
        const frontCustomer = await this._queueRepository.getFrontCustomer(queueRecord);
        if (frontCustomer) {
            currentToken = frontCustomer.token;
        } else {
            currentToken = 0;
        }
        //const estimatedDuration = (assignedToken - currentToken) * (<number>getEnvValue(EnvVarTypeEnum.IntervalBetweenCustomer) / 60);
        const estimatedDuration = (assignedToken - currentToken) * (accountRecord.perCustomerTime / 60);
        return this._webhooksRepository.getEnqueueResponse({
            channel: body.channel,
            assignedToken,
            currentToken,
            estimatedDuration
        });
    }
}