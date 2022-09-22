import { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom";
import { UserInformation } from '../../App';

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
            ShowingBook
            <Link to="/addingbook">Add book</Link>
            <table>
                <tr>
                    <th>Image</th>
                    <th>Tile</th>
                    <th>Summary</th>
                    <th>Description</th>
                    <th>Author</th>
                    <th>Action</th>
                </tr>
                {bookList.map((value, index) => {
                    return (
                        <tr>
                            <td>
                                <img src={value.image}></img>
                            </td>
                            <td>{value.title}</td>
                            <td>{value.summary}</td>
                            <td>{value.description}</td>
                            <td>{value.author}</td>
                            <td>
                                <Link to="/">Edit </Link>
                                <Link to="/">Delete</Link>
                            </td>
                        </tr>
                    )
                })}
            </table>
        </div>
    );
}

export default ShowingBook;