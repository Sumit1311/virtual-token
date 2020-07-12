import WebhooksRepository from "../repositories/webhooks.repository";

export default class WebhooksService {
    private _webhooksRepository: WebhooksRepository = new WebhooksRepository();
    constructor(){
        
    }
    enqueue() {
        return this._webhooksRepository.getEnqueueResponse();
    }
}