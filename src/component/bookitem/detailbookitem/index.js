import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { Panel } from 'primereact/panel';
import { Button } from 'primereact/button';
import { UserInformation } from '../../../App';
import * as BookItemService from '../../../service/BookItemService';
import { toast } from 'react-toastify';
import { Divider } from 'primereact/divider';
import { ProgressBar } from 'primereact/progressbar';
import { Rating } from 'primereact/rating';
import './index.css';

function DetailBookItem() {

    const { id } = useParams();
    const { userInformation } = useContext(UserInformation);



    const [bookItem, setBookItem] = useState({
        "id": 8,
        "barcode": "NDT147258369",
        "exportedPrice": 888.0,
        "discount": 0.25,
        "status": "yes",
        "bookModel": {
            "id": 46,
            "title": "title",
            "summary": "summary",
            "numberOfPage": 200,
            "language": "language",
            "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
            "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpga7663d04-fa69-43dc-882d-51acdd7c05ff?alt=media&token=8119e870-13e3-44b6-bff8-646789fb65c1",
            "description": "description",
            "importedPrice": 10.0,
            "importedQuantity": 10,
            "exportedQuantity": 1,
            "publisher": "publisher",
            "author": "author",
            "category": "category"
        }
    })


    useEffect(() => {
        BookItemService.findById(id).then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) resolve(response.text());
                reject();
            })
        }).then(result => {
            setBookItem(JSON.parse(result));
            // toast.success("Load book item success")
        }).catch(error => {
            toast.error("Load book item error")
        });
    }, [])


    const RenderGridItem = ({ bookItem }) => {
        return (
            <div className="col-12">
                <div className="product-grid-item card w-4/5 justify-between flex flex-column m-auto my-3 shadow-xl h-max">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{bookItem.bookModel.category}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <img className="flex m-auto my-3" src={bookItem.bookModel.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={bookItem.name} />
                        <div className="product-name">{bookItem.bookModel.title}</div>
                        <div className="product-description">{bookItem.bookModel.description}</div>
                        <div className="product-price my-3">Price: {bookItem.exportedPrice}</div>
                    </div>
                    <div className='flex flex-column'>
                        <ProgressBar value={bookItem.bookModel.exportedQuantity/bookItem.bookModel.importedQuantity*100} className="m-2"></ProgressBar>
                        <Rating value={5} stars={5} cancel={false} className="m-3 flex justify-center" />
                    </div>
                    <div className="product-grid-item-bottom ">
                        {userInformation.role === 'user' && <Button icon="pi pi-shopping-cart" label="Add to Cart" className="w-full"></Button>}
                    </div>
                </div >
            </div >
        );
    }

    return (
        <div className="grid m-3 justify-center">
            <div className="col-4">
                {/* <img src={bookItem.bookModel.image} className="w-full"></img> */}
                {/* <Panel className="my-2" header="exportedPrice" toggleable><p>{bookItem.exportedPrice}</p></Panel>
                <Panel className="my-2" header="Title" toggleable><p>{bookItem.bookModel.title}</p></Panel>
            <Panel className="my-2" header="barcode" toggleable><p>{bookItem.barcode}</p></Panel> */}
                {bookItem && <RenderGridItem bookItem={bookItem}></RenderGridItem>}
                {/* {userInformation.role === 'user' && <Button icon="pi pi-shopping-cart" label="Add to Cart" className="w-full"></Button>} */}
            </div>
            <div className="col-5 capitalize">
                {/* <Panel className="my-2" header="discount" toggleable><p>{bookItem.discount}</p></Panel>
                <Panel className="my-2" header="summary" toggleable><p>{bookItem.bookModel.summary}</p></Panel>
                <Panel className="my-2" header="file" toggleable><p>{bookItem.bookModel.file}</p></Panel>
                <Panel className="my-2" header="Other" toggleable>
                    <p>numberOfPage: {bookItem.bookModel.numberOfPage}</p>
                    <p>language: {bookItem.bookModel.language}</p>
                    <p>description: {bookItem.bookModel.description}</p>
                    <p>publisher: {bookItem.bookModel.publisher}</p>
                    <p>author: {bookItem.bookModel.author}</p>
                    <p>category: {bookItem.bookModel.category}</p>
                </Panel> */}
                <Divider align="left" type="dashed"><b>barcode</b></Divider><div className="text-center">{bookItem.barcode}</div>
                <Divider align="left" type="dashed"><b>number Of Page</b></Divider><div className="text-center">{bookItem.bookModel.numberOfPage}</div>
                <Divider align="left" type="dashed"><b>language</b></Divider><div className="text-center">{bookItem.bookModel.language}</div>
                <Divider align="left" type="dashed"><b>publisher</b></Divider><div className="text-center">{bookItem.bookModel.publisher}</div>
                <Divider align="left" type="dashed"><b>author</b></Divider><div className="text-center">{bookItem.bookModel.author}</div>
                <Divider align="left" type="dashed"><b>category</b></Divider><div className="text-center">{bookItem.bookModel.category}</div>
                <Divider align="left" type="dashed"><b>summary</b></Divider><div className="text-center">{bookItem.bookModel.summary}</div>
                <Divider align="left" type="dashed"><b>discount</b></Divider><div className="text-center">{bookItem.discount}</div>
            </div>
            {
                userInformation.role !== 'user' &&
                <div className="col-3">
                    <Panel className="my-2" header="status" toggleable><p>{bookItem.status}</p></Panel>
                    <Panel className="my-2" header="Price" toggleable>
                        <p>exportedPrice: {bookItem.exportedPrice}</p>
                        <p>importedPrice: {bookItem.bookModel.importedPrice}</p>
                    </Panel>
                    <Panel className="my-2" header="Quantity" toggleable>
                        <p>importedQuantity: {bookItem.bookModel.importedQuantity}</p>
                        <p>exportedQuantity: {bookItem.bookModel.exportedQuantity}</p>
                    </Panel>
                </div>
            }
        </div>
    );
}

export default DetailBookItem;