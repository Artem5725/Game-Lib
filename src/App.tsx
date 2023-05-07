import React from 'react';
import './Clean.less';
import SidePanel from './components/common/panels/SidePanel';
import UpPanel from './components/common/panels/UpPanel';
import Page from './pages/Page';
import { BrowserRouter } from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <SidePanel />
      <UpPanel />
      <Page />
    </BrowserRouter>
  );
}

export default React.memo(App);
