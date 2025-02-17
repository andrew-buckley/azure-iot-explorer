/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import 'jest';
import * as React from 'react';
import { DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import DeviceCommandsPerInterface, { DeviceCommandDataProps, DeviceCommandDispatchProps, DeviceCommandState } from './deviceCommandsPerInterface';
import { mountWithLocalization } from '../../../../shared/utils/testHelpers';

describe('components/devices/deviceCommandsPerInterfacePerCommand', () => {
    const deviceCommandsDispatchProps: DeviceCommandDispatchProps = {
        invokeDigitalTwinInterfaceCommand: jest.fn()
    };
    const deviceCommandDataProps: DeviceCommandDataProps = {
        commandSchemas: [
            {
                commandModelDefinition: {
                    '@type': 'Command',
                    'name': 'command1'
                },
                parsedSchema: {
                    description: 'command1 description',
                    name: 'command1'
                }
            }
        ],
        deviceId: 'device1',
        interfaceName: 'urn:interfaceId',
    };

    const getComponent = (overrides = {}) => {
        const props = {
            ...deviceCommandDataProps,
            ...deviceCommandsDispatchProps,
            ...overrides
        };

        return mountWithLocalization(
            <DeviceCommandsPerInterface {...props} />
        );
    };

    it('matches snapshot', () => {
        expect(getComponent()).toMatchSnapshot();
    });
    it('toggles collapsed', () => {
        const wrapper = getComponent();
        expect((wrapper.state() as DeviceCommandState).allCollapsed).toBeFalsy();
        const button = wrapper.find(DefaultButton).first();
        button.simulate('click');
        wrapper.update();
        expect((wrapper.state() as DeviceCommandState).allCollapsed).toBeTruthy();
        expect(wrapper).toMatchSnapshot();

    });
    it('executes handle toggle from child', () => {
        const wrapper = getComponent();
        let collapsed = (wrapper.state() as DeviceCommandState).collapseMap.get(0);
        expect(collapsed).toBeFalsy();
        const button = wrapper.find(IconButton).first();
        button.simulate('click');
        wrapper.update();
        collapsed = (wrapper.state() as DeviceCommandState).collapseMap.get(0);
        expect(collapsed).toBeTruthy();
    });
});
