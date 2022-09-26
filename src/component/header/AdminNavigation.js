import { Link } from 'react-router-dom';
import { UserInformation } from '../../App';
import { useContext } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';

function AdminNavigation() {
    const { userInformation, setUserInformation } = useContext(UserInformation);

    const items = [
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off',
            children: <Link to="/showingbook">Book===</Link>
        },
        {
            label: 'Quit',
            icon: 'pi pi-fw pi-power-off',
        },

    ];

    const start = <img alt="logo" src="showcase/images/logo.png" onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} height="40" className="mr-2"></img>;
    const end = <InputText placeholder="Search" type="text" />;
    return (
        <div>
            AdminNavigation
            <Link to="/showingbook">Book===</Link>
            <Link to="/addingbookitem">AddingBookItem===</Link>
            {
                userInformation.isLogin === false
                    ? <Link to="/login">Login</Link>
                    : <Link to="/logout">Logout</Link>
            }
            <div>
                <div className="card">
                    <Menubar model={items} start={start} end={end} />
                </div>
            </div>
        </div>
    );
}
export default AdminNavigation;