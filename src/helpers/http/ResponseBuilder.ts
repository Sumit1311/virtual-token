import HttpStatus from "http-status-codes";

export class APIResponse {
    private status: number = HttpStatus.BAD_REQUEST;
    private message: string = HttpStatus.getStatusText(HttpStatus.BAD_REQUEST);
    private body: any = {};

    setStatus(status: number) {
        this.status = status;
        this.message = HttpStatus.getStatusText(status);
        return this;
    }

    setBody(body: any) {
        this.body = body;
        return this;
    }

    getResponse() {
        return {
            status: this.status,
            message: this.message,
            body: this.body
        };
    }
}

export default class ResponseBuilder {
    static getDefaultResponse() {
        return new APIResponse();
    }
}