/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { DeviceIdentity } from '../../../../api/models/deviceIdentity';
import { parseConnectionString } from '../../../../shared/utils/hubConnectionStringHelper';
import { DeviceAuthenticationType } from '../../../../api/models/deviceAuthenticationType';

// tslint:disable-next-line:cyclomatic-complexity
export const getDeviceAuthenticationType = (identity: DeviceIdentity): DeviceAuthenticationType => {

    const type = identity && identity.authentication && identity.authentication.type;
    if (typeof (type) === typeof (undefined) || type === null) {
        return DeviceAuthenticationType.None;
    }

    const typeLowerCase = type.toLowerCase();
    switch (typeLowerCase) {
        case DeviceAuthenticationType.CACertificate.toString().toLowerCase():
            return DeviceAuthenticationType.CACertificate;
        case DeviceAuthenticationType.SymmetricKey.toString().toLowerCase():
            return DeviceAuthenticationType.SymmetricKey;
        case DeviceAuthenticationType.SelfSigned.toString().toLowerCase():
            return DeviceAuthenticationType.SelfSigned;
        default:
            return DeviceAuthenticationType.None;
    }
};

export const generateConnectionString = (connectionString: string, deviceId: string, key: string): string => {
    const connectionObject = parseConnectionString(connectionString);
    const { HostName } = connectionObject;
    return HostName && deviceId && key ?
        `HostName=${HostName};DeviceId=${deviceId};SharedAccessKey=${key}` : '';
};
