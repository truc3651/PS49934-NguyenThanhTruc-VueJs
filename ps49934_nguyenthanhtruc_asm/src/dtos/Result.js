export class Result {
    constructor(data = null, errorMessage = null) {
        this.data = data;
        this.errorMessage = errorMessage;
    }

    static ok(data) {
        return new Result(data, null);
    }

    static fail(errorMessage) {
        return new Result(null, errorMessage);
    }
}
