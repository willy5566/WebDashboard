import React, { Component, useState } from 'react'
import styled from '@emotion/styled'
import {
    PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend,
    BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { GoogleMap, MarkerF, useJsApiLoader, useLoadScript } from '@react-google-maps/api';
import SimpleBarChart from './SimpleBarChart';
//import CustomMarker from '../images/blue.png'

var iconPin = {
    path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8z',
    fillColor: '#FFBB28',
    fillOpacity: 1,
    scale: 0.02, //to reduce the size of icons
};

const ChartContainer = styled.div`
position: relative;
display: grid;
grid-template-columns: 1fr 1fr;
gap: 31px;
grid-row-gap: 22px;
padding: 0 0 0 31px;
height: 100%;
background-color: transparent;
`;

const CardStyle = styled.div`
    text-align: left;
    background-color: #FFFFFF;
    border-radius: 30px;

    width: 519px;
    height: 372px;
    overflow: clip;
    filter: drop-shadow(0px 4px 10px rgba(182, 182, 182, 0.25));

`;

const TitleStyle = styled.div`
margin: 28px 0 0px 20px;
font-size: 24px;
width: 460px;
`;

const DescriptionStyle = styled.div`
font-size: 14px;
margin-left: 38px;
color: #666666;
`;

const ContentStyle = styled.div`
    height: calc(100% - 50px);
    height: ${props => props.title === 'Location' || 'auto'} ;
    //width: 100%;
    margin-top: 20px;
    font-size: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

function getCircle(count) {

    let circleSize = 2;

    if (count > 10) {
        circleSize = circleSize + 1;
    } else if (count > 100) {
        circleSize = circleSize + 2;
    } else if (count > 1000) {
        circleSize = circleSize + 3;
    } else {
        circleSize = circleSize + 4;
    }

    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: "yellow",
        fillOpacity: 0.2,
        scale: circleSize,
        strokeColor: "white",
        strokeWeight: 0.5,
    };
}

const OnlineChart = (props) => {
    const data = [
        { name: 'online', value: props.online },
        { name: 'offline', value: props.offline },
    ]
    const COLORS = ['#0066EF', '#8AB6F1'];

    const Container = styled.div`
    display: flex;
    `;

    const ShowValueContainer = styled.div`
    `;

    const ShowValueView = styled.div`
    color: white;
    background-color: ${props => props.type === 'online' ? '#0066EF' : '#8AB6F1'};
    border-radius: 10px;
    //padding: 1rem 3rem;
    height: 96px;
    width: 149px;
    margin-top: 21px;
    margin-left: 30px;
    `;

    const ShowValueName = styled.div`
    padding-top: 9px;
    font-size: 16px;
    text-align: center;
    `;

    const ShowValue = styled.div`
    padding-top: 18px;
    font-size: 24px;
    text-align: center;
    `;

    return <Container>
        <PieChart width={250} height={250}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={110} fill="#8884d8">
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
        </PieChart>
        <ShowValueContainer>
            <ShowValueView type='online'>
                <ShowValueName>Online</ShowValueName>
                <ShowValue>{props.online}</ShowValue>
            </ShowValueView>
            <ShowValueView type='offline'>
                <ShowValueName>Offline</ShowValueName>
                <ShowValue>{props.offline}</ShowValue>
            </ShowValueView>
        </ShowValueContainer>
    </Container>
}

const WarningChart = (props) => {
    //console.log(props)
    const data = [
        { name: 'System Event', count: props.errorEventCount },
        { name: 'Abnormal Power Off', count: props.errorAbnormalOffCount },
        { name: 'CPU temp over 90°C', count: props.errorCpuHighTempCount },
    ];

    const colors = ['#8AB6F1', '#0066EF', '#498FED'];

    const Container = styled.div`
    display: flex;
    font-size: 13px;
    `;

    return <Container>
        <BarChart

            width={450}
            height={250}
            data={data}
            margin={{
                top: 25,
                right: 0,
                left: 0,
                bottom: 0
            }}
        >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            {/* <Tooltip /> */}
            {/* <Legend /> */}
            <Bar dataKey="count" fill="#8884d8" barSize={50}
                // activeBar={<Rectangle fill="pink" stroke="blue" />}                
                label={{ position: "top" }}>
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
            </Bar>

        </BarChart>
    </Container>;
}

const LifeChart = (props) => {
    const data = [
        { name: '1 mth', count: props.life_0_1 },
        { name: '2 mth', count: props.life_1_2 },
        { name: '3 mth', count: props.life_2_3 },
        { name: '4 mth', count: props.life_3_4 },
        { name: '> 4 mth', count: props.life_4_N },
        { name: 'Never', count: props.life_never },
    ];

    const Container = styled.div`
    display: flex;
    font-size: 16px;
    `;

    return <Container>
        <BarChart

            width={450}
            height={250}
            data={data}
            margin={{
                top: 15,
                right: 0,
                left: 0,
                bottom: 0
            }}
        >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            {/* <Legend /> */}
            {/* <Tooltip /> */}
            <Bar dataKey="count" fill="#5B9BD5" barSize={50}
                label={{ position: "top" }}
            />
        </BarChart>
    </Container>;
}

const LocationChart = (props) => {
    const markers = props.map;

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: ''
    });

    return (
        <div style={{
            width: '100%', height: '100%',
            display: 'flex',
            justifyContent: 'center',
        }}>

            {isLoaded ? (
                <GoogleMap
                    center={{ lat: 30, lng: 10 }}
                    zoom={1}
                    mapContainerStyle={{
                        width: '100%',
                        height: '100%',
                        //maxWidth: '42rem'
                    }}>

                    {
                        markers.map((marker => {
                            return (
                                <MarkerF
                                    key={marker.ip}
                                    position={marker.latLng}
                                    options={{
                                        icon: getCircle(marker.count),
                                    }} />
                            )
                        }))
                    }


                </GoogleMap>
            ) : null}
        </div >
    );
}

const ActiveChart = (props) => {
    const data = [
        { name: '1 mth', count: props.active_0_1 },
        { name: '2 mth', count: props.active_1_2 },
        { name: '3 mth', count: props.active_2_3 },
        { name: '4 mth', count: props.active_3_4 },
        { name: 'Never', count: props.active_never },
    ];

    const Container = styled.div`
    display: flex;
    font-size: 16px;
    `;

    return <Container>
        <SimpleBarChart
            data={data}
            xKey='name'
            yKey='count'>

        </SimpleBarChart>
        {/* <BarChart
            layout='vertical'
            width={450}
            height={250}
            data={data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 0
            }}>
            <XAxis dataKey="name" />
            <Bar dataKey="count" fill="#5B9BD5" barSize={50}
                label={{ position: "top" }}
            />
        </BarChart> */}
    </Container>;
}

const IssueChart = (props) => {
    const data = [
        {
            name: '1 mth',
            'System Event': 4000,
            'Abnormal Off': 2400,
            'Cpu High Temp': 2400,
        },
        {
            name: '2 mth',
            'System Event': 3000,
            'Abnormal Off': 1398,
            'Cpu High Temp': 2210,
        },
        {
            name: '3 mth',
            'System Event': 2000,
            'Abnormal Off': 9800,
            'Cpu High Temp': 2290,
        },
        {
            name: '4 mth',
            'System Event': 2780,
            'Abnormal Off': 3908,
            'Cpu High Temp': 2000,
        },
    ];

    const Container = styled.div`
    display: flex;
    font-size: 13px;
    `;

    return (
        <Container>
            <BarChart
                width={500}
                height={250}
                data={data}

                margin={{
                    top: 5,
                    right: 0,
                    left: 0,
                    bottom: 10,
                }}
            >
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
                <XAxis dataKey="name" />
                <YAxis axisLine={false}
                    tickLine={false} />
                {/* <Tooltip /> */}
                <Legend />
                <Bar dataKey="System Event" barSize={50} stackId="a" fill="#8AB6F1" />
                <Bar dataKey="Abnormal Off" barSize={50} stackId="a" fill="#0066EF" />
                <Bar dataKey="Cpu High Temp" barSize={50} stackId="a" fill="#498FED" />
            </BarChart>
        </Container>
    )
}

const ChartCard = (props) => {
    return <CardStyle>
        <TitleStyle>
            {props.title}
        </TitleStyle>
        <DescriptionStyle>
            {props.subTitle}
        </DescriptionStyle>
        <ContentStyle title={props.title}>
            {props.chart}
        </ContentStyle>
    </CardStyle>
}

const DashboardChart = (props) => {
    //console.log(props)
    const {
        averageLifeTime,
        errorAbnormalOffCount,
        errorCpuHighTempCount,
        errorEventCount,
        errorUnitCount,
        offline,
        online,
        totalVolume,
        life_0_1,
        life_1_2,
        life_2_3,
        life_3_4,
        life_4_N,
        life_never,
        active_0_1,
        active_1_2,
        active_2_3,
        active_3_4,
        active_never,
        map
    } = props.devicesElement;
    const { page } = props;

    const onlineChart = <OnlineChart
        online={online}
        offline={offline} />;

    const warningChart = <WarningChart
        errorAbnormalOffCount={errorAbnormalOffCount}
        errorCpuHighTempCount={errorCpuHighTempCount}
        errorEventCount={errorEventCount}
    />

    const lifeChart = <LifeChart
        life_0_1={life_0_1}
        life_1_2={life_1_2}
        life_2_3={life_2_3}
        life_3_4={life_3_4}
        life_4_N={life_4_N}
        life_never={life_never} />

    const locationChart = <LocationChart
        map={map} />

    const issueChart = <IssueChart />

    const activeChart = <ActiveChart
        active_0_1={active_0_1}
        active_1_2={active_1_2}
        active_2_3={active_2_3}
        active_3_4={active_3_4}
        active_never={active_never} />

    const inventorySubTitle = 'online: the devices that have been replied\noffline: the devices that never reply after being shipped';

    return (
        <ChartContainer>
            {(page === 'Inventory' || page === 'Home') && (
                <ChartCard
                    title='Number of online and offline units'
                    // subTitle={inventorySubTitle.split('\n').map((line, index) => (
                    //     <div key={index}>{line}</div>
                    // ))}
                    //subTitle={subTitle}
                    chart={onlineChart} />
            )}
            {(page === 'Inventory') && (
                <ChartCard
                    title='The time between the shipping date and first reply'
                    chart={activeChart} />
            )}
            {(page === 'Quality' || page === 'Home') && (
                <ChartCard
                    title='Total number of units with problems'
                    //subTitle='Statistics table for each problem'
                    chart={warningChart} />
            )}
            {(page === 'Quality') && (
                <ChartCard
                    title='Number of units with problems each month'
                    chart={issueChart} />
            )}
            {(page === 'Location' || page === 'Home') && (
                <ChartCard
                    title='The time between the first and last reply'
                    //subTitle=''
                    chart={lifeChart} />
            )}
            {(page === 'Location' || page === 'Home') && (
                <ChartCard title='Location'
                    //subTitle='The location when the device last replied'
                    chart={locationChart} />
            )}
        </ChartContainer>
    )

}

export default DashboardChart;

