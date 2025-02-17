/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import { takeEvery, takeLatest } from 'redux-saga/effects';
import { getModelDefinitionSaga } from './sagas/modelDefinitionSaga';
import { getDeviceTwinSaga, updateDeviceTwinSaga } from './sagas/deviceTwinSaga';
import { invokeDeviceMethodSaga } from './sagas/deviceMethodSaga';
import { invokeDigitalTwinInterfaceCommandSaga } from './sagas/digitalTwinInterfaceCommandSaga';
import { getDeviceIdentitySaga, updateDeviceIdentitySaga } from './sagas/deviceIdentitySaga';
import { getDigitalTwinInterfacePropertySaga, patchDigitalTwinInterfacePropertiesSaga } from './sagas/digitalTwinInterfacePropertySaga';
import {
    getDeviceIdentityAction,
    getDigitalTwinInterfacePropertiesAction,
    getTwinAction,
    invokeDeviceMethodAction,
    invokeDigitalTwinInterfaceCommandAction,
    getModelDefinitionAction,
    patchDigitalTwinInterfacePropertiesAction,
    updateTwinAction,
    updateDeviceIdentityAction
    } from './actions';

export default [
    takeLatest(getDeviceIdentityAction.started.type, getDeviceIdentitySaga),
    takeLatest(getDigitalTwinInterfacePropertiesAction.started.type, getDigitalTwinInterfacePropertySaga),
    takeLatest(getModelDefinitionAction.started.type, getModelDefinitionSaga),
    takeLatest(getTwinAction.started.type, getDeviceTwinSaga),
    takeEvery(invokeDeviceMethodAction.started.type, invokeDeviceMethodSaga),
    takeEvery(invokeDigitalTwinInterfaceCommandAction.started.type, invokeDigitalTwinInterfaceCommandSaga),
    takeEvery(patchDigitalTwinInterfacePropertiesAction.started.type, patchDigitalTwinInterfacePropertiesSaga),
    takeEvery(updateTwinAction.started.type, updateDeviceTwinSaga),
    takeEvery(updateDeviceIdentityAction.started.type, updateDeviceIdentitySaga)
];
