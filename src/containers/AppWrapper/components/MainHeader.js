import React from 'react';

// Components
import Button from 'components/Button';
import Icon from 'components/Icon';
import Appbar from 'components/Appbar';

const MainHeader = (props) => (
  <Appbar>

    <Appbar.Child className={'header-logo'}>

    </Appbar.Child>

    <Appbar.Child grow>
    </Appbar.Child>

    <Appbar.Child grow right>
 
    </Appbar.Child>

  </Appbar>
);

export default MainHeader;
