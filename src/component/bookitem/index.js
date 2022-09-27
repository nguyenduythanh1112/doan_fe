import { useContext } from 'react';
import { UserInformation } from '../../App';
import AdminBookItem from './adminbookitem';
import UserBookItem from './userbookitem';
function BookItem() {
    const { userInformation } = useContext(UserInformation);
    return (
        <div className="m-3">
            {userInformation.role === "user" || userInformation.isLogin === false ? <UserBookItem /> : <AdminBookItem />}
        </div>
    )
}

export default BookItem;