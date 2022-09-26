import { useState, useContext } from "react";
import { useParams } from "react-router";
import { UserInformation } from '../../../App';
import BookDetail from "./BookDetail";
function ShowingDetail({ idBook }) {
    const { userInformation } = useContext(UserInformation);
    let { id } = useParams();
    if (idBook) id = idBook;
    const [book, setBook] = useState();
    const findBook = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", userInformation.accessToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };
        let data = {};
        fetch(`http://localhost:8080/api/book/${id}`, requestOptions).then(async respond => {
            data = await respond.text();
            try {
                data = JSON.parse(data)
                if (!book) {
                    setBook(() => data);
                }
            } catch (error) {
                alert("Loading error")
            }
        });
    }
    if (!book) {
        findBook();
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div>
            {/* AddingBook
            <input placeholder="title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })}></input>
            <input placeholder="summary" value={book.summary} onChange={e => setBook({ ...book, summary: e.target.value })}></input>
            <input placeholder="numberOfPage" value={book.numberOfPage} onChange={e => setBook({ ...book, numberOfPage: e.target.value })}></input>
            <input placeholder="language" value={book.language} onChange={e => setBook({ ...book, language: e.target.value })}></input>
            <img src={book.image}></img>
            <img src={book.file}></img>
            <input placeholder="description" value={book.description} onChange={e => setBook({ ...book, description: e.target.value })}></input>
            <input placeholder="importedPrice" value={book.importedPrice} onChange={e => setBook({ ...book, importedPrice: e.target.value })}></input>
            <input placeholder="importedQuantity" value={book.importedQuantity} onChange={e => setBook({ ...book, importedQuantity: e.target.value })}></input>
            <input placeholder="exportedQuantity" value={book.exportedQuantity} onChange={e => setBook({ ...book, exportedQuantity: e.target.value })}></input>
            <input placeholder="publisher" value={book.publisher} onChange={e => setBook({ ...book, publisher: e.target.value })}></input>
            <input placeholder="author" value={book.author} onChange={e => setBook({ ...book, author: e.target.value })}></input>
            <input placeholder="category" value={book.category} onChange={e => setBook({ ...book, category: e.target.value })}></input>
            <button>Back</button> */}

            <BookDetail book={book}></BookDetail>

        </div >
    );
}

export default ShowingDetail;