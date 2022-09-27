import { Link } from 'react-router-dom';
import { UserInformation } from '../../App';
import { useContext } from 'react';
import { Menubar } from 'primereact/menubar';

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
        {
            label: <Link to="/admincart">Cart</Link>,
            icon: 'pi pi-shopping-cart',
        },

    ];

    if (!userInformation.isLogin) {
        items.push(
            {
                label: <Link to="/login">Login</Link>,
                icon: 'pi pi-user',
            },
            {
                label: <Link to="/register">Register</Link>,
                icon: 'pi pi-user',
            },
        )
    }
    else {
        items.push(
            {
                label: <Link to="/">User</Link>,
                icon: 'pi pi-user',
            },
            {
                label: <Link to="/logout">Logout</Link>,
                icon: 'pi pi-fw pi-power-off',
            }
        )
    }
    return (
        <div className="card">
            <Menubar model={items} />
        </div>
    );
}
export default AdminNavigation;