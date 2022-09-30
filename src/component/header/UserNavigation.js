import { Link } from 'react-router-dom';
import { UserInformation } from '../../App';
import { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
function UserNavigation() {
    const { userInformation } = useContext(UserInformation);

    const items = [
        {
            label: <Link to="/">User Home</Link>,
            icon: 'pi pi-home',
        },
        {
            label: <Link to="/bookitem">Book Item</Link>,
            icon: 'pi pi-book',
        },
        {
            label: <Link to="/">Order</Link>,
            icon: 'pi pi-calculator',
        },
        {
            label: <Link to="/">Cart</Link>,
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
                label: <Link to="/user">User</Link>,
                icon: 'pi pi-user',
            },
            {
                label: <Link to="/logout">Logout</Link>,
                icon: 'pi pi-fw pi-power-off',
            }
        )
    }
    return (
        <div className="card shadow-md bg-blue-800 ">
            <Menubar model={items} className="bg-blue-800 rounded-none border-none" />
        </div>
    );
}
export default UserNavigation;