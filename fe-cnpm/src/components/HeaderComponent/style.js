import { Row } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const WrapperHeader = styled(Row)`
    background-color: var(--primary-color);
    align-items: center;
    gap: 16px;
    flex-wrap: nowrap;
    width: 1270px;
    padding: 10px 0;
`

export const WrapperTextHeader = styled(Link)`
    font-size: 26px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    text-decoration: none;
    letter-spacing: 1.5px;
    line-height: 1.2;
    &:hover {
        color: #fff;
    }
`

export const WrapperLogo = styled.img`
    height: 50px;
    width: 50px;
    object-fit: contain;
    border-radius: 8px;
    background: #fff;
    padding: 2px;
`

export const WrapperTextContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`

export const WrapperSlogan = styled.span`
    font-size: 13px;
    color: #e0e0e0;
    font-style: italic;
    white-space: nowrap;
    margin-top: 4px;
    font-weight: 300;
`

export const WrapperHeaderAccout = styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    gap: 10px;
    max-width: 200px;
`

export const WrapperTextHeaderSmall = styled.span`
    font-size: 12px;
    color: #fff;
    white-space: nowrap;
`

export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`