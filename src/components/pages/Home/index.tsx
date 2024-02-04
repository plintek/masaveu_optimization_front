import React, { ReactElement, useEffect, useState } from "react";

import MainContainer from "@components/MainContainer";
import { useTranslation } from "react-i18next";
import { LoadingButton, TabContext, TabList, TabPanel } from "@mui/lab";
import { Button, Checkbox, FormControlLabel, Tab } from "@mui/material";
import { spaces } from "@styles/spaces";
import Loader from "@components/Loader";
import { useAuthState } from "@context/Auth/Context";
import UserRolesUtility from "@utils/UserRoles.utility";
import { useNavigate } from "react-router-dom";
import { AnyType } from "@interfaces/basic/Any.interface";
import Container from "@components/basic/Container";
import { BodyText, Title } from "@components/basic/Text";
import { DataGrid } from "@mui/x-data-grid";
import Select from "@components/basic/Select";
import { AnyObject } from "@interfaces/basic/AnyObject.interface";

export interface HomeTab {
    id: string;
    label: string;
    pageTitle: string;
    component: AnyType;
    show: boolean;
}

const vehicles = [
    {
        id: "OID-TEST-1",
        vehicle_code: "8636FWP",
        license_plate: "8636FWP",
        card_expiration: "2020-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",
        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 140201,
        hours: 9534,
        gross_vehicle_weight: 0,
        tare_weight: 0,
        height: 310,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 40.416775,
            lon: -3.70379,
        },
        last_trimester_order_count: 0,
        last_trimester_mileage_count: 0,
    },
    {
        id: "OID-TEST-2",
        vehicle_code: "1234ABC",
        license_plate: "1234ABC",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2020-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 150000,
        hours: 8500,
        gross_vehicle_weight: 1000,
        tare_weight: 500,
        height: 320,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 41.385063,
            lon: 2.173404,
        },
        last_trimester_order_count: 10,
        last_trimester_mileage_count: 1500,
    },
    {
        id: "OID-TEST-3",
        vehicle_code: "5678XYZ",
        license_plate: "5678XYZ",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2020-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 130000,
        hours: 10500,
        gross_vehicle_weight: 2000,
        tare_weight: 1000,
        height: 330,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 37.983809,
            lon: -0.681219,
        },
        last_trimester_order_count: 5,
        last_trimester_mileage_count: 800,
    },
    {
        id: "OID-TEST-4",
        vehicle_code: "9876LMN",
        license_plate: "9876LMN",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2020-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 145000,
        hours: 9200,
        gross_vehicle_weight: 500,
        tare_weight: 200,
        height: 300,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 39.469907,
            lon: -0.376288,
        },
        last_trimester_order_count: 8,
        last_trimester_mileage_count: 1200,
    },
    {
        id: "OID-TEST-5",
        vehicle_code: "4567PQR",
        license_plate: "4567PQR",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2020-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 138000,
        hours: 9800,
        gross_vehicle_weight: 1500,
        tare_weight: 700,
        height: 315,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 41.65606,
            lon: -0.87734,
        },
        last_trimester_order_count: 3,
        last_trimester_mileage_count: 500,
    },
    {
        id: "OID-TEST-6",
        vehicle_code: "7890JKL",
        license_plate: "7890JKL",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 155000,
        hours: 8700,
        gross_vehicle_weight: 800,
        tare_weight: 400,
        height: 325,
        truck_type_name: "trailer",
        assigned_pex: 6,
        geolocation: {
            lat: 36.721273,
            lon: -4.421398,
        },
        last_trimester_order_count: 12,
        last_trimester_mileage_count: 1800,
    },
    {
        id: "OID-TEST-7",
        vehicle_code: "2345MNO",
        license_plate: "2345MNO",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 125000,
        hours: 11000,
        gross_vehicle_weight: 2500,
        tare_weight: 1200,
        height: 335,
        truck_type_name: "trailer",
        assigned_pex: 7,
        geolocation: {
            lat: 42.846718,
            lon: -2.671635,
        },
        last_trimester_order_count: 6,
        last_trimester_mileage_count: 900,
    },
    {
        id: "OID-TEST-8",
        vehicle_code: "8901RST",
        license_plate: "8901RST",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 142000,
        hours: 9400,
        gross_vehicle_weight: 700,
        tare_weight: 300,
        height: 290,
        truck_type_name: "trailer",
        assigned_pex: 8,
        geolocation: {
            lat: 38.340922,
            lon: -0.485327,
        },
        last_trimester_order_count: 9,
        last_trimester_mileage_count: 1300,
    },
    {
        id: "OID-TEST-9",
        vehicle_code: "3456UVW",
        license_plate: "3456UVW",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 148000,
        hours: 9000,
        gross_vehicle_weight: 1200,
        tare_weight: 600,
        height: 305,
        truck_type_name: "trailer",
        assigned_pex: 9,
        geolocation: {
            lat: 43.529742,
            lon: -5.677212,
        },
        last_trimester_order_count: 2,
        last_trimester_mileage_count: 400,
    },
    {
        id: "OID-TEST-10",
        vehicle_code: "6789XYZ",
        license_plate: "6789XYZ",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 132000,
        hours: 10200,
        gross_vehicle_weight: 1800,
        tare_weight: 900,
        height: 315,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 37.386051,
            lon: -5.982437,
        },
        last_trimester_order_count: 15,
        last_trimester_mileage_count: 2000,
    },
    {
        id: "OID-TEST-11",
        vehicle_code: "2345ABC",
        license_plate: "2345ABC",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 160000,
        hours: 8300,
        gross_vehicle_weight: 300,
        tare_weight: 100,
        height: 310,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 41.648822,
            lon: -4.756239,
        },
        last_trimester_order_count: 7,
        last_trimester_mileage_count: 1000,
    },
    {
        id: "OID-TEST-12",
        vehicle_code: "7890DEF",
        license_plate: "7890DEF",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 128000,
        hours: 10800,
        gross_vehicle_weight: 2200,
        tare_weight: 1100,
        height: 320,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 39.862831,
            lon: -4.027323,
        },
        last_trimester_order_count: 11,
        last_trimester_mileage_count: 1600,
    },
    {
        id: "OID-TEST-13",
        vehicle_code: "4567GHI",
        license_plate: "4567GHI",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 152000,
        hours: 8800,
        gross_vehicle_weight: 1000,
        tare_weight: 500,
        height: 330,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 41.676388,
            lon: -0.866667,
        },
        last_trimester_order_count: 4,
        last_trimester_mileage_count: 700,
    },
    {
        id: "OID-TEST-14",
        vehicle_code: "8901JKL",
        license_plate: "8901JKL",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 136000,
        hours: 10000,
        gross_vehicle_weight: 500,
        tare_weight: 200,
        height: 300,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 36.537222,
            lon: -6.225833,
        },
        last_trimester_order_count: 14,
        last_trimester_mileage_count: 1900,
    },
    {
        id: "OID-TEST-15",
        vehicle_code: "1234MNO",
        license_plate: "1234MNO",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 147000,
        hours: 9100,
        gross_vehicle_weight: 1400,
        tare_weight: 700,
        height: 315,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 42.812526,
            lon: -1.645774,
        },
        last_trimester_order_count: 1,
        last_trimester_mileage_count: 300,
    },
    {
        id: "OID-TEST-16",
        vehicle_code: "5678PQR",
        license_plate: "5678PQR",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 130000,
        hours: 10500,
        gross_vehicle_weight: 1900,
        tare_weight: 900,
        height: 325,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 37.597507,
            lon: -4.983056,
        },
        last_trimester_order_count: 13,
        last_trimester_mileage_count: 1700,
    },
    {
        id: "OID-TEST-17",
        vehicle_code: "9876STU",
        license_plate: "9876STU",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 143000,
        hours: 9300,
        gross_vehicle_weight: 600,
        tare_weight: 300,
        height: 335,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 43.529742,
            lon: -5.677212,
        },
        last_trimester_order_count: 18,
        last_trimester_mileage_count: 2200,
    },
    {
        id: "OID-TEST-18",
        vehicle_code: "2345VWX",
        license_plate: "2345VWX",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 149000,
        hours: 8900,
        gross_vehicle_weight: 1100,
        tare_weight: 600,
        height: 290,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 40.96342,
            lon: -5.66995,
        },
        last_trimester_order_count: 16,
        last_trimester_mileage_count: 2100,
    },
    {
        id: "OID-TEST-19",
        vehicle_code: "6789YZA",
        license_plate: "6789YZA",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 134000,
        hours: 10100,
        gross_vehicle_weight: 1600,
        tare_weight: 800,
        height: 305,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 39.862831,
            lon: -4.027323,
        },
        last_trimester_order_count: 20,
        last_trimester_mileage_count: 2500,
    },
    {
        id: "OID-TEST-20",
        vehicle_code: "3456BCD",
        license_plate: "3456BCD",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 158000,
        hours: 8500,
        gross_vehicle_weight: 2800,
        tare_weight: 1300,
        height: 315,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 37.992379,
            lon: -1.130543,
        },
        last_trimester_order_count: 17,
        last_trimester_mileage_count: 2300,
    },
    {
        id: "OID-TEST-21",
        vehicle_code: "7890EFG",
        license_plate: "7890EFG",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 126000,
        hours: 10700,
        gross_vehicle_weight: 800,
        tare_weight: 400,
        height: 320,
        truck_type_name: "trailer",
        assigned_pex: 7,
        geolocation: {
            lat: 41.314321,
            lon: 2.014386,
        },
        last_trimester_order_count: 200,
        last_trimester_mileage_count: 400000,
    },
    {
        id: "OID-TEST-22",
        vehicle_code: "1234HIJ",
        license_plate: "1234HIJ",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 154000,
        hours: 8600,
        gross_vehicle_weight: 1300,
        tare_weight: 600,
        height: 330,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 38.345487,
            lon: -0.481189,
        },
        last_trimester_order_count: 19,
        last_trimester_mileage_count: 2400,
    },
    {
        id: "OID-TEST-23",
        vehicle_code: "5678KLM",
        license_plate: "5678KLM",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 139000,
        hours: 9700,
        gross_vehicle_weight: 400,
        tare_weight: 200,
        height: 300,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 37.220041,
            lon: -3.613159,
        },
        last_trimester_order_count: 25,
        last_trimester_mileage_count: 3000,
    },
    {
        id: "OID-TEST-24",
        vehicle_code: "9876NOP",
        license_plate: "9876NOP",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 146000,
        hours: 9200,
        gross_vehicle_weight: 1200,
        tare_weight: 500,
        height: 315,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 42.858602,
            lon: -2.668543,
        },
        last_trimester_order_count: 21,
        last_trimester_mileage_count: 2600,
    },
    {
        id: "OID-TEST-25",
        vehicle_code: "2345QRS",
        license_plate: "2345QRS",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: false,
        mileage: 131000,
        hours: 10400,
        gross_vehicle_weight: 1700,
        tare_weight: 800,
        height: 325,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 38.987061,
            lon: -3.927304,
        },
        last_trimester_order_count: 28,
        last_trimester_mileage_count: 3300,
    },
    {
        id: "OID-TEST-26",
        vehicle_code: "6789TUV",
        license_plate: "6789TUV",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: false,
        mileage: 157000,
        hours: 8700,
        gross_vehicle_weight: 600,
        tare_weight: 300,
        height: 335,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 41.32423,
            lon: 2.105308,
        },
        last_trimester_order_count: 12,
        last_trimester_mileage_count: 1000,
    },
    {
        id: "OID-TEST-27",
        vehicle_code: "3456WXY",
        license_plate: "3456WXY",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: false,
        mileage: 127000,
        hours: 10600,
        gross_vehicle_weight: 1000,
        tare_weight: 500,
        height: 290,
        truck_type_name: "trailer",
        assigned_pex: 1,
        geolocation: {
            lat: 36.721273,
            lon: -4.421398,
        },
        last_trimester_order_count: 30,
        last_trimester_mileage_count: 3600,
    },
    {
        id: "OID-TEST-28",
        vehicle_code: "8901ZAB",
        license_plate: "8901ZAB",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 153000,
        hours: 8800,
        gross_vehicle_weight: 1500,
        tare_weight: 700,
        height: 305,
        truck_type_name: "cuba",
        assigned_pex: 1,
        geolocation: {
            lat: 41.671418,
            lon: -0.894034,
        },
        last_trimester_order_count: 27,
        last_trimester_mileage_count: 3400,
    },
    {
        id: "OID-TEST-29",
        vehicle_code: "1234CDE",
        license_plate: "1234CDE",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 135000,
        hours: 9900,
        gross_vehicle_weight: 2000,
        tare_weight: 1000,
        height: 315,
        truck_type_name: "cuba",
        assigned_pex: 1,
        geolocation: {
            lat: 37.774929,
            lon: -3.764737,
        },
        last_trimester_order_count: 32,
        last_trimester_mileage_count: 3800,
    },
    {
        id: "OID-TEST-30",
        vehicle_code: "5678FGH",
        license_plate: "5678FGH",
        card_expiration: "2024-04-05 00:00:00",
        permission_expiration: "2024-07-12 00:00:00",
        itv_expiration: "2024-06-07 00:00:00",
        insurance_expiration: "2024-07-01 00:00:00",
        extinguisher_expiration: "2024-07-12 00:00:00",
        waste_expiration: "2024-07-12 00:00:00",
        pressure_expiration: "2024-07-12 00:00:00",
        compressor_expiration: "2024-07-12 00:00:00",
        suspension_expiration: "2024-07-12 00:00:00",

        tachograph_expiration: "2024-09-12 00:00:00",
        active: true,
        can_go_international: true,
        mileage: 125000,
        hours: 1900,
        gross_vehicle_weight: 2200,
        tare_weight: 1300,
        height: 316,
        truck_type_name: "cuba",
        assigned_pex: 1,
        geolocation: {
            lat: 41.38879,
            lon: 2.15899,
        },
        last_trimester_order_count: 29,
        last_trimester_mileage_count: 3500,
    },
];

