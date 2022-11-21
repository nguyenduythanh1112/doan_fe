import { Link } from 'react-router-dom';
import { UserInformation } from '../../App';
import { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import "./index.css";

function AdminNavigation() {
    const { userInformation } = useContext(UserInformation);

    const items = [
        {
            label: <Link to="/">Admin Home</Link>,
            icon: 'pi pi-home',
        },
        {
            label: <Link to="/book">Book</Link>,
            icon: 'pi pi-book',
        },
        {
            label: <Link to="/bookitem">Book Item</Link>,
            icon: 'pi pi-table',
        },
        {
            label: <Link to="/adminorder">Order</Link>,
            icon: 'pi pi-calculator',
        },

    ];

    if (!userInformation.isLogin) {
        items.push(
            {
                label: <Link to="/login">Login</Link>,
                icon: 'pi pi-user',
            },
        )
    }
    else {
        items.push(
            {
                label: <Link to="/logout">Logout</Link>,
                icon: 'pi pi-fw pi-power-off',
            }
        )
    }
    return (
        <div className="card bg-blue-600">
            <Menubar model={items} className="bg-blue-600 rounded-none border-none shadow-md" />
        </div>
    );
}
export default AdminNavigation;