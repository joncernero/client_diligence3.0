import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Assets/Sidebar';
import { AiOutlineHome } from 'react-icons/ai';
import { MdLogout } from 'react-icons/md';
import { PiGear } from 'react-icons/pi';
import styled from 'styled-components';

const Navigation = () => {
  return (
    <FooterDiv>
      <Link to='./' className='left'>
        <AiOutlineHome />
        <h4>Home</h4>
      </Link>
      <Link to='' className='center'>
        <PiGear />
        <h4>Settings</h4>
      </Link>
      <Link to='' className='right'>
        <MdLogout />
        <h4>SignOut</h4>
      </Link>
    </FooterDiv>
  );
};

export default Navigation;

export const FooterDiv = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 8vh;
  width: 100%;
  /* padding: 5px; */
  /* gap: 10px; */

  color: #ffffff;

  .right,
  .left,
  .center {
    background-color: #032a4e;
    width: 100%;
    height: 100%;
  }

  a {
    text-decoration: none;
    color: #ffffff;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  svg {
    font-size: 20px;
  }
`;