const orders = [
    {
        id: "ORDER-TEST-1",
        status: "pending",
        deadline_date: "2024-01-01 12:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 25000,
        container: {
            sacos: 1000,
            pales: 1,
            fardos: 0,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "MORTERO",
        origin: {
            uid: 1,
            name: "Barcelona",
            lat: 41.3825,
            lon: 2.1769,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 7,
            name: "Zaragoza",
            lat: 41.6488,
            lon: -0.8891,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },
    {
        id: "ORDER-TEST-2",
        status: "pending",
        deadline_date: "2024-01-02 12:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 10000,
        container: {
            sacos: 0,
            pales: 2,
            fardos: 2000,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "CEMENTO GRIS",
        origin: {
            uid: 7,
            name: "Zaragoza",
            lat: 41.6488,
            lon: -0.8891,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 1,
            name: "Barcelona",
            lat: 41.3825,
            lon: 2.1769,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },
    {
        id: "ORDER-TEST-3",
        status: "pending",
        deadline_date: "2024-01-02 00:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 15000,
        container: {
            sacos: 1500,
            pales: 4,
            fardos: 0,
            fundas: 0,
            laminas: 1000,
            big_bags: 5,
        },
        truck_type: "cuba",
        material: "CEMENTO GRIS",
        origin: {
            uid: 6,
            name: "Valencia",
            lat: 39.4699,
            lon: -0.3763,
            country: "ES",
            max_height: 340,
            load_type: "cuba",
        },
        destination: {
            uid: 8,
            name: "Berlin",
            lat: 52.52,
            lon: 13.405,
            country: "GE",
            max_height: 340,
            load_type: "cuba",
        },
    },
    {
        id: "ORDER-TEST-4",
        status: "pending",
        deadline_date: "2024-01-03 00:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 25000,
        container: {
            sacos: 1000,
            pales: 1,
            fardos: 0,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "CEMENTO GRIS",
        origin: {
            uid: 6,
            name: "Valencia",
            lat: 39.4699,
            lon: -0.3763,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 1,
            name: "Barcelona",
            lat: 41.3825,
            lon: 2.1769,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },
    {
        id: "ORDER-TEST-5",
        status: "pending",
        deadline_date: "2024-01-03 00:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 25000,
        container: {
            sacos: 1000,
            pales: 1,
            fardos: 0,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "CEMENTO GRIS",
        origin: {
            uid: 7,
            name: "Zaragoza",
            lat: 41.6488,
            lon: -0.8891,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 6,
            name: "Valencia",
            lat: 39.4699,
            lon: -0.3763,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },

    {
        id: "ORDER-COMPLETED-TEST-1",
        assigned_truck: "2345VWX",
        status: "completed",
        delivery_date: "2024-12-29 00:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 25000,
        container: {
            sacos: 1000,
            pales: 1,
            fardos: 0,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "CEMENTO GRIS",
        origin: {
            uid: 7,
            name: "Zaragoza",
            lat: 41.6488,
            lon: -0.8891,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 1,
            name: "Barcelona",
            lat: 41.3825,
            lon: 2.1769,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },
    {
        id: "ORDER-COMPLETED-TEST-2",
        assigned_truck: "1234HIJ",
        status: "completed",
        delivery_date: "2024-12-24 00:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 25000,
        container: {
            sacos: 1000,
            pales: 1,
            fardos: 0,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "MORTERO",
        origin: {
            uid: 6,
            name: "Valencia",
            lat: 39.4699,
            lon: -0.3763,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 1,
            name: "Barcelona",
            lat: 41.3825,
            lon: 2.1769,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },
    {
        id: "ORDER-COMPLETED-TEST-3",
        assigned_truck: "5678KLM",
        status: "completed",
        delivery_date: "2024-12-24 00:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 25000,
        container: {
            sacos: 1000,
            pales: 1,
            fardos: 0,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "CEMENTO BLANCO",
        origin: {
            uid: 1,
            name: "Barcelona",
            lat: 41.3825,
            lon: 2.1769,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 6,
            name: "Valencia",
            lat: 39.4699,
            lon: -0.3763,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },
    {
        id: "ORDER-COMPLETED-TEST-4",
        assigned_truck: "9876NOP",
        status: "completed",
        delivery_date: "2024-01-01 00:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 25000,
        container: {
            sacos: 1000,
            pales: 1,
            fardos: 0,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "CEMENTO GRIS",
        origin: {
            uid: 6,
            name: "Valencia",
            lat: 39.4699,
            lon: -0.3763,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 8,
            name: "Berlin",
            lat: 52.52,
            lon: 13.405,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },
    {
        id: "ORDER-COMPLETED-TEST-5",
        assigned_truck: "6789TUV",
        status: "completed",
        delivery_date: "2024-01-01 00:00:00",
        date: "2024-01-01 00:00:00",
        quantity: 25000,
        container: {
            sacos: 1000,
            pales: 1,
            fardos: 0,
            fundas: 0,
            laminas: 0,
            big_bags: 0,
        },
        truck_type: "trailer",
        material: "CEMENTO BLANCO",
        origin: {
            uid: 6,
            name: "Valencia",
            lat: 39.4699,
            lon: -0.3763,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
        destination: {
            uid: 1,
            name: "Barcelona",
            lat: 41.3825,
            lon: 2.1769,
            country: "ES",
            max_height: 340,
            load_type: "trailer",
        },
    },
];

function Home(): ReactElement {
    const vehiclesColumns = [
        {
            field: "id",
            headerName: "ID",
            width: 150,
        },
        { field: "vehicle_code", headerName: "Vehicle Code", width: 150 },
        { field: "license_plate", headerName: "License Plate", width: 150 },
        { field: "card_expiration", headerName: "Card Expiration", width: 150 },
        {
            field: "permission_expiration",
            headerName: "Permission Expiration",
            width: 150,
        },
        { field: "itv_expiration", headerName: "ITV Expiration", width: 150 },
        {
            field: "insurance_expiration",
            headerName: "Insurance Expiration",
            width: 150,
        },
        {
            field: "extinguisher_expiration",
            headerName: "Extinguisher Expiration",
            width: 150,
        },
        {
            field: "waste_expiration",
            headerName: "Waste Expiration",
            width: 150,
        },
        {
            field: "pressure_expiration",
            headerName: "Pressure Expiration",
            width: 150,
        },
        {
            field: "compressor_expiration",
            headerName: "Compressor Expiration",
            width: 150,
        },
        {
            field: "suspension_expiration",
            headerName: "Suspension Expiration",
            width: 150,
        },
        {
            field: "tachograph_expiration",
            headerName: "Tachograph Expiration",
            width: 150,
        },
        { field: "active", headerName: "Active", width: 150 },
        {
            field: "can_go_international",
            headerName: "Can Go International",
            width: 150,
        },
        { field: "mileage", headerName: "Mileage", width: 150 },
        { field: "hours", headerName: "Hours", width: 150 },
        {
            field: "gross_vehicle_weight",
            headerName: "Gross Vehicle Weight",
            width: 150,
        },
        { field: "tare_weight", headerName: "Tare Weight", width: 150 },
        { field: "height", headerName: "Height", width: 150 },
        { field: "truck_type_name", headerName: "Truck Type Name", width: 150 },
        { field: "assigned_pex", headerName: "Assigned Pex", width: 150 },
        {
            field: "geolocation",
            headerName: "Geolocation",
            width: 300,
            valueGetter: (params: AnyType) =>
                `Lat: ${params.row.geolocation.lat} Lon: ${params.row.geolocation.lon}`,
        },
        {
            field: "last_trimester_order_count",
            headerName: "Last Trimester Order Count",
            width: 150,
        },
        {
            field: "last_trimester_mileage_count",
            headerName: "Last Trimester Mileage Count",
            width: 150,
        },
    ];

    const ordersColumns = [
        { field: "id", headerName: "ID", width: 150 },
        { field: "status", headerName: "Status", width: 150 },
        { field: "deadline_date", headerName: "Deadline Date", width: 150 },
        { field: "delivery_date", headerName: "Delivery Date", width: 150 },
        { field: "assigned_truck", headerName: "Assigned Truck", width: 150 },
        { field: "date", headerName: "Date", width: 150 },
        { field: "quantity", headerName: "Quantity", width: 150 },
        { field: "truck_type", headerName: "Truck Type", width: 150 },
        { field: "material", headerName: "Material", width: 150 },
        {
            field: "origin",
            headerName: "Origin",
            width: 300,
            valueGetter: (params: AnyType) =>
                `${params.row.origin.name} lat: ${params.row.origin.lat} lon: ${params.row.origin.lon}`,
        },
        {
            field: "destination",
            headerName: "Destination",
            width: 300,
            valueGetter: (params: AnyType) =>
                `${params.row.destination.name} lat: ${params.row.destination.lat} lon: ${params.row.destination.lon}`,
        },
    ];

    const resultVehiclesColumns = [
        ...vehiclesColumns,
        {
            field: "score",
            headerName: "Score",
            width: 150,
        },
    ];

    const [selectedOrder, setSelectedOrder] = useState<string>("ORDER-TEST-1");
    const [forceClean, setForceClean] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState<AnyObject[]>([]);
    const [resultBest, setResultBest] = useState<AnyObject>();

    const handleExecuteProcess = async () => {
        setLoading(true);
        const resultData = await fetch("http://localhost:5757/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                order_id: selectedOrder,
                force_clean: forceClean,
            }),
        });

        const resultJson = await resultData.json();
        setResult(resultJson.vehicle_list);
        setResultBest(resultJson.best_vehicle);
        setLoading(false);
    };

    return (
        <MainContainer>
            <Container>
                <Title>Vehicles</Title>
                <Container
                    width="100%"
                    height="500px"
                    margin={{ top: spaces.mhalf }}
                >
                    <DataGrid rows={vehicles} columns={vehiclesColumns} />
                </Container>
            </Container>
            <Container margin={{ top: spaces.lhalf }}>
                <Title>Orders</Title>
                <Container
                    width="100%"
                    height="500px"
                    margin={{ top: spaces.mhalf }}
                >
                    <DataGrid rows={orders} columns={ordersColumns} />
                </Container>
            </Container>
            <Container
                margin={{ top: spaces.lhalf }}
                padding={{ bottom: spaces.lhalf }}
            >
                <Title>Input data</Title>
                <Container
                    width="100%"
                    margin={{ top: spaces.mhalf }}
                    flex={{ columnGap: spaces.l, alignItems: "flex-end" }}
                >
                    <Select
                        label="Select an order"
                        options={orders.map((order) => ({
                            value: order.id,
                            label: order.id,
                        }))}
                        value={selectedOrder}
                        onChange={(value) => setSelectedOrder(value)}
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={forceClean}
                                onChange={(e) =>
                                    setForceClean(e.target.checked)
                                }
                            />
                        }
                        label="Force Clean"
                    />
                </Container>
                <Container margin={{ top: spaces.mhalf }}>
                    <LoadingButton
                        loading={loading}
                        variant="contained"
                        color="primary"
                        onClick={handleExecuteProcess}
                    >
                        Execute process
                    </LoadingButton>
                </Container>
            </Container>

            {resultBest && (
                <>
                    <Container
                        margin={{ top: spaces.lhalf }}
                        padding={{ bottom: spaces.lhalf }}
                    >
                        <Title>Result Table</Title>
                        <Container
                            width="100%"
                            height="500px"
                            margin={{ top: spaces.mhalf }}
                        >
                            <DataGrid
                                rows={result}
                                columns={resultVehiclesColumns}
                            />
                        </Container>
                    </Container>

                    <Container
                        margin={{ top: spaces.lhalf }}
                        padding={{ bottom: spaces.lhalf }}
                    >
                        <Title>Result Best</Title>
                        <Container
                            width="100%"
                            height="500px"
                            margin={{ top: spaces.mhalf }}
                        >
                            <BodyText>{resultBest.license_plate}</BodyText>
                        </Container>
                    </Container>
                </>
            )}
        </MainContainer>
    );
}

export default Home;
