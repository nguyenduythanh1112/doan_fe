import React, { useContext } from 'react';
import UserNavigation from './UserNavigation';
import AdminNavigation from './AdminNavigation';
import { UserInformation } from '../../App';
import { Navbar, Dropdown, Avatar, Tabs, Button } from 'flowbite-react';
// import { Navbar, MobileNav, Typography, IconButton, Button } from '@material-tailwind/react';

function Header() {
    const { userInformation } = useContext(UserInformation);
    console.log(userInformation)
    return (
        <div>
            {userInformation.role === "user" ? <UserNavigation /> : <AdminNavigation />}
            <Navbar
                fluid={true}
                rounded={true}
                className="flex bg-black"
            >
                <Navbar.Brand href="/">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqoRhccovWlAd7E8w3UF0EwsRqh-CTruPv4w&usqp=CAU"
                        className="mr-3 h-6 sm:h-9"
                        alt="Flowbite Logo"
                        title='Book Store'
                    />
                    Book Store
                </Navbar.Brand>
                <div><a>Home</a></div>
                <div><a>Book</a></div>
                <div><a>About</a></div>
                <div><a>Contact</a></div>
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">Bonnie Green</span>
                        <span className="block truncate text-sm font-medium">name@flowbite.com</span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Dashboard
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Settings
                    </Dropdown.Item>
                    <Dropdown.Item>
                        Earnings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Sign out
                    </Dropdown.Item>
                </Dropdown>
            </Navbar >
        </div >
    );
}

export default Header;