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
      <HeadDiv>
        <h1>diligence</h1>
      </HeadDiv>
      {/* {navBarActive ? <Navigation toggleNavBar={toggleNavBar} /> : null} */}
    </>
  );
}

export default Header;

const HeadDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: #ffffff;

  h1 {
    font-size: 15px;
  }
`;
