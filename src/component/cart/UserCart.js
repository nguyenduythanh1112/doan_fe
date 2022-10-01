import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataView } from 'primereact/dataview';
import { InputTextarea } from 'primereact/inputtextarea';

import { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import * as CartService from '../../service/CartService';
import { toast } from 'react-toastify';
import * as LineItemService from '../../service/LineItemService';

function UserCart() {

    const [lineItems, setLineItems] = useState([]);
    const [refresh, setRefresh] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            const respond = await CartService.findByUsername();
            const data = await respond.text();
            if (respond.ok) {
                toast.success("Fetch Cart OK: ");
                setLineItems(JSON.parse(data))
            }
            else toast.error(data);
        }
        fetch();
    }, [refresh])

    const handleAdd = async (bookItemId) => {
        const respond = await LineItemService.add(bookItemId);
        const data = await respond.text();
        if (respond.ok) {
            toast.success("Line item: " + JSON.parse(data).id);
            setRefresh(!refresh);
        }
        else toast.error(data);

    }

    const handleSubtract = async (bookItemId) => {
        const respond = await LineItemService.subtract(bookItemId);
        const data = await respond.text();
        if (respond.ok) {
            toast.success("Line item: " + JSON.parse(data).id);
            setRefresh(!refresh)
        }
        else toast.error(data);

    }

    const LineItem = (lineItem) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={lineItem.bookItemModel.bookModel.image} alt="Load error" />
                    <div className="product-list-detail">
                        <div className="product-name">{lineItem.bookItemModel.bookModel.title}</div>
                        <div className="product-description">{lineItem.bookItemModel.bookModel.description}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{lineItem.bookItemModel.bookModel.category}</span>
                        <div className='grid mt-3 justify-center'>
                            <Button label="+" className="p-button-raised p-button-info p-button-text col-1" onClick={e => handleAdd(lineItem.bookItemModel.id)} />
                            <h1 className='mx-2 flex justify-center col-3 text-center product-category'>{lineItem.quantity}</h1>
                            <Button label="-" className="p-button-raised p-button-info p-button-text col-1" onClick={e => handleSubtract(lineItem.bookItemModel.id)} />
                            <h1 className='mx-2 flex justify-center col-5 text-center product-category'>Total: {lineItem.quantity * lineItem.bookItemModel.exportedPrice}</h1>
                        </div>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${lineItem.bookItemModel.exportedPrice}</span>
                        <Link to={`/bookitem/show/${lineItem.bookItemModel.id}`} className="block w-full">
                            <Button label='More' className="p-button-outlined p-button-info w-full"></Button>
                        </Link>
                        <Button label='Delete' className="p-button-danger w-full"></Button>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="grid">
            <div className="dataview-demo col-6">
                <div className="card"><DataView value={lineItems} layout="list" itemTemplate={LineItem} paginator rows={10} /></div>
            </div>
            <div className="col-6">
                <span className="p-float-label">
                    <Dropdown className="w-full" />
                    <label>City</label>
                </span>
                <span className="p-float-label">
                    <Dropdown className="w-full" />
                    <label>Counter</label>
                </span>
                <span className="p-float-label">
                    <Dropdown className="w-full" />
                    <label>Counter</label>
                </span>
                <span className="p-float-label">
                    <InputTextarea rows={3} className="w-full" />
                    <label >Textarea</label>
                </span>
                <span className="p-float-label">
                    <Dropdown className="w-full" />
                    <label>Counter</label>
                </span>
            </div>
        </div>
    );
}
export default UserCart;