import React, { Component } from 'react'
import styled from '@emotion/styled'
import HomeIcon from './../images/home.svg'

const IconContainer = styled.div`
margin-top: 4.5rem;
flex-basis: 30%;

svg {
    width: 4rem;
    height: 4rem;
    fill: #FFFFFF;    
}

&:hover {
    svg {
        fill: #000000;
        cursor: pointer;
    }
}
`;

const dashboardIcons = {
    Home: <HomeIcon />
}

const DashboardIcon = (props) => {

    const { icon } = props;

    return (
        <IconContainer>
            {dashboardIcons[icon]}
        </IconContainer>
    )
}

export default DashboardIcon;