import React, { Component } from 'react'
import styled from '@emotion/styled'
import {
    PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend,
    BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid,
} from 'recharts';

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
    font-size: 1.5rem;
    text-align: center;
    `;

    const ShowValue = styled.div`
    font-size: 2.5rem;
    text-align: center;
    `;

    return <Container>
        <PieChart width={200} height={200}>
            <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
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
    console.log(props)
    const data = [
        { name: 'System Event', count: props.errorEventCount },
        { name: 'Abnormal Power Off', count: props.errorAbnormalOffCount },
        { name: 'CPU temp over 90°C', count: props.errorCpuHighTempCount },
    ];

    const Container = styled.div`
    display: flex;
    font-size: 1.2rem;
    `;

    return <Container>
        <BarChart
            width={450}
            height={200}
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
            <Bar dataKey="count" fill="#8884d8" barSize={30}
                activeBar={<Rectangle fill="pink" stroke="blue" />}
            />
        </BarChart>
    </Container>;
}

const LifeChart = () => {

}

const LocationChart = () => {

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
        totalVolume
    } = props.devicesElement;
    const onlineChart = <OnlineChart
        online={online}
        offline={offline} />;

    const warningChart = <WarningChart
        errorAbnormalOffCount={errorAbnormalOffCount}
        errorCpuHighTempCount={errorCpuHighTempCount}
        errorEventCount={errorEventCount}
    />

    return (
        <ChartContainer>
            <ChartCard
                title='Number of online and offline units'
                chart={onlineChart} />
            <ChartCard
                title='Total number of units with problems'
                chart={warningChart} />
            <ChartCard title='The time between the first and last reply' />
            <ChartCard title='Location' />
        </ChartContainer>
    )

}

export default DashboardChart;

