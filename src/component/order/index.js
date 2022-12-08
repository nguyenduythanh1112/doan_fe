import { useContext } from 'react';
import { UserInformation } from '../../App';
import AdminOrder from './AdminOrder';
import UserOrder from './UserOrder';
function Order() {
    const { userInformation } = useContext(UserInformation);
    return (<div>{userInformation.role === "user" ? <UserOrder /> : <AdminOrder />}</div>);
}
export default Order;