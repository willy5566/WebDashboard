import styled from '@emotion/styled'
import React, { Component } from 'react'

import DashboardCal from './DashboardCal';
import DashboardChart from './DashboardChart';

const ContentWrapper = styled.div`
padding: 0;
margin-top: 9rem;
height: calc(100% - 9rem);
width: calc(100% - 8rem);
background-color: transparent;
display: flex;
position: relative;
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
