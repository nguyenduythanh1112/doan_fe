import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { DataView } from 'primereact/dataview';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';

import { useEffect, useState } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import * as CartService from '../../service/CartService';
import * as LineItemService from '../../service/LineItemService';
import * as ShipmentService from '../../service/ShipmentService';
import * as PaymentService from '../../service/PaymentService';
import * as OrderService from '../../service/OrderService';

function UserCart() {

    const navigate = useNavigate();
    const [lineItems, setLineItems] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [shipments, setShipments] = useState([]);
    const [shipment, setShipment] = useState({});
    const [payments, setPayments] = useState([]);
    const [payment, setPayment] = useState({});
    const [paymentDialog, setPaymentDialog] = useState(false);
    const [information, setInformation] = useState({ city: "", town: "", ward: "", detailAddress: "", phoneNumber: "", name: "", })
    let totalPrice = 0
    lineItems.forEach(lineItem => totalPrice += lineItem.quantity * lineItem.bookItemModel.exportedPrice);

    useEffect(() => {
        const fetch = async () => {
            const respond = await CartService.findByUsername();
            const data = await respond.text();
            if (respond.ok) {
                toast.success("Fetch Cart OK: ");
                setLineItems(JSON.parse(data));
            }
            else toast.error(data);
        }
        fetch()

        const fetchShipment = async () => {
            const respond = await ShipmentService.findAll();
            const data = await respond.text();
            if (respond.ok) {
                setShipments(JSON.parse(data))
            }
            else toast.error(data);
        }
        fetchShipment();

        const fetchPayment = async () => {
            const respond = await PaymentService.findAll();
            const data = await respond.text();
            if (respond.ok) {
                setPayments(JSON.parse(data))
            }
            else toast.error(data);
        }
        fetchPayment();


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

    const handleOrder = async () => {
        const respond = await OrderService.create(payment.id, shipment.id, information);
        const data = await respond.text();
        if (respond.ok) {
            const order = JSON.parse(data);
            if (order.urlToPay) window.location.replace(order.urlToPay)
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
                Total: {totalPrice}
                <span className="p-float-label my-10"> <InputText className="w-full" onChange={e => setInformation({ ...information, city: e.target.value })} /><label >city</label></span>
                <span className="p-float-label my-10"> <InputText className="w-full" onChange={e => setInformation({ ...information, town: e.target.value })} /><label >town</label></span>
                <span className="p-float-label my-10"> <InputText className="w-full" onChange={e => setInformation({ ...information, ward: e.target.value })} /><label >ward</label></span>
                <span className="p-float-label my-10"> <InputText className="w-full" onChange={e => setInformation({ ...information, detailAddress: e.target.value })} /><label >detailAddress</label></span>
                <span className="p-float-label my-10"> <InputText className="w-full" onChange={e => setInformation({ ...information, phoneNumber: e.target.value })} /><label >phoneNumber</label></span>
                <span className="p-float-label my-10"> <InputText className="w-full" onChange={e => setInformation({ ...information, name: e.target.value })} /><label >name</label></span>
                {shipments.length !== 0 &&
                    <span className="p-float-label my-10 h-10">
                        <Dropdown value={shipment} options={shipments}
                            onChange={e => setShipment(e.value)}
                            optionLabel="name"
                            valueTemplate={(option, props) => option ? <div>{option.name}</div> : <span>{props.placeholder}</span>}
                            itemTemplate={e => e.name}
                            className="w-full h-full" />
                        <label>Shipment</label>
                    </span>}

                <Button label='Pay' className="w-full h-20" onClick={e => setPaymentDialog(true)}></Button>

                <h5>Responsive</h5>
                <Dialog
                    header="Pay"
                    visible={paymentDialog}
                    onHide={() => setPaymentDialog(false)}
                    breakpoints={{ '960px': '75vw' }}
                    style={{ width: '50vw' }}
                    footer={<div>
                        <Button label="No" icon="pi pi-times" onClick={() => setPaymentDialog(false)} className="p-button-text" />
                        <Button label="Yes" icon="pi pi-check" autoFocus onClick={e => handleOrder()} />
                    </div>}>

                    {payments.length !== 0 &&
                        <span className="p-float-label my-10 h-10">
                            <Dropdown value={payment} options={payments}
                                onChange={e => setPayment(e.value)}
                                optionLabel="name"
                                valueTemplate={(option, props) => option ? <div>{option.name}</div> : <span>{props.placeholder}</span>}
                                itemTemplate={e => e.name}
                                className="w-full h-full" />
                            <label>Payment</label>
                        </span>}
                </Dialog>
            </div>
        </div>
    );
}
export default UserCart;