import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './component/login';
import Logout from './component/logout';
import Register from './component/register';
import Header from './component/header';
import Footer from './component/footer';
import { createContext, useState } from 'react';
import { isExpired, decodeToken } from 'react-jwt';
import Book from './component/book';
import BookItem from './component/bookitem';
import DetailBookItem from './component/bookitem/detailbookitem';
import SaveBook from './component/book/SaveBook';
import ShowBook from './component/book/ShowBook';
import AnnouncementOrder from './component/order/AnnouncementOrder';
import Home from './component/home';
import Cart from './component/cart';
export const UserInformation = createContext();

function App() {
  const [userInformation, setUserInformation] = useState(() => {
    let accessToken = localStorage.getItem("bookstoretoken");
    accessToken = accessToken ? accessToken : "none";
    const payload = decodeToken(accessToken);
    return {
      role: payload && payload.role && !isExpired(accessToken) ? payload.role : "user",
      isLogin: isExpired(accessToken) ? false : true,
      accessToken: accessToken ? accessToken : ""
    }
  });
  return (
    <UserInformation.Provider value={{ userInformation, setUserInformation }}>
      <div className="App">
        <BrowserRouter>
          <Header></Header>
          <div className="">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />

              <Route path="/book" element={<ShowBook />} />
              <Route path="/book/save" element={<SaveBook />} />
              <Route path="/book/show" element={<ShowBook />} />
              <Route path="/book/save/:id" element={<SaveBook />} />

              <Route path="/bookitem" element={<BookItem />} />
              <Route path="/bookitem/show/:id" element={<DetailBookItem />} />

              <Route path="/cart" element={<Cart />} />
              <Route path="/cart/show" element={<Cart />} />

              <Route path="/announcepayonline" element={<AnnouncementOrder />} />

            </Routes>
          </div>

          <Footer></Footer>
        </BrowserRouter>
      </div >
    </UserInformation.Provider>
  );
}
export default App;
