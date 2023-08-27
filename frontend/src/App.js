import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./main.scss";
import { Provider } from 'react-redux';
import Store from './store';
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./private/PrivateRoute";
import Home from "./components/Home";
import NotFound from "./components/NotFound";


function App() {

  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path='/' exact element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/signup' exact element={<Register />} />
          <Route component={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
