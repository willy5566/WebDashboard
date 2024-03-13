import React, { Component, useState } from 'react'
import styled from '@emotion/styled'
import {
    PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend,
    BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import { GoogleMap, MarkerF, useJsApiLoader, useLoadScript } from '@react-google-maps/api';

const ChartContainer = styled.div`
position: relative;
display: grid;
grid-template-columns: repeat(auto-fit, minmax(42rem, 1fr));
gap: 1.2rem;
grid-row-gap: 1.2rem;
height: 100%;
width: calc(100% - 21rem);
background-color: transparent;
padding: 1rem;
`;

const CardStyle = {
    // position: 'relative',
    // top: '1.2rem',
    // left: '1rem',
    height: '29rem',
    // width: 'calc(100% - 2rem)',
    textAlign: 'left',
    fontSize: '1.3rem',
    backgroundColor: 'white',
    padding: '0px',
    borderRadius: '1.5rem'
}

const TitleStyle = {
    width: '100%',
    padding: '0rem 3rem',
    fontSize: '2.5rem',
    height: '5rem',
    lineHeight: '5rem',
    fontWeight: '600',
}

const ContentStyle = {
    height: 'calc(100% - 5rem)',
    width: '100%',
    fontSize: '3.5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const OnlineChart = (props) => {
    const data = [
        { name: 'online', value: props.online },
        { name: 'offline', value: props.offline },
    ]
    const COLORS = ['#FFBB28', '#FF8042'];

    const Container = styled.div`
    display: flex;
    `;

    const ShowValueContainer = styled.div`
    `;

    const ShowValueView = styled.div`
    background-color: ${props => props.type === 'online' ? '#FFBB28' : '#FF8042'};
    border-radius: 1rem;
    padding: 1rem 3rem;
    margin: 1rem;
    margin-left: 5.5rem;
    `;

    const ShowValueName = styled.div`
    font-size: 2rem;
    text-align: center;
    `;

    const ShowValue = styled.div`
    font-size: 4rem;
    text-align: center;
    `;

    return <Container>
        <PieChart width={250} height={250}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={120} fill="#8884d8">
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

    const Container = styled.div`
    display: flex;
    font-size: 1.5rem;
    `;

    return <Container>
        <BarChart
            width={650}
            height={250}
            data={data}
            margin={{
                top: 5,
                right: 50,
                left: 0,
                bottom: 5
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" barSize={50}
                activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
        </BarChart>
    </Container>;
}

const LifeChart = (props) => {
    const data = [
        { name: '1 month', count: props.life_0_1 },
        { name: '2 month', count: props.life_1_2 },
        { name: '3 month', count: props.life_2_3 },
        { name: '4 month', count: props.life_3_4 },
        { name: 'more than 4', count: props.life_4_N },
        { name: 'Never', count: props.life_never },
    ];

    const Container = styled.div`
    display: flex;
    font-size: 1.5rem;
    `;

    return <Container>
        <BarChart
            width={550}
            height={250}
            data={data}
            margin={{
                top: 25,
                right: 0,
                left: 0,
                bottom: 5
            }}
        >
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="name" />
            {/* <YAxis /> */}
            {/* <Legend /> */}
            <Tooltip />
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

    // const markers = [
    //     {
    //         key: 1,
    //         pos: {
    //             lat: 61.5226949459836,
    //             lng: 89.47265625
    //         }
    //     },
    //     {
    //         key: 2,
    //         pos: {
    //             lat: 57.79794388498275,
    //             lng: 65.21484375
    //         }
    //     },
    //     {
    //         key: 3,
    //         pos: {
    //             lat: 38.685509760012,
    //             lng: 57.48046875
    //         }
    //     },
    //     {
    //         key: 4,
    //         pos: {
    //             lat: 16.804541076383455,
    //             lng: 109.16015625
    //         }
    //     }
    // ];

    // const [activeMarker, setActiveMarker] = useState(null);

    // const handleActiveMarker = (marker) => {
    //     if (marker === activeMarker) {
    //         return;
    //     }
    //     setActiveMarker(marker);
    // }

    return (
        <div style={{
            width: '100%', height: '100%',
            display: 'flex',
            justifyContent: 'center'
        }}>
            {isLoaded ? (
                <GoogleMap
                    center={{ lat: 35, lng: 0 }}
                    zoom={1}
                    mapContainerStyle={{
                        width: '85%',
                        height: '90%'
                    }}>

                    {
                        markers.map((marker => {
                            return (
                                <MarkerF
                                    key={marker.ip}
                                    position={marker.latLng} />
                            )
                        }))
                    }


                </GoogleMap>
            ) : null}
        </div>
    );
}

const ChartCard = (props) => {
    return <div style={CardStyle}>
        <div style={TitleStyle}>
            {props.title}
        </div>
        <div style={ContentStyle}>
            {props.chart}
        </div>
    </div>
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
        map
    } = props.devicesElement;
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

    return (
        <ChartContainer>
            <ChartCard
                title='Number of online and offline units'
                chart={onlineChart} />
            <ChartCard
                title='Total number of units with problems'
                chart={warningChart} />
            <ChartCard
                title='The time between the first and last reply'
                chart={lifeChart} />
            <ChartCard title='Location'
                chart={locationChart} />
        </ChartContainer>
    )

}

export default DashboardChart;

