import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import App from "./App";

import { RawgApiProvider } from "./ApiProviders/RawgApiProvider/RawgApi";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// test api
const key = "f14802914f8f49a2b4099efa97a74fe2";
const test = new RawgApiProvider(key);
// test.loadCardsOnRequest('the witcher 3', 1, 1).then((res) => console.log(res));
test.loadGameInfo(-1).then((res: any) => { // 3328 - test
    console.log(res);
});
