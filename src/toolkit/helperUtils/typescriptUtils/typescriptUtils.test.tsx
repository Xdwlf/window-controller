import { isType } from './index';

type EthicalType = {
    subjectivism: string;
}

describe('isType', () => {
    test('determines if something is of a certain type', () => {
        const ethical = {
            subjectivism: 'the doctrine that knowledge is merely subjective and that there is no external or objective truth',
        };
        expect(isType<EthicalType>(ethical, 'subjectivism')).toBe(true);
    });
    test('determines if something is not of a certain type', () => {
        const notEthical = {
            justifiedNeglect: true,
            omnipotence: 'I am all knowing.',
        };
        expect(isType<EthicalType>(notEthical, 'subjectivism')).toBe(false);
        expect(isType<EthicalType>('justifiedNeglect', 'subjectivism')).toBe(false);
        expect(isType<EthicalType>('subjectivism', 'subjectivism')).toBe(false);
        expect(isType<EthicalType>(1234, 'subjectivism')).toBe(false);
    });
});
