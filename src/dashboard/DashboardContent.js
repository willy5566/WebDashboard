import styled from '@emotion/styled'
import React, { Component } from 'react'

import DashboardCal from './DashboardCal';
import DashboardChart from './DashboardChart';

const ContentWrapper = styled.div`
padding: 0;
margin: 0;
height: calc(100% - 90px);
width: calc(100% - 80px);
background-color: transparent;
display: flex;
`;

const DashboardContent = (props) => {
    return (
        <ContentWrapper>
            <DashboardCal
                devicesElement={props.devicesElement} />
            <DashboardChart
                devicesElement={props.devicesElement} />
        </ContentWrapper>
    )

}

export default DashboardContent;
