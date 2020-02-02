import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    body {
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }
    html, body, #__next {
        min-height: 100%;
        width: 100%;
        background-color: #fff;
    }
`;
