import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { UserInformation } from '../../App';


function UpdatingBook() {

    const { userInformation, setUserInformation } = useContext(UserInformation);
    const { id } = useParams()
    const [book, setBook] = useState();
    const [loading, setLoading] = useState(true);
    const [selectedOption, setSelectedOption] = useState({
        image: "text",
        file: "text"
    })

    useEffect(() => {
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
                    setLoading(false);
                }
            } catch (error) {
                alert("Loading error")
            }
        });
    })


    if (loading) return (
        <div>Loading...</div>
    )
    return (
        <div>
            AddingBook
            <input placeholder="title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })}></input>
            <input placeholder="summary" value={book.summary} onChange={e => setBook({ ...book, summary: e.target.value })}></input>
            <input placeholder="numberOfPage" value={book.numberOfPage} onChange={e => setBook({ ...book, numberOfPage: e.target.value })}></input>
            <input placeholder="language" value={book.language} onChange={e => setBook({ ...book, language: e.target.value })}></input>
            <input placeholder="image" value={book.image} onChange={(e) => setBook({ ...book, numberOfPage: e.target.value })}></input>

            {selectedOption.image === "text"
                ?
                <button onClick={() => setSelectedOption({ ...selectedOption, image: "file" })}>Choose file</button>
                :
                <button onClick={() => setSelectedOption({ ...selectedOption, image: "text" })}>Enter text</button>
            }

            {selectedOption.file === "text"
                ?
                <button onClick={() => setSelectedOption({ ...selectedOption, file: "file" })}>Choose file</button>
                :
                <button onClick={() => setSelectedOption({ ...selectedOption, file: "text" })}>Enter text</button>
            }

            <input placeholder="file" value={book.file} onChange={(e) => setBook({ ...book, numberOfPage: e.target.value })}></input>

            {/* <input type="file" placeholder="image" onChange={e => setFile({ ...file, image: e.target.files[0] })}></input>
            <input type="file" placeholder="file" onChange={e => setFile({ ...file, file: e.target.files[0] })}></input> */}
            <input placeholder="description" value={book.description} onChange={e => setBook({ ...book, description: e.target.value })}></input>
            <input placeholder="importedPrice" value={book.importedPrice} onChange={e => setBook({ ...book, importedPrice: e.target.value })}></input>
            <input placeholder="importedQuantity" value={book.importedQuantity} onChange={e => setBook({ ...book, importedQuantity: e.target.value })}></input>
            <input placeholder="exportedQuantity" value={book.exportedQuantity} onChange={e => setBook({ ...book, exportedQuantity: e.target.value })}></input>
            <input placeholder="publisher" value={book.publisher} onChange={e => setBook({ ...book, publisher: e.target.value })}></input>
            <input placeholder="author" value={book.author} onChange={e => setBook({ ...book, author: e.target.value })}></input>
            <input placeholder="category" value={book.category} onChange={e => setBook({ ...book, category: e.target.value })}></input>
            <button>Save</button>
        </div >
    );
}

export default UpdatingBook;