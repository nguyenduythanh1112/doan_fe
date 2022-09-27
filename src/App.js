import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddingBook from './component/book/addingbook';
import ShowingBook from './component/book/showingbook';
import Login from './component/login';
import Logout from './component/logout';
import Register from './component/register';
import Header from './component/header';
import Footer from './component/footer';
import UpdatingBook from './component/book/updatingbook';
import { createContext, useState } from 'react';
import { isExpired, decodeToken } from 'react-jwt';
import ShowingDetail from './component/book/showingdetail';
import DeletingBook from './component/book/deletingbook';
import AddingBookItem from './component/bookitem/adddingbookitem';
import Book from './component/book';
import UserBookItem from './component/bookitem/userbookitem';
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
          <Routes>
            <Route path="/" element={<ShowingBook />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/register" element={<Register />} />

            <Route path="/showingbook" element={<ShowingBook />} />
            <Route path="/addingbook" element={<AddingBook />} />
            <Route path="/updatingbook/:id" element={<UpdatingBook />}></Route>
            <Route path="/showingdetail/:id" element={<ShowingDetail />}></Route>
            <Route path="/deletingbook/:id" element={<DeletingBook />}></Route>
            <Route path="/book" element={<Book />} />

            <Route path="/addingbookitem" element={<AddingBookItem />} />
            <Route path="/userbookitem" element={<UserBookItem />} />

          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </div >
    </UserInformation.Provider>
  );
}

export default App;
