import styled from '@emotion/styled'
import React, { Component } from 'react'

const CalContainer = styled.div`

position: relative;
display: block;
margin-left: 59px;
height: 100%;
background-color: transparent;
`;

const CardStyle = styled.div`
    margin-bottom: 22px;
    padding: 27px 32px;
    //text-align: left;
    width: 336px;
    height: 175px;
    background: #FFFFFF;
    box-shadow: 0px 4px 10px rgba(182, 182, 182, 0.25);
    border-radius: 30px;

&:last-of-type{
    margin-bottom: 0;
}
`

const TitleStyle = styled.div`
    font-size: 18px;
`;

const DescriptionStyle = styled.div`
margin-left: 10px;
font-size: 14px;
color: #666666;
`;

const ContentStyle = styled.div`
    height: 100%;
    width: 100%;
    background-color: transparent;
    font-size: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 15px;
`;

const UnitStyle = styled.span`
    font-size: 24px;
    margin-left: 5px;
`;

const CalCard = (props) => {
    return <CardStyle>

        <TitleStyle>
            {props.title}
        </TitleStyle>
        <DescriptionStyle>
            {props.subTitle}
        </DescriptionStyle>
        <ContentStyle>
            <div style={{
                alignItems: 'baseline',
                fontSize: '48px'
            }}>
                {props.value}<UnitStyle>{props.unit}</UnitStyle>
            </div>

        </ContentStyle>

    </CardStyle >
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
    const { page } = props;
    return (
        <CalContainer>

            <CalCard
                title='Total Shipped Volume'
                //subTitle='Total shipment quantity'
                value={totalVolume}
                unit='pcs' />

            {(page === 'Inventory' || page === 'Home') && (
                <CalCard
                    title='Online Percentage'
                    //subTitle='Percentage of devices that have been online since shipment'
                    value={(online / totalVolume * 100).toFixed(1)}
                    unit='%' />
            )}
            {(page === 'Quality' || page === 'Home') && (
                <CalCard
                    title='Total Units with problems'
                    //subTitle='Number of devices with problems'
                    value={errorUnitCount}
                    unit='pcs' />
            )}
            {(page === 'Location' || page === 'Home') && (
                <CalCard
                    title='The Average Lifetime'
                    //subTitle='On online machines, the time difference between the first reply and the last reply'
                    value={averageLifeTime.toFixed(2)}
                    unit='mth' />
            )}
        </CalContainer>
    )

}

export default DashboardCal;
