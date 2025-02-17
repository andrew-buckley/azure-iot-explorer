/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import 'jest';
import * as React from 'react';
import { Label, Stack, DefaultButton, IconButton } from 'office-ui-fabric-react';
import DeviceSettingsPerInterfacePerSetting, { DeviceSettingDataProps, DeviceSettingDispatchProps } from './deviceSettingsPerInterfacePerSetting';
import { mountWithLocalization } from '../../../../shared/utils/testHelpers';
import { PropertyContent } from '../../../../api/models/modelDefinition';
import { ParsedJsonSchema } from '../../../../api/models/interfaceJsonParserOutput';
import DataForm from '../shared/dataForm';
import { GroupedList } from '../../../../constants/iconNames';

describe('components/devices/deviceSettingsPerInterfacePerSetting', () => {
    const name = 'state';
    const description = 'The state of the device. Two states online/offline are available.';
    const displayName = 'Device State';
    const handleCollapseToggle = jest.fn();
    let schema = 'boolean';
    let twinValue: any = true;  // tslint:disable-line:no-any

    const propertyModelDefinition: PropertyContent = {
        '@type': 'Property',
        'description': description,
        'displayName': displayName,
        'name': name,
        'schema': schema
    };

    const propertySchema: ParsedJsonSchema = {
        default: false,
        description: 'Device State / The state of the device. Two states online/offline are available.',
        title: name,
        type: schema
    };

    const handleOverlayToggle = jest.fn();
    const deviceSettingDispatchProps: DeviceSettingDispatchProps = {
        handleCollapseToggle,
        handleOverlayToggle,
        patchDigitalTwinInterfaceProperties: jest.fn()
    };

    let deviceSettingDataProps: DeviceSettingDataProps = {
        collapsed: true,
        desiredTwin: twinValue,
        deviceId: 'deviceId',
        interfaceId: 'urn:interfaceId',
        interfaceName: 'interfaceId',
        reportedTwin: {value: twinValue},
        settingModelDefinition: propertyModelDefinition,
        settingSchema: propertySchema};

    it('matches snapshot when there is a writable property of simple type without sync status', () => {
        const props = {
            ...deviceSettingDataProps,
            ...deviceSettingDispatchProps
        };

        const wrapper = mountWithLocalization(
            <DeviceSettingsPerInterfacePerSetting {...props}/>
        );
        expect(wrapper).toMatchSnapshot();

        const nameLabel = wrapper.find(Label).first();
        expect((nameLabel.props().children as any).join('')).toEqual(`${name} (${displayName} / ${description})`);  // tslint:disable-line:no-any
        expect(nameLabel.props().className).toEqual('column-name');

        const schemaLabel = wrapper.find(Label).at(1);
        expect(schemaLabel.props().children).toEqual(schema);
        expect((schemaLabel.props().className)).toEqual('column-schema-sm');

        const unitLabel = wrapper.find(Label).at(2); // tslint:disable-line:no-magic-numbers
        expect(unitLabel.props().children).toEqual('--');
        expect((unitLabel.props().className)).toEqual('column-unit');

        const valueLabel = wrapper.find(Label).at(3); // tslint:disable-line:no-magic-numbers
        expect(valueLabel.props().children).toEqual('true');

        const reportedStatus = wrapper.find(Stack);
        expect(reportedStatus.props().children[1]).toBeUndefined();
    });

    it('matches snapshot when there is a writable property of complex type with sync status', () => {
        schema = 'Object';
        twinValue = {
            test: 'value'
        };
        propertyModelDefinition.schema = {
            '@type': schema,
            'fields': []
        };
        propertySchema.type = schema;
        deviceSettingDataProps = {
            ...deviceSettingDataProps,
            collapsed: false,
            desiredTwin: twinValue,
            reportedTwin: {
                desiredState: {
                    code: 202,
                    description: 'Updating'
                },
                value: twinValue,
            },
            settingModelDefinition: propertyModelDefinition,
            settingSchema: propertySchema
        };

        const props = {
            ...deviceSettingDataProps,
            ...deviceSettingDispatchProps
        };

        const wrapper = mountWithLocalization(
            <DeviceSettingsPerInterfacePerSetting {...props}/>
        );
        expect(wrapper).toMatchSnapshot();

        const nameLabel = wrapper.find(Label).first();
        expect((nameLabel.props().children as any).join('')).toEqual(`${name} (${displayName} / ${description})`);  // tslint:disable-line:no-any
        expect(nameLabel.props().className).toEqual('column-name');

        const schemaLabel = wrapper.find(Label).at(1);
        expect(schemaLabel.props().children).toEqual(schema);
        expect((schemaLabel.props().className)).toEqual('column-schema-sm');

        const unitLabel = wrapper.find(Label).at(2); // tslint:disable-line:no-magic-numbers
        expect(unitLabel.props().children).toEqual('--');
        expect((unitLabel.props().className)).toEqual('column-unit');

        const complexValueButton = wrapper.find(DefaultButton).first();
        expect(complexValueButton.props().className).toEqual('column-value-button');
        complexValueButton.props().onClick(null);
        expect(handleOverlayToggle).toBeCalled();

        const reportedStatus = wrapper.find(Stack);
        expect(reportedStatus.props().children[1]).toBeDefined();

        const form = wrapper.find(DataForm);
        expect(form.props().formData).toEqual(twinValue);

        const toggleButton = wrapper.find(IconButton).at(1);
        expect(toggleButton.props().iconProps).toEqual({iconName: GroupedList.OPEN});

        const header = wrapper.find('header');
        header.props().onClick(null);
        expect(handleCollapseToggle).toBeCalled();
    });
});
