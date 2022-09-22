import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddingBook from './component/addingbook';
import ShowingBook from './component/showingbook';
import Login from './component/login';
import Logout from './component/logout';
import Register from './component/register';
import Home from './component/home';
import Header from './component/header';
import Footer from './component/footer';
import UpdatingBook from './component/updatingbook';
import { createContext, useState } from 'react';
import { isExpired, decodeToken } from 'react-jwt';
export const UserInformation = createContext();

function App() {

  const [userInformation, setUserInformation] = useState(() => {

    let accessToken = localStorage.getItem("bookstoretoken");
    accessToken = accessToken ? accessToken : "none";
    const payload = decodeToken(accessToken);
    return {
      role: payload && payload.role ? payload.role : "user",
      isLogin: isExpired(accessToken) ? false : true,
      accessToken: accessToken ? accessToken : ""
    }
  });
  return (

    <UserInformation.Provider value={{ userInformation, setUserInformation }}>
      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/showingbook" element={<ShowingBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />
            <Route path="/addingbook" element={<AddingBook />} />
            <Route path="/updatingbook/:id" element={<UpdatingBook />}></Route>
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div >
    </UserInformation.Provider>

  );
}

export default App;
