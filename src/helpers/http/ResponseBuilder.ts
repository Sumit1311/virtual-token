import HttpStatus from "http-status-codes";

class APIResponse {
    status: number = HttpStatus.BAD_REQUEST;
    message: string = HttpStatus.getStatusText(HttpStatus.BAD_REQUEST);
    body: any = {};
}

export default class ResponseBuilder {
    static getDefaultResponse() {
        return new APIResponse();
    }
}