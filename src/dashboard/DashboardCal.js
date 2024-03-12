import styled from '@emotion/styled'
import React, { Component } from 'react'

const CalContainer = styled.div`
padding: 1rem;
position: relative;
display: block;
margin-left: 1rem;
height: 100%;
width: 20rem;
background-color: transparent;
`;

const CardStyle = {
    position: 'relative',
    marginBottom: '1.2rem',
    height: '14rem',
    width: '100%',
    textAlign: 'left',
    fontSize: '1.3rem',
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: '1.5rem'
}

const TitleStyle = {
    width: '100%',
    fontSize: '1.5rem'
}

const ContentStyle = {
    height: '8rem',
    width: '100%',
    backgroundColor: 'transparent',
    fontSize: '4rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const UnitStyle = {
    fontSize: '2rem',
    marginLeft: '.5rem'
}

const CalCard = (props) => {
    return <div style={CardStyle}>

        <div style={TitleStyle}>
            {props.title}
        </div>
        <div style={ContentStyle}>
            <div style={{
                alignItems: 'baseline'
            }}>
                {props.value}<span style={UnitStyle}>{props.unit}</span>
            </div>

        </div>

    </div >
}

const DashboardCal = (props) => {
    //console.log(props.devicesElement);
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
    return (
        <CalContainer>
            <CalCard
                title='Total Shipped Volume'
                value={totalVolume}
                unit='pcs' />
            <CalCard
                title='Online Percentage'
                value={(online / totalVolume * 100).toFixed(1)}
                unit='%' />
            <CalCard
                title='Total Units with problems'
                value={errorUnitCount}
                unit='pcs' />
            <CalCard
                title='The Average Lifetime'
                value={averageLifeTime.toFixed(2)}
                unit='mth' />
        </CalContainer>
    )

}

export default DashboardCal;
