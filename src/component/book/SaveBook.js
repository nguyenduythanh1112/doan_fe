import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import * as BookService from '../../service/BookService';
import * as FirebaseService from '../../service/FirebaseService';

import { toast } from 'react-toastify';

function SaveBook() {

    let { id } = useParams();
    let [refresh, setRefresh] = useState(true)
    let [file, setFile] = useState({ image: "", file: "" })
    let [selectedOption, setSelectedOption] = useState({ image: "text", file: "text" })

    let [book, setBook] = useState({
        title: "",
        summary: "",
        numberOfPage: "",
        language: "",
        image: "",
        file: "",
        description: "",
        importedPrice: "",
        importedQuantity: "",
        exportedQuantity: "",
        publisher: "",
        author: "",
        category: "",
        height: "",
        weight: "",
        longs: "",
    });

    useEffect(() => {
        if (id) {
            BookService.findById(id).then(response => {
                return new Promise((resolve, reject) => {
                    if (response.ok) resolve(response.text());
                    reject();
                })
            }).then(result => {
                setBook(JSON.parse(result));
                toast.success("Load book success")
            }).catch(error => {
                toast.error("Load book error")
            });
        }
    }, [refresh])


    const handleSaveBook = async () => {
        if (selectedOption.image === "file" && file.image) {
            const urlImage = await FirebaseService.uploadImage(file.image);
            book = { ...book, image: urlImage };
        }
        if (selectedOption.file === "file" && file.file) {
            const urlFile = await FirebaseService.uploadFile(file.file);
            book = { ...book, file: urlFile };
        }
        const respond = await BookService.save(book);

        if (respond.ok) {
            const data = await respond.text();
            toast.success("Save book success")
        }
        else toast.error("Save book error")
    }


    return (
        <div className="grid justify-center capitalize">
            {book.id && <h5 className="col-12 grid justify-center text-lg uppercase">You are editing book. ID is {book.id}</h5>}
            <div className="col-6">
                <span className="p-float-label my-4"><InputText className="w-full" value={book.title} onChange={e => setBook({ ...book, title: e.target.value })} /><label>title</label></span>
                <span className="p-float-label my-4"><InputTextarea className="w-full" value={book.summary} onChange={e => setBook({ ...book, summary: e.target.value })} /><label>summary</label></span>
                <span className="p-float-label my-4"><InputText className="w-full" value={book.language} onChange={e => setBook({ ...book, language: e.target.value })} /><label>language</label></span>
                {selectedOption.image === "text"
                    ?
                    <div className='grid justify-between my-4 w-full'>
                        <span className="p-float-label col-6"><InputText className="w-full" value={book.image} onChange={e => setBook({ ...book, image: e.target.value })} /><label>image</label></span>
                        <Button label='or file' className='col-3 p-button-raised p-button-text' onClick={() => setSelectedOption({ ...selectedOption, image: "file" })}></Button>
                    </div>
                    :
                    <div className='grid justify-between my-4 w-full'>
                        <input className="col-8 " type="file" placeholder="image" onChange={e => setFile({ ...file, image: e.target.files[0] })}></input>
                        <Button label='or text' className='col-3 p-button-raised p-button-text' onClick={() => setSelectedOption({ ...selectedOption, image: "text" })}></Button>
                    </div>
                }
                {selectedOption.file === "text"
                    ?
                    <div className='grid justify-between my-4 w-full'>
                        <span className="p-float-label col-6"><InputText className="w-full" value={book.file} onChange={e => setBook({ ...book, file: e.target.value })} /><label>file</label></span>
                        <Button label='or file' className='col-3 p-button-raised p-button-text' onClick={() => setSelectedOption({ ...selectedOption, file: "file" })}></Button>
                    </div >
                    :
                    <div className='grid justify-between my-4 w-full'>
                        <input className="col-8" type="file" placeholder="file" onChange={e => setFile({ ...file, file: e.target.files[0] })}></input>
                        <Button label='or text' className='col-3 p-button-raised p-button-text' onClick={() => setSelectedOption({ ...selectedOption, file: "text" })}></Button>
                    </div>
                }
                <span className="p-float-label my-4"><InputTextarea className="w-full" value={book.description} onChange={e => setBook({ ...book, description: e.target.value })} /><label>description</label></span>
            </div>
            <div className="col-4">
                {book.image && <img className="" src={book.image} className="product-image w-full my-4" />}
                <div className="grid justify-between">
                    <span className="p-float-label my-4 col-3"><InputText className="w-full" value={book.height} onChange={e => setBook({ ...book, height: e.target.value })} /><label>height</label></span>
                    <span className="p-float-label my-4 col-3"><InputText className="w-full" value={book.weight} onChange={e => setBook({ ...book, weight: e.target.value })} /><label>weight</label></span>
                    <span className="p-float-label my-4 col-3"><InputText className="w-full" value={book.longs} onChange={e => setBook({ ...book, longs: e.target.value })} /><label>longs</label></span>
                    <span className="p-float-label my-4 col-3"><InputText className="w-full" value={book.numberOfPage} onChange={e => setBook({ ...book, numberOfPage: e.target.value })} /><label>number Page</label></span>
                </div>
                <div className="grid justify-between">
                    <span className="p-float-label my-4 col-4"><InputText className="w-full" value={book.importedPrice} onChange={e => setBook({ ...book, importedPrice: e.target.value })} /><label>imported Price</label></span>
                    <span className="p-float-label my-4 col-4"><InputText className="w-full" value={book.importedQuantity} onChange={e => setBook({ ...book, importedQuantity: e.target.value })} /><label>imported Quantity</label></span>
                    <span className="p-float-label my-4 col-4"><InputText className="w-full" value={book.exportedQuantity} onChange={e => setBook({ ...book, exportedQuantity: e.target.value })} /><label>exported Quantity</label></span>
                </div>
                <span className="p-float-label my-4"><InputText className="w-full" value={book.publisher} onChange={e => setBook({ ...book, publisher: e.target.value })} /><label>publisher</label></span>
                <span className="p-float-label my-4"><InputText className="w-full" value={book.author} onChange={e => setBook({ ...book, author: e.target.value })} /><label>author</label></span>
                <span className="p-float-label my-4"><InputTextarea className="w-full" value={book.category} onChange={e => setBook({ ...book, category: e.target.value })} /><label>category</label></span>
            </div>

            <div className="grid justify-between col-6">
                <Button label="Add" onClick={handleSaveBook} className="col-6 h-12 my-4 p-button-outlined p-button-success"></Button>
                <Button label="Refresh" onClick={e => setRefresh(!refresh)} className="col-3 h-12 my-4 p-button-outlined p-button-warning"></Button>
                <Button label="Cancel" className="col-2 h-12 my-4 p-button-outlined p-button-danger"></Button>
            </div>

        </div>
    );
}

export default SaveBook;









        // private String title;
        // private String summary;
        // private int numberOfPage;
        // private String language;
        // private String image;
        // private String file;
        // private String description;
        // private long importedPrice;
        // private int importedQuantity;
        // private int exportedQuantity;
        // private String publisher;
        // private String author;
        // private String category;
        // private long height;
        // private long weight;
        // private long longs;



