import React, { Component } from 'react'
import styled from '@emotion/styled'

const HeaderWrapper = styled.div`
position: fixed;
top: 0;
left: 80px;
z-index: 1000;
height: 90px;
width: calc(100% - 80px);
background-color: #D9D9D9;
display: block;
padding-left: 200px;
`;

const ItemContainer = styled.ul`
display: flex;
padding: 0;
margin-top: 5px;
margin-bottom: 10px;
`;

const SelectItem = styled.li`
display: block;
background-color: #FFFFFF;
color: #000000;
border-radius: 3px;
width: 150px;
text-align: center;
font-weight: 600;
font-size: 16px;
height: 20px;
margin-right: 10px;
`;

const DrawLine = styled.div`
width: ${props => props.length};
border-bottom: 1px solid #000000;
`;

const ShippingContainer = styled.div`
padding: 0;
margin-top: 30px;
display: flex;
align-items: center;
font-size: 16px;
justify-content: space-between;
width: 311px;
`;

export default class DashboardHeader extends Component {
    render() {
        return (
            <HeaderWrapper>
                <ShippingContainer>
                    <DrawLine length='100px' />
                    Shipping Date
                    <DrawLine length='100px' />
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
                <DrawLine length='311px' />

            </HeaderWrapper>
        )
    }
}
