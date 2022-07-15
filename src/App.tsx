import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./reducers";
import { Home } from "./containers/Home";
import { Login, Register } from "./containers/Authentication";
import "bulma/css/bulma.css"

function App() {
  return (
    <Provider store={store} >

      < BrowserRouter >
        <Routes>
          <Route path='*' element={< Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
        </Routes>
      </BrowserRouter >
    </Provider >
  )
}

export default App
