import React, { Component } from 'react'
import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
position: fixed;
top: 0;
left: 8rem;
z-index: 0;
height: 10rem;
width: calc(100% - 8rem);
background-color: #A5A5A5;
display: block;
`;

export default class DashboardHeader extends Component {
    render() {
        return (
            <HeaderWrapper>
                12345
            </HeaderWrapper>
        )
    }
}
