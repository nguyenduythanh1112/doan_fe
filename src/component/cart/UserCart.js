import { Button } from 'primereact/button';
import { DataView } from 'primereact/dataview';
import { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import * as CartService from '../../service/CartService';
import { toast } from 'react-toastify';

function UserCart() {

    const [lineItems, setLineItems] = useState([]);

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
    }, [])

    const LineItem = (lineItem) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={lineItem.bookItemModel.bookModel.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={lineItem.bookItemModel.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{lineItem.bookItemModel.bookModel.title}</div>
                        <div className="product-description">{lineItem.bookItemModel.bookModel.description}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{lineItem.bookItemModel.bookModel.category}</span>
                        <div className='grid mt-3 justify-center'>
                            <Button label="+" className="p-button-raised p-button-info p-button-text col-1" />
                            <h1 className='mx-2 flex justify-center col-3 text-center product-category'>{lineItem.quantity}</h1>
                            <Button label="-" className="p-button-raised p-button-info p-button-text col-1" />
                            <h1 className='mx-2 flex justify-center col-5 text-center product-category'>Total: {lineItem.quantity * lineItem.bookItemModel.exportedPrice}</h1>
                        </div>
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${lineItem.bookItemModel.exportedPrice}</span>
                        <Link to={`/bookitem/show/${lineItem.bookItemModel.id}`} className="block w-full">
                            <Button label='More' className="p-button-outlined p-button-info w-full"></Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="cart">
            <div className="dataview-demo">
                <div className="card">
                    <DataView value={lineItems} layout="list" itemTemplate={LineItem} paginator rows={9} />
                </div>
            </div>
        </div>
    );
}
export default UserCart;