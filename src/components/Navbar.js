import React, { Component } from 'react';
import {
  NavLink as RouterLink,
} from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Dropdown,
  Nav,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import Logo from '../logo.png';

class LoggedIn extends Component {
  state = {
    isOpen: false,
  };

  render() {
    const { isOpen } = this.state;
    const { handleLogout } = this.props;

    return (
      <Nav className="ml-auto" navbar>
        <Dropdown style={{zIndex:2000}} nav isOpen={isOpen} toggle={_ => this.setState({ isOpen: !isOpen })}>
          <DropdownToggle nav>Account <i className="fa fa-caret-down" /></DropdownToggle>
          <DropdownMenu right>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Nav>
    );
  }
}

class NavBar extends Component {
  state = {
    isOpen: false,
  };

  render() {
    const { isOpen } = this.state;
    const { me, handleLogout } = this.props;

    return (
      <Navbar expand="md" className="header" light>
        <div className="container-fluid">
          <NavbarBrand tag={RouterLink} exact to="/" className="mr-2">
            <img src={Logo} alt="Logistimatics" height="25" style={{ height: 25 }} />
          </NavbarBrand>
          {me && <NavbarToggler onClick={() => this.setState({ isOpen: !isOpen })} />}
          {me &&
            <Collapse isOpen={isOpen} navbar>
              <LoggedIn me={me} handleLogout={handleLogout} />
            </Collapse>}
        </div>
      </Navbar>
    );
  }
}

export default NavBar;
