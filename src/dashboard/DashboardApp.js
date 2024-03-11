import React, { Component } from 'react'
import styled from "@emotion/styled";
import { ThemeProvider } from '@emotion/react';

const theme = {

}

const Container = styled.div`
    background-color: #D9D9D9;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export default class DashboardApp extends Component {
  render() {


    return (
      <ThemeProvider theme={theme}>
        <Container>

        </Container>
      </ThemeProvider>
    )
  }
}
