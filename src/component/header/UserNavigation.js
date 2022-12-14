import { Link , NavLink} from 'react-router-dom';
import { UserInformation } from '../../App';
import { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
function UserNavigation() {
    const { userInformation } = useContext(UserInformation);

    const items = [
        {
            label: <Link to="/">Home</Link>,
            icon: 'pi pi-home',
        },
        {
            label: <Link to="/bookitem">Book</Link>,
            icon: 'pi pi-book',
        },
        {
            label: <Link to="/order">Order</Link>,
            icon: 'pi pi-calculator',
        },
        {
            label: <Link to="/cart">Cart</Link>,
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
        <div className="card bg-blue-600 ">
            {/* <div className="col-12 md:col-4 flex m-auto">
                <div className="p-inputgroup">
                    <InputText placeholder="Keyword" />
                    <Button icon="pi pi-search" className="p-button-warning" />
                </div>
            </div> */}
            <Menubar model={items} className="rounded-none border-none shadow-md" />
        </div>
    );
}
export default UserNavigation;