/***********************************************************
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License
 **********************************************************/
import 'jest';
import * as React from 'react';
import { Nav } from 'office-ui-fabric-react/lib/Nav';
import DeviceContentNavComponent, { NAV_LINK_ITEMS_NONPNP, NAV_LINK_ITEMS_PNP } from './deviceContentNav';
import { mountWithLocalization } from '../../../shared/utils/testHelpers';

describe('components/devices/deviceContentNav', () => {

    const setInterfaceId = jest.fn();
    const getComponent = (overrides = {}) => {
        const props = {
            deviceId: 'test',
            interfaceIds: [],
            isLoading: false,
            isPnPDevice: false,
            selectedInterface: '',
            setInterfaceId,
            ...overrides
        };
        return <DeviceContentNavComponent {...props} />;
    };

    it('matches snapshot when there device is not pnp', () => {
        const wrapper = mountWithLocalization(getComponent());

        expect(wrapper).toMatchSnapshot();
        const navigation = wrapper.find(Nav);
        expect(navigation.props().groups[0].links.length).toEqual(NAV_LINK_ITEMS_NONPNP.length);
    });

    it('shows non-pnp nav when component is loading', () => {
        const wrapper = mountWithLocalization(getComponent({isLoading: true}));

        const navigation = wrapper.find(Nav);
        expect(navigation.props().groups[0].links.length).toEqual(NAV_LINK_ITEMS_NONPNP.length);
    });

    it('matches snapshot when there device is pnp', () => {
        const interfaceId = 'urn:azureiot:com:DeviceInformation:1';
        const interfaceIds = [interfaceId];
        const wrapper = mountWithLocalization(getComponent({isPnPDevice: true, interfaceIds}));

        const navigation = wrapper.find(Nav);
        expect(navigation.props().groups[0].links.length).toEqual(NAV_LINK_ITEMS_NONPNP.length);
        expect(navigation.props().groups[1].links.length).toEqual(interfaceIds.length);
        expect(navigation.props().groups[1].links[0].links.length).toEqual(NAV_LINK_ITEMS_PNP.length);

        navigation.props().groups[1].links[0].links[0].onClick(undefined, {name: '', url: '', parentId: interfaceId});
        expect(setInterfaceId).toBeCalledWith(interfaceId);
    });
});
