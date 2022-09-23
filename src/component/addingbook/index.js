import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useState, useContext } from "react";
import { storageFirebase } from '../../config/Firebase';
import { v4 } from 'uuid';
import { UserInformation } from '../../App';

function AddingBook() {
    const { userInformation } = useContext(UserInformation);
    let [book, setBook] = useState({
        title: "title",
        summary: "summary",
        numberOfPage: "200",
        language: "language",
        image: "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        file: "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        description: "description",
        importedPrice: "10",
        importedQuantity: "10",
        exportedQuantity: "1",
        publisher: "publisher",
        author: "author",
        category: "category",
    })
    const [file, setFile] = useState({ image: "", file: "" })

    const [loading, setLoading] = useState(false);

    function fetchData() {
        return new Promise(async (resolve, reject) => {
            var myHeaders = new Headers();
            console.log("book.file " + book.file)
            console.log("book.image " + book.image)
            myHeaders.append("Authorization", userInformation.accessToken);
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            var urlencoded = new URLSearchParams();
            urlencoded.append("title", book.title);
            urlencoded.append("summary", book.summary);
            urlencoded.append("numberOfPage", book.numberOfPage);
            urlencoded.append("language", book.language);
            urlencoded.append("image", book.image);
            urlencoded.append("file", book.file);
            urlencoded.append("description", book.description);
            urlencoded.append("importedPrice", book.importedPrice);
            urlencoded.append("importedQuantity", book.importedQuantity);
            urlencoded.append("exportedQuantity", book.exportedQuantity);
            urlencoded.append("publisher", book.publisher);
            urlencoded.append("author", book.author);
            urlencoded.append("category", book.category);
            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
            };
            const respond = await fetch("http://localhost:8080/api/book", requestOptions);
            if (respond.ok) {
                const data = await respond.text();
                alert("success: " + data);
                console.log(data)
            }
            else alert("Make sure that every thing already has filled ")
            console.log(respond);
            setLoading(() => false);
            // resolve()
        })
    }

    function uploadImage() {
        return new Promise((resolve, reject) => {
            const imageRef = ref(storageFirebase, `image/${file.image.name + v4()}`);
            uploadBytes(imageRef, file.image).then(() => {
                getDownloadURL(imageRef).then(url => {
                    // setBook((prev) => ({ ...prev, image: url }));
                    book = { ...book, image: url }
                    console.log("Image : " + url);
                    resolve();
                })
            })
        })
    }

    function uploadFile() {
        return new Promise((resolve, reject) => {
            const fileRef = ref(storageFirebase, `file/${file.file.name + v4()}`);
            uploadBytes(fileRef, file.file).then(() => {
                getDownloadURL(fileRef).then(url => {
                    // setBook((prev) => ({ ...prev, file: url }));
                    book = { ...book, file: url }
                    console.log("File : ", url, book);
                    resolve();
                })
            })
        })
    }

    const handleAddingBook = async () => {
        if (file.image && file.file) {
            setLoading(true);
            await uploadImage();
            await uploadFile();
            await fetchData();
        }
        else {
            alert("error")
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            AddingBook
            <input placeholder="title" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })}></input>
            <input placeholder="summary" value={book.summary} onChange={e => setBook({ ...book, summary: e.target.value })}></input>
            <input placeholder="numberOfPage" value={book.numberOfPage} onChange={e => setBook({ ...book, numberOfPage: e.target.value })}></input>
            <input placeholder="language" value={book.language} onChange={e => setBook({ ...book, language: e.target.value })}></input>
            <input type="file" placeholder="image" onChange={e => setFile({ ...file, image: e.target.files[0] })}></input>
            <input type="file" placeholder="file" onChange={e => setFile({ ...file, file: e.target.files[0] })}></input>
            <input placeholder="description" value={book.description} onChange={e => setBook({ ...book, description: e.target.value })}></input>
            <input placeholder="importedPrice" value={book.importedPrice} onChange={e => setBook({ ...book, importedPrice: e.target.value })}></input>
            <input placeholder="importedQuantity" value={book.importedQuantity} onChange={e => setBook({ ...book, importedQuantity: e.target.value })}></input>
            <input placeholder="exportedQuantity" value={book.exportedQuantity} onChange={e => setBook({ ...book, exportedQuantity: e.target.value })}></input>
            <input placeholder="publisher" value={book.publisher} onChange={e => setBook({ ...book, publisher: e.target.value })}></input>
            <input placeholder="author" value={book.author} onChange={e => setBook({ ...book, author: e.target.value })}></input>
            <input placeholder="category" value={book.category} onChange={e => setBook({ ...book, category: e.target.value })}></input>
            <button onClick={handleAddingBook}>Add Book</button>
        </div >
    );
}

export default AddingBook;