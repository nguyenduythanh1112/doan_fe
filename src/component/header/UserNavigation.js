import { Link } from 'react-router-dom';
import { UserInformation } from '../../App';
import { useContext } from 'react';

function UserNavigation() {
    const { userInformation, setUserInformation } = useContext(UserInformation);
    return (
        <div>
            UserNavigation
            <Link to="/">Home </Link>
            <Link to="/showingbook">Showingbook </Link>
            {userInformation.isLogin === false ? <Link to="/register">Register </Link> : <></>}
            {userInformation.isLogin === false ? <Link to="/login">Login </Link> : <Link to="/logout">Logout</Link>}
        </div>
    );
}
export default UserNavigation;