import { useContext } from 'react';
import { UserInformation } from '../../App';
function Logout() {
    const { userInformation, setUserInformation } = useContext(UserInformation);
    if (userInformation.isLogin) {
        setUserInformation({ ...userInformation, isLogin: false, accessToken: "", role: "user" })
        localStorage.removeItem("bookstoretoken");
    }
    return (
        <div>Logout</div>
    );
}

export default Logout;