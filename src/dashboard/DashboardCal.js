import styled from '@emotion/styled'
import React, { Component } from 'react'

const CalContainer = styled.div`
padding: 1%;
position: relative;
display: block;
margin-left: 10px;
height: 95%;
width: 160px;
background-color: transparent;
`;

const CardStyle = {
    position: 'relative',
    marginBottom: '12px',
    height: '100px',
    width: '90%',
    textAlign: 'left',
    fontSize: '13px',
    backgroundColor: 'white',
    padding: '5%',
    borderRadius: '15px'
}

const TitleStyle = {
    width: '100%',
}

const ContentStyle = {
    height: '80px',
    width: '100%',
    backgroundColor: 'transparent',
    fontSize: '35px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
}

const UnitStyle = {
    fontSize: '20px',
    marginLeft: '5px'
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
