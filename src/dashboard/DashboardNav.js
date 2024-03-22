import styled from '@emotion/styled'
import React, { Component, useState, useEffect } from 'react'
import DashboardIcon from './DashboardIcon';

const NavWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 1000;
height: 100%;
width: 361px;
background-color: #FFFFFF;
display: block;
text-align: center;
`;

const NavButton = styled.div`
margin: 0px 30px;
margin-bottom: 20px;
padding: 1rem;
position: relative;
background-color: ${props => props.thisPage ? '#0066EF' : 'transparent'} ;
display: flex;
text-align: center;
color:   ${props => props.thisPage ? 'white' : '#5A5A5A'} ;
font-size: 24px;
line-height: 29.5px;
//writing-mode: vertical-rl;
//transform: rotate(-180deg);
border: 0px solid #FFFFFF;
border-radius: .5rem;
cursor: pointer;

svg {
        path {
            fill: ${props => props.thisPage ? 'white' : '#5A5A5A'} ;
        }        
    }

&:hover {
    background-color: #0066EF;
    color: white;

    svg {
        path {
            fill: white ;
        }        
    }
}

&:first-of-type {
    margin-top: 40px;
}
`;

const BackButton = styled.div`
padding-top: 3px;
width: 84px;
height: 49px;
background-color: #0066EF;
border-radius: 10px;
display: flex;
justify-content: center;
align-items: center;
cursor: pointer;
position: fixed;
top: calc(100% - 120px);
left: 41px;
`;

const ButtonIcon = styled.div`
width: 40px;
height: 40px;
margin: 10px 20px 5px 15px;
display: flex;
justify-content: center;
align-items: center;
`;

const ButtonText = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

const DashboardNav = (props) => {

    const { handlePage, page } = props;

    let pageInventory = page === 'Inventory';
    let pageQuality = page === 'Quality';
    let pageLocation = page === 'Location';

    return (
        <NavWrapper>
            <NavButton
                onClick={() => handlePage('Inventory')}
                thisPage={pageInventory}
            >
                <ButtonIcon>
                    <DashboardIcon
                        icon='Inventory'
                        scale='1.4' />
                </ButtonIcon>
                <ButtonText>
                    Inventory
                </ButtonText>
            </NavButton>
            <NavButton
                onClick={() => handlePage('Quality')}
                thisPage={pageQuality}
            >
                <ButtonIcon>
                    <DashboardIcon
                        icon='Quality'
                        scale='1.4' />
                </ButtonIcon>
                <ButtonText>
                    Quality
                </ButtonText>
            </NavButton>
            <NavButton
                onClick={() => handlePage('Location')}
                thisPage={pageLocation}
            >
                <ButtonIcon>
                    <DashboardIcon
                        icon='Location'
                        scale='1.4' />
                </ButtonIcon>
                <ButtonText>
                    MTBF & Location
                </ButtonText>
            </NavButton>
            <BackButton
                onClick={() => handlePage('Home')}>
                <DashboardIcon
                    icon='Back'
                    scale='3' />
            </BackButton>
        </NavWrapper>
    )
}

export default DashboardNav;

