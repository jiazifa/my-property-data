import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers";
import { Home } from "./containers/Home";
// import { Login, Register } from "./containers/Authentication";
import "bulma/css/bulma.css"
import { useEffect } from "react";
import { setup_app } from "./utils/backend";

function App() {
  useEffect(() => {
    setup_app().then((e) => {
      console.log(e);
    })
  }, []);
  return (
    <Provider store={store} >

      < BrowserRouter >
        <Routes>
          <Route path='*' element={< Home />} />
          {/* <Route path='login' element={<Login />} /> */}
          {/* <Route path='register' element={<Register />} /> */}
        </Routes>
      </BrowserRouter >
    </Provider >
  )
}

export default App
