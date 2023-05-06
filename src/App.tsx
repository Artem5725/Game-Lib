import React, { Fragment } from 'react';
import './Clean.less';
import SidePanel from './components/common/panels/SidePanel';
import UpPanel from './components/common/panels/UpPanel';
import Page from './pages/Page';
function App() {
  return (
    <Fragment>
      <SidePanel />
      <UpPanel />
      <Page />
    </Fragment>
  );
}

export default React.memo(App);
