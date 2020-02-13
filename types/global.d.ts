// https://github.com/microsoft/TypeScript/issues/7657#issuecomment-200447063
interface Array<T> {
    filter<U extends T>(pred: (a: T) => a is U): U[];
}

type RGB = {
    r: number;
    g: number;
    b: number;
}
interface Cancelable<T> {
    isCancelable: true;
    promise: Promise<T>;
    cancel(): void;
    pending(): boolean;
}
