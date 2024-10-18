import {useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { IoSunnyOutline } from "react-icons/io5";
import { MdDarkMode } from "react-icons/md";
import { showToast } from './ToastComponent';
import Icon from '/news.png'
import NavDropdown from 'react-bootstrap/NavDropdown';

function BasicExample() {
  const { toggle, setToggle } = useState('light');

  const setDarkMode = () =>{
    setToggle('dark');
    showToast('Dark Mode Enabled','dark');
  }

  const setLightMode = () =>{
    setToggle('light');
    showToast('Light Mode Enabled','light');
  }

  return (
    <Navbar expand="lg" bg={toggle} data-bs-theme={toggle} className="bg-body-tertiary fixed-top">
      <Container fluid>
      <Navbar.Brand as={Link} to='/'>
            <img
              alt=""
              src={Icon}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
            Panda News
          </Navbar.Brand>

        <div className="d-flex d-lg-none">
          {toggle === 'light' ?
            <MdDarkMode className='size colorBk' onClick={setDarkMode}/> :
            <IoSunnyOutline className='size colorWh' onClick={setLightMode} />
          }
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <NavDropdown title="Category" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/business">Business</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/entertainment">Entertainment</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/health">Health</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/science">Science</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/sports">Sports</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/technology">Technology</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <div className="d-lg-block d-none">
            {toggle === 'light' ?
              <MdDarkMode className='size colorBk ms-auto' onClick={setDarkMode}/> :
              <IoSunnyOutline className='size text-white bold' onClick={setLightMode} />
            }
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;