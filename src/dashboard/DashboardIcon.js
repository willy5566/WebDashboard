import React, { Component } from 'react'
import styled from '@emotion/styled'
import HomeIcon from './../images/home.svg'
import ArrowIcon from './../images/arrow.svg'
import InventoryIcon from './../images/inventory.svg'
import LocationIcon from './../images/location.svg'
import QualityIcon from './../images/quality.svg'

const IconContainer = styled.div`
//margin-top: 4.5rem;
//flex-basis: 30%;

svg {   
    //width: 4rem;
    //height: 4rem;
    fill: #FFFFFF;
    scale: ${props => props.scale};
}

&:hover {
    svg {
        fill: #000000;
        cursor: pointer;
    }
}
`;

const dashboardIcons = {
    Home: <HomeIcon />,
    Back: <ArrowIcon />,
    Inventory: <InventoryIcon />,
    Location: <LocationIcon />,
    Quality: <QualityIcon />
}

const DashboardIcon = (props) => {

    const { icon, scale } = props;

    return (
        <IconContainer scale={scale}>
            {dashboardIcons[icon]}
        </IconContainer>
    )
}

export default DashboardIcon;