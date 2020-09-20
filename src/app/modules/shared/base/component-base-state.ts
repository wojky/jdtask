export class ComponentBaseState<T> {
    isInProgress = true;
    isSuccess = false;
    isError = false;

    constructor(public props: T = {} as T) { }

    public setInProgress(): void {
        this.isInProgress = true;
        this.isSuccess = false;
        this.isError = false;
    }

    public setSuccess(): void {
        this.isInProgress = false;
        this.isSuccess = true;
        this.isError = false;
    }

    public setError(): void {
        this.isInProgress = false;
        this.isSuccess = false;
        this.isError = true;
    }
}