import { Button, Input, Option, Select, Switch } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { UserInformation } from '../../../App';

function AddingBookItem() {

    const [books, setBooks] = useState();
    const { userInformation } = useContext(UserInformation);
    const [bookItem, setBookItem] = useState({
        barcode: "",
        exportedPrice: "",
        discount: "",
        status: "",
    });
    const [bookId, setBookId] = useState();


    const handleAddingBookItem = () => {
        if (bookItem.barcode.trim() === "") {

        }
        else if (bookItem.exportedPrice.trim() === "") {

        }
        else if (bookItem.discount.trim() === "") {

        }
        else if (bookItem.discount.trim() === "") {

        }
        else if (!bookId) {

        }
        else {
            alert("YES")
        }
    }


    console.log(books);
    console.log(bookItem);
    console.log(bookId);

    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", userInformation.accessToken);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
        };

        fetch("http://localhost:8080/api/book/postedbook", requestOptions)
            .then(response => {
                return new Promise((resolve, reject) => {
                    if (response.ok) resolve(response.text());
                    reject();
                })
            })
            .then(result => {
                if (!books) setBooks(JSON.parse(result))
            })
            .catch(error => {
                alert("error");
            });
    });

    return (
        <div>
            <div>
                <div className="mt-5 flex"><Input size="lg" label="barcode" value={bookItem.barcode} onChange={(e) => setBookItem({ ...bookItem, barcode: e.target.value })} /></div>
                <div className="mt-5 flex"><Input type="number" size="lg" label="exportedPrice" value={bookItem.exportedPrice} onChange={(e) => setBookItem({ ...bookItem, exportedPrice: e.target.value })} /></div>
                <div className="mt-5 flex"><Input type="number" size="lg" label="discount" value={bookItem.discount} onChange={(e) => setBookItem({ ...bookItem, discount: e.target.value })} /></div>
                {/* <div className="mt-5 flex"><Input size="lg" label="status" value={bookItem.status} onChange={(e) => setBookItem({ ...bookItem, status: e.target.value })} /></div> */}
                <div className="mt-5 flex">
                    <Select label="Status" animate={{ mount: { y: 0 }, unmount: { y: 25 }, }}
                        onChange={(e) => setBookItem({ ...bookItem, status: e })}
                        value={bookItem.status}>
                        <Option value="yes">Yes</Option>
                        <Option value="no">No</Option>
                    </Select>
                </div>
                <div className="mt-5 flex">
                    {books && <Select label="Book Id"
                        animate={{ mount: { y: 0 }, unmount: { y: 25 }, }}
                        value={bookId}
                        onChange={e => setBookId(e)}>
                        {books.map((value) => {
                            return (
                                <Option value={value.id + ""}>
                                    <p>{value.id}</p>
                                </Option>
                            )
                        })}
                    </Select>}
                </div>
                <div className="mt-5 flex justify-around">
                    <Button onClick={handleAddingBookItem}>Add Book Item</Button>
                    <Button>Back</Button>
                </div>
            </div>
        </div >
    );
}

export default AddingBookItem;