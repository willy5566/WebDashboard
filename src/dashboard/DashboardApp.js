import React, { Component, useCallback, useEffect, useState } from 'react'
import styled from "@emotion/styled";
import { ThemeProvider } from '@emotion/react';

import DashboardNav from './DashboardNav';
import DashboardHeader from './DashboardHeader';
import DashboardContent from './DashboardContent';

const theme = {

}

const Container = styled.div`
    /* background-color: #D9D9D9; */
    height: 100%;
    display: flex;
    align-items: end;
    justify-content: right;
`;

const ConvertToUTCsec = (dateTime) => {
  const currentDate = new Date(dateTime);

  // 设置时间部分为 00:00:00
  //currentDate.setUTCHours(9, 0, 0, 0);
  // 获取当天的 UTC 时间戳（以秒为单位）
  const currentDayStartUTCTimeInSeconds = Math.floor(currentDate.getTime() / 1000);

  //console.log(currentDayStartUTCTimeInSeconds);

  return currentDayStartUTCTimeInSeconds;
}

const GetTodayUTC = () => {
  const currentUTCTimeInMilliseconds = Date.now();

  const currentDayStartUTCTimeInSeconds = ConvertToUTCsec(currentUTCTimeInMilliseconds);

  //console.log(currentDayStartUTCTimeInSeconds);

  return currentDayStartUTCTimeInSeconds;
}

