export const hexToRgb = (hex: string): RGB | null => {
    if (/^#([0-9A-F]{3}){1,2}$/i.test(hex) === false) {
        // eslint-disable-next-line
        console.error('You did not pass in a valid hex code to hexToRgb');
        return null;
    }
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    // eslint-disable-next-line id-length
    const newHex = hex.replace(shorthandRegex, (m: string, r: string, g: string, b: string) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(newHex);
    return result ? {
        r: parseInt(result[1], 16), // eslint-disable-line id-length
        g: parseInt(result[2], 16), // eslint-disable-line id-length
        b: parseInt(result[3], 16), // eslint-disable-line id-length
    } : null;
};
