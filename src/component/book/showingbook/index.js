import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom";
import { UserInformation } from '../../../App';
import BookTable from "./BookTable";

function ShowingBook() {

    const [bookList, setBookList] = useState([]);
    const { userInformation, setUserInformation } = useContext(UserInformation);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", userInformation.accessToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch("http://localhost:8080/api/book", requestOptions)
            .then(response => {
                return new Promise((resolve, reject) => {
                    if (response.ok) resolve(response.text());
                    reject();
                })
            })
            .then(result => {
                setBookList(JSON.parse(result))
            })
            .catch(error => {
                alert("error");
            });
    }, []);

    console.log(bookList);

    if (bookList.length == 0) {
        return <div>Loading...</div>
    }

    return (
        <div>
            {/* <Link to="/addingbook">Add book</Link> */}
            <BookTable books={bookList}></BookTable>
        </div >
    );
}

export default ShowingBook;




