import { Link } from 'react-router-dom';
import { UserInformation } from '../../App';
import { useContext } from 'react';

function AdminNavigation() {
    const { userInformation, setUserInformation } = useContext(UserInformation);
    return (
        <div>
            AdminNavigation
            <Link to="/addingbook">Adding Book</Link>
            <Link to="/showingbook">Home</Link>
            {
                userInformation.isLogin === false
                    ? <Link to="/login">Login</Link>
                    : <Link to="/logout">Logout</Link>
            }
        </div>
    );
}
export default AdminNavigation;