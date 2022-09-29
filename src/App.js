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
import Book from './component/book';
import BookItem from './component/bookitem';
import DetailBookItem from './component/bookitem/detailbookitem';
import SaveBook from './component/book/SaveBook';
import ShowBook from './component/book/ShowBook';
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
          <div className="p-10">
            <Routes>
              <Route path="/" element={<ShowingBook />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />

              <Route path="/book" element={<ShowBook />} />
              <Route path="/book/save" element={<SaveBook />} />
              <Route path="/book/show" element={<ShowBook />} />
              <Route path="/book/save/:id" element={<SaveBook />} />

              <Route path="/bookitem" element={<BookItem />} />
              <Route path="/bookitem/show/:id" element={<DetailBookItem />} />

            </Routes>
          </div>

          <Footer></Footer>
        </BrowserRouter>
      </div >
    </UserInformation.Provider>
  );
}
export default App;
