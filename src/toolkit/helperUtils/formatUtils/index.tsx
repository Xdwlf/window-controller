const formatMoney = (num: number): string => parseFloat(num.toFixed(2)).toLocaleString('en-US');

const formatName = (first?: string, last?: string, noNameText?: string): string => {
    const defaultText = noNameText ?? 'Name Not Found';
    if (!first && !last) return defaultText;
    return `${first || ''} ${last || ''}`.trim();
};

export { formatMoney, formatName };
