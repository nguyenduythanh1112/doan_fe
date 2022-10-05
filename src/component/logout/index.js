import { useContext } from 'react';
import { UserInformation } from '../../App';
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();
    const { userInformation, setUserInformation } = useContext(UserInformation);
    if (userInformation.isLogin) {
        setUserInformation({ ...userInformation, isLogin: false, accessToken: "", role: "user" })
        localStorage.removeItem("bookstoretoken");
    }
    navigate("/login");
}

export default Logout;