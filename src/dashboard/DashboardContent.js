import styled from '@emotion/styled'
import React, { Component } from 'react'

import DashboardCal from './DashboardCal';
import DashboardChart from './DashboardChart';
import DashboardData from './DashboardData';

const ContentWrapper = styled.div`
padding: 0;
margin-top: 173px;
height: calc(100% - 173px);
width: calc(100% - 361px);
background-color: transparent;
display: block;
`;

const Statistics = styled.div`
background-color: transparent;
display: flex;
`;

const DashboardContent = (props) => {
    const { devicesElement, page } = props;

    return (
        <ContentWrapper>
            <Statistics>
                <DashboardCal
                    devicesElement={devicesElement}
                    page={page} />
                <DashboardChart
                    devicesElement={devicesElement}
                    page={page} />
            </Statistics>
            {page !== 'Home' && (
                <DashboardData>

                </DashboardData>
            )}

        </ContentWrapper>
    )

}

export default DashboardContent;
