import styled from '@emotion/styled'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons';

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
font-size: 2rem;
writing-mode: vertical-rl;
transform: rotate(-180deg);
border: .2rem solid #FFFFFF;
border-radius: .5rem;
cursor: pointer;

&:hover {
    background-color: #000000;
}
`;

const IconWrapper = styled(FontAwesomeIcon)`
color: #FFFFFF;
font-size: 3.5rem;
margin-top: 5rem;
margin-bottom: 1rem;

&:hover {
    color: #000000;
}
`;

export default class DashboardNav extends Component {
    render() {
        return (
            <NavWrapper>
                <IconWrapper icon={faHouse} />
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
