import React from 'react';
import { DatePicker, Space, ConfigProvider } from 'antd';
import styled from '@emotion/styled';
import "./style.css";

const onChange = (date, dateString) => {
    console.log(date, dateString);
};


const DatePickerWrapper = styled(DatePicker)`
width: 242px;
height: 80px;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
border-radius: 40px;
padding: 0;
margin-right: ${props => props.placeholder === 'Start date' ? '20px' : '167px'} ;
cursor: pointer;   
input {
    text-align:center;
    color: white;
    font-family: 'Inter';
    cursor: pointer;    
}
`;

const AntDatePicker = (props) => {
    const { placeholder } = props;


    return (
        <ConfigProvider
            theme={{
                components: {
                    DatePicker: {
                        colorPrimary: '#498FED',
                        borderRadius: 40,
                        fontSize: 24,
                        colorBorder: '#498FED',
                        colorPrimaryHover: '#498FED',
                        colorPrimaryActive: '#498FED',
                        colorText: 'black',
                        colorTextPlaceholder: 'white',
                        colorBgBase: '#498FED',
                        colorBgContainer: '#498FED',


                    }
                }
            }}>
            <Space direction="vertical">
                <DatePickerWrapper type="primary"
                    format={{
                        format: 'YYYY-MM-DD',
                        type: 'mask',
                    }}
                    onChange={onChange}
                    id='inputID'
                    placeholder={placeholder}
                />
            </Space>
        </ConfigProvider>
    )
};
export default AntDatePicker;