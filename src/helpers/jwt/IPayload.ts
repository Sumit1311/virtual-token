export class JWTPayload {
    userId: string = "";
    accountId: string = "";

    constructor(body: any) {
        this.userId = body.userId;
        this.accountId = body.accountId;
    }

    getPayload() {
        return {
            userId: this.userId,
            accountId: this.accountId
        }
    }

}