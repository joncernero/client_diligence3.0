import React from 'react';

import * as AiIcons from 'react-icons/ai';
import * as MdIcons from 'react-icons/md';

const Sidebar = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text',
  },
  {
    title: 'Properties',
    path: '/properties',
    icon: <MdIcons.MdApartment />,
    cName: 'nav-text',
  },
  {
    title: 'Login',
    path: '/login',
    icon: <AiIcons.AiOutlineLogin />,
    cName: 'nav-text',
  },
];

export default Sidebar;