const DashboardApp = () => {
  const path = document.location.origin;

  const [devicesElement, setDevicesElement] = useState({
    totalVolume: 0,
    online: 0,
    offline: 0,
    errorEventCount: 0,
    errorAbnormalOffCount: 0,
    errorCpuHighTempCount: 0,
    errorUnitCount: 0,
    averageLifeTime: 0,
    life_0_1: 0,
    life_1_2: 0,
    life_2_3: 0,
    life_3_4: 0,
    life_4_N: 0,
    life_never: 0,
    shipToStart_0_1: 0,
    shipToStart_1_2: 0,
    shipToStart_2_3: 0,
    shipToStart_3_4: 0,
    shipToStart_4_N: 0,
    shipToStart_never: 0,
    map: []
  });

  useEffect(() => {
    fetchAllDevice();
    //fakeAllDevice();
  }, []);

  const AssignData = (data, map) => {
    let totalVolume = data.length;
    let errorEventCount = 0;
    let errorAbnormalOffCount = 0;
    let errorCpuHighTempCount = 0;
    let errorUnitCount = 0;
    let utcSecNow = GetTodayUTC();
    let lifeTimeTotal = 0;
    let online = 0;
    let life_0_1 = 0;
    let life_1_2 = 0;
    let life_2_3 = 0;
    let life_3_4 = 0;
    let life_4_N = 0;
    let life_never = 0;
    const monthSec = 86400 * 30;
    const monthSec2 = monthSec * 2;
    const monthSec3 = monthSec * 3;
    const monthSec4 = monthSec * 4;
    for (let device of data) {

      const utcSecCreate = ConvertToUTCsec(device.create_date);
      const utcSecUpdate = ConvertToUTCsec(device.update_date);

      // online
      if (utcSecNow - utcSecUpdate < 16400) {
        online++;
      }
      let errorUnit = 0;
      // error
      if (device.error_msg !== undefined && device.error_msg !== '') {
        errorEventCount++;
        errorUnit++;
      }
      if (device.abnormal_poweroff !== undefined && device.abnormal_poweroff > 0) {
        errorAbnormalOffCount++;
        errorUnit++;
      }
      if (device.cpu_too_high !== undefined && device.cpu_too_high > 0) {
        errorCpuHighTempCount++;
        errorUnit++;
      }
      if (errorUnit > 0) {
        errorUnitCount++;
      }

      let lifeTime = utcSecUpdate - utcSecCreate;

      if (lifeTime > monthSec4) {
        life_4_N++;
      } else if (lifeTime > monthSec3) {
        life_3_4++;
      } else if (lifeTime > monthSec2) {
        life_2_3++;
      } else if (lifeTime > monthSec) {
        life_1_2++;
      } else if (lifeTime > 0) {
        life_0_1++;
      } else {
        life_never++;
      }

      // life time
      lifeTimeTotal += lifeTime;
    }
    let offline = totalVolume - online;
    let averageLifeTime = (lifeTimeTotal / totalVolume) / 86400 / 30;

    setDevicesElement(() => ({
      totalVolume: totalVolume,
      online: online,
      offline: offline,
      errorEventCount: errorEventCount,
      errorAbnormalOffCount: errorAbnormalOffCount,
      errorCpuHighTempCount: errorCpuHighTempCount,
      errorUnitCount: errorUnitCount,
      averageLifeTime: averageLifeTime,
      life_0_1: life_0_1,
      life_1_2: life_1_2,
      life_2_3: life_2_3,
      life_3_4: life_3_4,
      life_4_N: life_4_N,
      life_never: life_never,
      map: map
    }));
  }

  const fetchAllDevice = () => {

    //const path = 'http://127.0.0.1:4000';
    const api = '/api/NewClient';
    const url = path + api;

    let headersList = {
      'Accept': '*/*',
      'Content-Type': 'application/json',
    }

    return fetch(url, {
      method: "POST",
      headers: headersList
    }).then(response =>
      response.json()
    ).then((res) => {
      const data = res.data;
      const map = res.map;
      console.log(data);
      console.log(map);
      AssignData(data, map);
    });
  }

  const fakeAllDevice = () => {
    const data = [
      {
        serial_number: '123456',
        device_id: '00155DA796CF-123456',
        product_name: 'POS325',
        mac: '00155DA796CF',
        ip: '218.210.199.132',
        location_country: 'TW',
        location_country_iso: null,
        location_subdivision: null,
        location_subdivision_iso: null,
        location_city: null,
        location_postal: null,
        location_latitude: 0,
        location_longitude: 0,
        os_name: 'Windows 10 Enterprise LTSC',
        os_edition: 'Windows',
        os_version: '1809',
        os_build: '17763.1075',
        fw_bios: 'F630V09A(F630-005)',
        fw_ec: '1.2.11',
        fw_bsp: '13',
        fw_mcu: '1.0.21',
        mb_name: 'F63',
        work_order: '20231101',
        abnormal_poweroff: 0,
        cpu_too_high: 0,
        create_date: '2024-03-04T01:58:34.000Z',
        update_date: '2024-03-12T05:47:21.000Z',
        mtbf: 11563,
        system_boot_time: '2000-12-31T16:00:00.000Z',
        system_shutdown_time: '2024-03-05T06:49:37.000Z',
        daily: '2024-03-12T05:47:21.000Z',
        usb_pnp: 'VID_0ACD&PID_2030_0.1.0_1 15:12:05\n' +
          'VID_0ACD&PID_2030_0.1.0_0 15:10:23,15:30:08\n' +
          'VID_0ACD&PID_2030_1.1.2_1 16:12:05,17:12:05,18:12:05\n' +
          'VID_0ACD&PID_2030_1.1.2_0 16:30:23,17:30:08,18:30:08',
        error_msg: '41 - 12:10:23,12:30:08\n42 - 17:17:21,18:30:08',
        usb_peripheral: '0.1.0:VID_0ACD&PID_2030\n1.1.2:VID_0ACD&PID_2030\n0.2.1:VID_0ACD&PID_20A0'
      },
      {
        serial_number: 'E9060800FFFBEBBF',
        device_id: '0060ef35c654-E9060800FFFBEBBF',
        product_name: 'Kabylake Client platform',
        mac: '0060ef35c654',
        ip: '218.210.99.232',
        location_country: 'TW',
        location_country_iso: null,
        location_subdivision: null,
        location_subdivision_iso: null,
        location_city: null,
        location_postal: null,
        location_latitude: 0,
        location_longitude: 0,
        os_name: 'Linux',
        os_edition: 'Ubuntu',
        os_version: '20.04.6 LTS (Focal Fossa)',
        os_build: '5.15.0-100-generic',
        fw_bios: 'D86KV020(D86K-036)',
        fw_ec: '1',
        fw_bsp: '',
        fw_mcu: '1',
        mb_name: 'D86',
        work_order: '20240301',
        abnormal_poweroff: 1,
        cpu_too_high: 0,
        create_date: '2024-03-04T10:44:24.000Z',
        update_date: '2024-03-12T07:43:44.000Z',
        mtbf: 2422,
        system_boot_time: '2024-03-12T03:40:29.000Z',
        system_shutdown_time: '2024-03-11T01:42:06.000Z',
        daily: '2024-03-12T07:43:44.000Z',
        usb_pnp: 'VID_1A2C&PID_0042_1-1.2_0 15:39:44\nVID_0461&PID_4E6E_1-1.3_0 15:39:44',
        error_msg: 'x86/cpu: SGX disabled by BIOS. - 11:40:00',
        usb_peripheral: ''
      },
      {
        serial_number: 'ethan-test-1',
        device_id: '00155DA796CF-123456',
        product_name: 'POS325',
        mac: '00155DA796CF',
        ip: '218.210.99.132',
        location_country: 'Taiwan',
        location_country_iso: 'TW',
        location_subdivision: 'New Taipei',
        location_subdivision_iso: 'NWT',
        location_city: 'Banqiao',
        location_postal: null,
        location_latitude: 25.0104,
        location_longitude: 121.4684,
        os_name: 'Windows 10 Enterprise LTSC',
        os_edition: 'Windows',
        os_version: '1809',
        os_build: '17763.1075',
        fw_bios: 'F630V09A(F630-005)',
        fw_ec: '1.2.11',
        fw_bsp: '13',
        fw_mcu: '1.0.21',
        mb_name: 'F63',
        work_order: null,
        abnormal_poweroff: 0,
        cpu_too_high: 0,
        create_date: '2024-03-06T07:55:22.000Z',
        update_date: '2024-03-12T03:09:22.000Z',
        mtbf: 8310,
        system_boot_time: '2024-03-06T08:34:18.000Z',
        system_shutdown_time: '2024-03-06T08:23:30.000Z',
        daily: '2024-03-12T03:09:22.000Z',
        usb_pnp: 'VID_0ACD&PID_2030_0.1.0_1:15:12:05\n' +
          'VID_0ACD&PID_2030_0.1.0_0:15:10:23,15:30:08\n' +
          'VID_0ACD&PID_2030_1.1.2_1:16:12:05,17:12:05,18:12:05\n' +
          'VID_0ACD&PID_2030_1.1.2_0:16:30:23,17:30:08,18:30:08',
        error_msg: '41:12:10:23,12:30:08\n42:17:17:21,18:30:08',
        usb_peripheral: 'VID_0ACD&PID_2030_0.1.0\nVID_0ACD&PID_2030_1.1.2\nVID_0ACD&PID_20A0_0.2.1'
      },
      {
        serial_number: 'ethan-test-2',
        device_id: '00155DA796CF-123456',
        product_name: 'POS325',
        mac: '00155DA796CF',
        ip: '218.210.99.132',
        location_country: 'Taiwan',
        location_country_iso: 'TW',
        location_subdivision: 'New Taipei',
        location_subdivision_iso: 'NWT',
        location_city: 'Banqiao',
        location_postal: null,
        location_latitude: 25.0104,
        location_longitude: 121.4684,
        os_name: 'Windows 10 Enterprise LTSC',
        os_edition: 'Windows',
        os_version: '1809',
        os_build: '17763.1075',
        fw_bios: 'F630V09A(F630-005)',
        fw_ec: '1.2.11',
        fw_bsp: '13',
        fw_mcu: '1.0.21',
        mb_name: 'F63',
        work_order: null,
        abnormal_poweroff: 0,
        cpu_too_high: 0,
        create_date: '2024-03-12T03:09:36.000Z',
        update_date: '2024-03-12T03:09:36.000Z',
        mtbf: 0,
        system_boot_time: '2000-12-31T16:00:00.000Z',
        system_shutdown_time: '2000-12-31T16:00:00.000Z',
        daily: '2024-03-12T03:09:36.000Z',
        usb_pnp: 'VID_0ACD&PID_2030_0.1.0_1:15:12:05\n' +
          'VID_0ACD&PID_2030_0.1.0_0:15:10:23,15:30:08\n' +
          'VID_0ACD&PID_2030_1.1.2_1:16:12:05,17:12:05,18:12:05\n' +
          'VID_0ACD&PID_2030_1.1.2_0:16:30:23,17:30:08,18:30:08',
        error_msg: '41:12:10:23,12:30:08\n42:17:17:21,18:30:08',
        usb_peripheral: 'VID_0ACD&PID_2030_0.1.0\nVID_0ACD&PID_2030_1.1.2\nVID_0ACD&PID_20A0_0.2.1'
      },
      {
        serial_number: 'ethan-test-3',
        device_id: '00155DA796CF-123456',
        product_name: 'POS325',
        mac: '00155DA796CF',
        ip: '218.210.99.132',
        location_country: 'Taiwan',
        location_country_iso: 'TW',
        location_subdivision: 'New Taipei',
        location_subdivision_iso: 'NWT',
        location_city: 'Banqiao',
        location_postal: null,
        location_latitude: 25.0104,
        location_longitude: 121.4684,
        os_name: 'Windows 10 Enterprise LTSC',
        os_edition: 'Windows',
        os_version: '1809',
        os_build: '17763.1075',
        fw_bios: 'F630V09A(F630-005)',
        fw_ec: '1.2.11',
        fw_bsp: '13',
        fw_mcu: '1.0.21',
        mb_name: 'F63',
        work_order: null,
        abnormal_poweroff: 0,
        cpu_too_high: 0,
        create_date: '2024-03-12T04:00:07.000Z',
        update_date: '2024-03-12T04:00:07.000Z',
        mtbf: 0,
        system_boot_time: '2024-03-12T04:00:07.000Z',
        system_shutdown_time: '2024-03-12T04:00:07.000Z',
        daily: '2024-03-12T04:00:07.000Z',
        usb_pnp: 'VID_0ACD&PID_2030_0.1.0_1:15:12:05\n' +
          'VID_0ACD&PID_2030_0.1.0_0:15:10:23,15:30:08\n' +
          'VID_0ACD&PID_2030_1.1.2_1:16:12:05,17:12:05,18:12:05\n' +
          'VID_0ACD&PID_2030_1.1.2_0:16:30:23,17:30:08,18:30:08',
        error_msg: '41:12:10:23,12:30:08\n42:17:17:21,18:30:08',
        usb_peripheral: 'VID_0ACD&PID_2030_0.1.0\nVID_0ACD&PID_2030_1.1.2\nVID_0ACD&PID_20A0_0.2.1'
      },
      {
        serial_number: 'ethan-test-4',
        device_id: '00155DA796CF-123456',
        product_name: 'POS325',
        mac: '00155DA796CF',
        ip: '218.210.99.132',
        location_country: 'Taiwan',
        location_country_iso: 'TW',
        location_subdivision: 'New Taipei',
        location_subdivision_iso: 'NWT',
        location_city: 'Banqiao',
        location_postal: null,
        location_latitude: 25.0104,
        location_longitude: 121.4684,
        os_name: 'Windows 10 Enterprise LTSC',
        os_edition: 'Windows',
        os_version: '1809',
        os_build: '17763.1075',
        fw_bios: 'F630V09A(F630-005)',
        fw_ec: '1.2.11',
        fw_bsp: '13',
        fw_mcu: '1.0.21',
        mb_name: 'F63',
        work_order: null,
        abnormal_poweroff: 0,
        cpu_too_high: 0,
        create_date: '2024-03-12T04:01:19.000Z',
        update_date: '2024-03-12T04:01:19.000Z',
        mtbf: 0,
        system_boot_time: '2024-03-12T04:01:19.000Z',
        system_shutdown_time: '2024-03-12T04:01:19.000Z',
        daily: '2024-03-12T04:01:19.000Z',
        usb_pnp: 'VID_0ACD&PID_2030_0.1.0_1:15:12:05\n' +
          'VID_0ACD&PID_2030_0.1.0_0:15:10:23,15:30:08\n' +
          'VID_0ACD&PID_2030_1.1.2_1:16:12:05,17:12:05,18:12:05\n' +
          'VID_0ACD&PID_2030_1.1.2_0:16:30:23,17:30:08,18:30:08',
        error_msg: '41:12:10:23,12:30:08\n42:17:17:21,18:30:08',
        usb_peripheral: 'VID_0ACD&PID_2030_0.1.0\nVID_0ACD&PID_2030_1.1.2\nVID_0ACD&PID_20A0_0.2.1'
      },
      {
        serial_number: 'System Serial Number',
        device_id: 'd45d64b8d1e7-System Serial Number',
        product_name: 'ERICHUANG7',
        mac: 'D4:5D:64:B8:D1:E7',
        ip: '218.210.99.232',
        location_country: 'Taiwan',
        location_country_iso: 'TW',
        location_subdivision: 'New Taipei',
        location_subdivision_iso: 'NWT',
        location_city: 'Banqiao',
        location_postal: null,
        location_latitude: 25.0104,
        location_longitude: 121.4684,
        os_name: 'Microsoft Windows 10 Pro',
        os_edition: 'Windows',
        os_version: '22H2',
        os_build: '19045.4123',
        fw_bios: '0602',
        fw_ec: '1.2.11',
        fw_bsp: '13',
        fw_mcu: '1.0.21',
        mb_name: 'PRIME B460M-A',
        work_order: null,
        abnormal_poweroff: 0,
        cpu_too_high: 0,
        create_date: '2024-03-12T03:00:47.000Z',
        update_date: '2024-03-12T08:42:20.000Z',
        mtbf: 2128194764,
        system_boot_time: '2000-12-31T16:00:00.000Z',
        system_shutdown_time: '2024-03-12T04:22:39.000Z',
        daily: '2000-12-31T16:00:00.000Z',
        usb_pnp: 'VID_0ACD&PID_2030_0.1.0_1 15:12:05\n' +
          'VID_0ACD&PID_2030_0.1.0_0 15:10:23,15:30:08\n' +
          'VID_0ACD&PID_2030_1.1.2_1 16:12:05,17:12:05,18:12:05\n' +
          'VID_0ACD&PID_2030_1.1.2_0 16:30:23,17:30:08,18:30:08',
        error_msg: '41 - 12:10:23,12:30:08\n42 - 17:17:21,18:30:08',
        usb_peripheral: '0.1.0:VID_0ACD&PID_2030\n1.1.2:VID_0ACD&PID_2030\n0.2.1:VID_0ACD&PID_20A0'
      }
    ];
    const map = [

    ];
    AssignData(data, map);

  }

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <DashboardNav></DashboardNav>
        <DashboardHeader></DashboardHeader>
        <DashboardContent
          devicesElement={devicesElement}></DashboardContent>
      </Container>
    </ThemeProvider>
  )

}

export default DashboardApp;