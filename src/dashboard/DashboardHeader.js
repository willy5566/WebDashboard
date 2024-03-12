import React, { Component } from 'react'
import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
position: fixed;
top: 0;
left: 8rem;
z-index: 1000;
height: 9rem;
width: calc(100% - 8rem);
background-color: #D9D9D9;
display: block;
padding-left: 22rem;
`;

const ItemContainer = styled.ul`
display: flex;
padding: 0;
margin-top: .5rem;
margin-bottom: 1rem;
`;

const SelectItem = styled.li`
display: block;
background-color: #FFFFFF;
color: #000000;
border-radius: .3rem;
width: 15rem;
text-align: center;
font-weight: 600;
font-size: 1.6rem;
height: 3rem;
line-height: 3rem;
margin-right: 1rem;
`;

const DrawLine = styled.div`
width: ${props => props.length};
border-bottom: 1px solid #000000;
`;

const ShippingContainer = styled.div`
padding: 0;
margin-top: 2rem;
display: flex;
align-items: center;
font-size: 1.6rem;
justify-content: space-between;
width: 31.1rem;
`;

export default class DashboardHeader extends Component {
    render() {
        return (
            <HeaderWrapper>
                <ShippingContainer>
                    <DrawLine length='10rem' />
                    Shipping Date
                    <DrawLine length='10rem' />
                </ShippingContainer>
                <ItemContainer>
                    <SelectItem>
                        Start date
                    </SelectItem>
                    <SelectItem>
                        End date
                    </SelectItem>
                    <SelectItem>
                        Model
                    </SelectItem>
                    <SelectItem>
                        MB
                    </SelectItem>
                    <SelectItem>
                        Customer
                    </SelectItem>
                </ItemContainer>
                <DrawLine length='31.1rem' />

            </HeaderWrapper>
        )
    }
}
