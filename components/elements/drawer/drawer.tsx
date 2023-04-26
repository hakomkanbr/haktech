import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import InDrawer from './drawer.type';

const DrawerElement: React.FC<InDrawer> = ({
  open,
  title,
  children,
  closeDrawer
}) => {
  return (
    <>
      <Drawer title={title} placement="right" onClose={() => closeDrawer(false)} open={open}>
        {children}
      </Drawer>
    </>
  );
};

export default DrawerElement;