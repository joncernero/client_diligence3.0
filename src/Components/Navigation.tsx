import React from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../Assets/Sidebar';
import * as AiIcons from 'react-icons/ai';
import styled from 'styled-components';
type Props = {
  toggleNavBar: Function;
};

const Navigation = (props: Props) => {
  return (
    <Container>
      <Link to=''>
        <p>home</p>
      </Link>
      {/* <Link
            to='#'
            onClick={() => {
              props.toggleNavBar();
            }}>
            <AiIcons.AiOutlineLogout />
          </Link> */}
    </Container>
  );
};

export default Navigation;

export const Container = styled.div`
  height: 100%;
  width: 100%;
`;
