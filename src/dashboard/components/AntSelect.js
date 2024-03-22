import React from 'react';
import { Select, ConfigProvider, Space } from 'antd';
import styled from '@emotion/styled';
import "./style.css";

const SelectWrapper = styled(Select)`
width: 242px;
height: 80px;
box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
border-radius: 40px;
margin-right: 20px;
font-family: 'Inter';
`;

const AntSelect = (props) => {

    const { placeholder, options } = props;

    return (
        <ConfigProvider
            theme={{
                components: {
                    Select: {
                        colorPrimary: 'white',
                        borderRadius: 40,
                        fontSize: 24,
                        colorBorder: 'white',
                        colorPrimaryHover: 'white',
                        colorPrimaryActive: 'white',
                        colorText: 'black',
                        colorTextPlaceholder: 'black',

                    }
                }
            }}>

            <Space>
                <SelectWrapper
                    type='primary'
                    id='inputSelect'
                    showSearch
                    placeholder={placeholder}
                    optionFilterProp="children"
                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    options={options}
                />
            </Space>

        </ConfigProvider>
    )
}

export default AntSelect;