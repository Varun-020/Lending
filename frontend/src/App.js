import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./main.scss";
import { Provider } from 'react-redux';
import Store from './store';
import Register from "./App/register/Register";
import PrivateRoute from "./private/PrivateRoute";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import OTPLogin from "./App/login/OTPLogin";
import UserPassLogin from "./App/login/UserPassLogin";
import VerifyEmail from "./App/shared/VerifyEmail";
import VerifyPhone from "./App/shared/VerifyPhone";
import VerifyLoginOTP from "./App/shared/VerifyLoginOtp";



function App() {

  return (
    <Provider store={Store}>
      <Router>
        <Routes>
          <Route path='/' exact element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path='/signinwithotp' exact element={<OTPLogin />} />
          <Route path='/signinwithpassword' exact element={<UserPassLogin />} />
          <Route path='/signup' exact element={<Register />} />
          <Route path='/verifyEmail' exact element={<VerifyEmail />} />
          <Route path='/verifyPhone' exact element={<VerifyPhone />} />
          <Route path='/verifyLoginOtp' exact element={<VerifyLoginOTP />} />
          <Route component={<NotFound />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
