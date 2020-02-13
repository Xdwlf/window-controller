export function isType<T extends {}, U extends {} = {}>(thing: T | U, property: string): thing is T {
    if (typeof thing === 'string') return false;
    if (typeof thing === 'number') return false;
    // eslint-disable-next-line
    return thing.hasOwnProperty(property);
}
