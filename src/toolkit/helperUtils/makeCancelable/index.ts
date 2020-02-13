export const makeCancelable = <T>(promise: Promise<T>): Cancelable<T> => {
    let hasCanceled_ = false;
    let pending_ = true;
    const wrappedPromise = new Promise<T>((resolve, reject): void => {
        promise.then(
            val => {
                pending_ = false;
                // eslint-disable-next-line
                return hasCanceled_ ? reject({ isCanceled: true }) : resolve(val);
            },
            error => {
                pending_ = false;
                // eslint-disable-next-line
                return hasCanceled_ ? reject({ isCanceled: true }) : reject(error);
            }
        );
    });

    return {
        isCancelable: true,
        promise: wrappedPromise,
        cancel(): void {
            hasCanceled_ = true;
        },
        pending(): boolean {
            return pending_;
        },
    };
};
