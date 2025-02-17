import 'jest';
import { generateKey, validateKey, validateThumbprint, validateDeviceId } from './utils';

describe('utils', () => {
    // tslint:disable-next-line:no-any
    const localWindow = window as any;
    localWindow.crypto = {
      getRandomValues: jest.fn()
    };

    const testRandomValueGenerator = (byteArray: Uint8Array) => {
        const defaultValue: number = 1;
        for (let i = 0; i < byteArray.length; i++) {
            byteArray[i] = defaultValue;
        }
    };

    describe('generateKey', () => {
        it('generatesKey with mock value', () => {
            const value = generateKey(testRandomValueGenerator);
            expect(value).toEqual('AQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQE=');
        });

        it('generates a key with mocked crypto function', () => {
            const value = generateKey();
            expect(value).toEqual('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=');
        });
    });

    describe('validateKey', () => {
        it('validates device key', () => {
            expect(validateKey('OP/1UijsiKaiH8YOfyk5gg==')).toBeTruthy();
            expect(validateKey('123')).toBeFalsy();
        });
    });

    describe('validateThumbprint', () => {
        it('validates device thumbprint', () => {
            expect(validateThumbprint('ca92f024e1acab505b138ebfe1425efa91e3ed78')).toBeTruthy();
            expect(validateThumbprint('123')).toBeFalsy();
        });
    });

    describe('validateDeviceId', () => {
        it('validates device ID', () => {
            expect(validateDeviceId('123')).toBeTruthy();
            expect(validateDeviceId('12 3')).toBeFalsy();
        });
    });
});
