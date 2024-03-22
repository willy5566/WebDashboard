import React, { Component } from 'react'
import styled from '@emotion/styled'
import AntDatePicker from './components/AntDatePicker';
import AntSelect from './components/AntSelect';

const HeaderWrapper = styled.div`
position: fixed;
top: 0;
left: 361px;
z-index: 1000;
height: 173px;
width: calc(100% - 361px);
background-color: #E0E9F1;
display: block;
padding-left: 59px;
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
text-align: center;
//font-weight: 600;
font-size: 24px;
line-height: 80px;
margin-right: 20px;
width: 242px;
height: 80px;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
border-radius: 40px;
`;

// const SelectDate = styled(SelectItem)`
// width: 242px;
// height: 80px;
// background: #498FED;
// box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
// border-radius: 40px;
// color: #FFFFFF;
// `;

// const SelectEndDate = styled(SelectDate)`
// margin-right: 167px;
// `;

// const DrawLine = styled.div`
// width: ${props => props.length};
// border-bottom: 1px solid #000000;
// `;

const ShippingContainer = styled.div`
padding: 0;
margin-top: 25px;
display: flex;
align-items: center;
font-size: 18px;
justify-content: space-between;
width: 31.1rem;
color: #5A5A5A;
`;

const options = [
    {
        value: '1',
        label: 'ALL',
    },
    {
        value: '2',
        label: 'Closed',
    },
    {
        value: '3',
        label: 'Communicated',
    },
    {
        value: '4',
        label: 'Identified',
    },

]

export default class DashboardHeader extends Component {
    render() {
        return (
            <HeaderWrapper>
                <ShippingContainer>
                    Shipping Date
                </ShippingContainer>
                <ItemContainer>
                    <AntDatePicker
                        placeholder='Start date' />
                    <AntDatePicker
                        placeholder='End date' />
                    <AntSelect
                        placeholder='Model'
                        options={options} />
                    <AntSelect
                        placeholder='MB'
                        options={options} />
                    <AntSelect
                        placeholder='Customer'
                        options={options} />
                    {/* <SelectDate>
                        Start date
                    </SelectDate> */}
                    {/* <SelectEndDate>
                        End date
                    </SelectEndDate> */}
                    {/* <SelectItem>
                        Model
                    </SelectItem> */}
                    {/* <SelectItem>
                        MB
                    </SelectItem> */}
                    {/* <SelectItem>
                        Customer
                    </SelectItem> */}
                </ItemContainer>

            </HeaderWrapper>
        )
    }
}
