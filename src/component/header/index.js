import React, { useContext } from 'react';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';
import { UserInformation } from '../../App';

function Header() {
    const { userInformation } = useContext(UserInformation);
    console.log(userInformation)
    return (
        <div>
            {userInformation.role === "user" ? <UserNavigation /> : <AdminNavigation />}
        </div>
    );
}

export default Header;