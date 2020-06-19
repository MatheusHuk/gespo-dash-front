import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import styled from 'styled-components';
import logo from './logo.svg';

const StyledHeader = styled(Layout.Header)`
  padding: 0 28px
`

const StyledMenu = styled(Menu)`
  background: transparent;
  line-height: 41px;
`

const MenuItemStyled = styled(Menu.Item)`
  && {
    top: 4px;
    border-bottom: 4px solid transparent;

    &:hover {
      border-bottom: 4px solid transparent;
      & > a {
        color: #ffffff;
        opacity: 1;
      }
    }
  }
  &&.ant-menu-item-selected
  {
    color: white;
    border-bottom: 4px solid white;

    & > a {
      opacity: 1;
    }
  }
  && > a {
    color: #ffffff;
    opacity: 0.60;
    font-weight: bold;
    letter-spacing: 0.01em;
  }
`

const Logo = styled.div`
  float: left;
  margin-right 40px;
`

const Header = ({ location }) => (
  <StyledHeader >
    <Logo>
      <img src={logo} />
    </Logo>
    <StyledMenu
      mode="horizontal"
      selectedKeys={[location.pathname]}
    >
      <MenuItemStyled key="/explore">
        <Link to="/explore">Explorar</Link>
      </MenuItemStyled>
      <MenuItemStyled key="/">
        <Link to="/">Gráficos</Link>
      </MenuItemStyled>
    </StyledMenu>
  </StyledHeader>
);

export default withRouter(Header);

