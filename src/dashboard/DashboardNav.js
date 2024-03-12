import styled from '@emotion/styled'
import React, { Component } from 'react'
import DashboardIcon from './DashboardIcon';

const NavWrapper = styled.div`
position: fixed;
top: 0;
left: 0;
z-index: 0;
height: 100%;
width: 8rem;
background-color: #A5A5A5;
display: block;
text-align: center;
`;

const NavButton = styled.div`
margin: auto;
margin-top: 1.5rem;
padding: 1rem;
position: relative;
background-color: transparent;
display: flex;
text-align: center;
color: #FFFFFF;
font-size: 1.8rem;
writing-mode: vertical-rl;
transform: rotate(-180deg);
border: 1px solid #FFFFFF;
border-radius: .5rem;
cursor: pointer;

&:hover {
    background-color: #000000;
}
`;

export default class DashboardNav extends Component {
    render() {
        return (
            <NavWrapper>
                <DashboardIcon
                    icon='Home' />
                <NavButton>
                    Inventory
                </NavButton>
                <NavButton>
                    Quality
                </NavButton>
                <NavButton>
                    MTBF & Location
                </NavButton>
            </NavWrapper>
        )
    }
}
