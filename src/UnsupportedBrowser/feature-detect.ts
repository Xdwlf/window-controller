/* eslint-disable */

import features from './basic-features.txt';

export function probablySupportsFlex(): boolean {
    if (window.CSS && window.CSS.hasOwnProperty('supports')) {
        return CSS.supports('display', 'flex');
    }
    return false;
}
export function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
export function camelCase(str: string): string {
    var arr = str.split('-');
    var newStr = arr.shift() || '';
    for (var i = 0; i < arr.length; i++) {
        newStr += capitalizeFirstLetter(arr[i]);
    }
    return newStr;
}
function methodExists(entity: string, method: string): boolean {
    var methodFormatted = camelCase(method);
    switch (entity) {
        case 'array':
            return Array.hasOwnProperty(methodFormatted) || Array.prototype.hasOwnProperty(methodFormatted);
        case 'object':
            return Object.hasOwnProperty(methodFormatted) || Object.prototype.hasOwnProperty(methodFormatted);
        case 'number':
            return Number.hasOwnProperty(methodFormatted) || Number.prototype.hasOwnProperty(methodFormatted);
        case 'string':
            return String.hasOwnProperty(methodFormatted) || String.prototype.hasOwnProperty(methodFormatted);
        default:
            // eslint-disable-next-line
            console.warn(`unknown constructor name ${entity}`);
            return true;
    }
}

export function isSupported(): boolean {
    var featureList = features.trim().split('\n');
    try {
        for (var i = 0; i < featureList.length; i++) {
            var featureItem = featureList[i];
            var arr = featureItem.split('.');
            var entity = arr[1];
            var feature = arr[2];
            if (methodExists(entity, feature) === false) return false;
        }
    } catch (error) {
        return false;
    }
    return true;
}
