import React, { useState } from 'react';
import Navigation from './Navigation';
import * as FaIcons from 'react-icons/fa';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Header() {
  const [navBarActive, setNavBarActive] = useState(false);

  const toggleNavBar = () => {
    setNavBarActive(!navBarActive);
  };

  return (
    <>
      <NavCon>
        <FaIcons.FaBars onClick={() => toggleNavBar()} />
        <h1>diligence</h1>
      </NavCon>
      {/* {navBarActive ? <Navigation toggleNavBar={toggleNavBar} /> : null} */}
    </>
  );
}

export default Header;

const NavCon = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5vh;
  padding: 10px;
  gap: 15px;

  h1 {
    font-size: 15px;
  }
`;

const MenuBars = styled(FaIcons.FaBars)`
  height: 20px;
  width: 20px;
`;
