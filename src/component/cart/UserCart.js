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
import * as VnAddressService from '../../service/VnAddressService';

function UserCart() {

    const [lineItems, setLineItems] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [vnAddress, setVnAddress] = useState({ province: [], district: [], commune: [] });

    const [information, setInformation] = useState({
        city: {},
        town: {},
        ward: {},
        detailAddress: {},
        phoneNumber: {},
        name: {},
    })

    // console.log(vnAddress);
    console.log(information)

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
        const getProvince = async () => {
            const respond = await VnAddressService.getProvince();
            const data = await respond.text();
            setVnAddress({ ...vnAddress, "province": JSON.parse(data).results })
        }
        getProvince();

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



    const selectedCountryTemplate = (option, props) => {
        if (option) return <div>{option.name}</div>
        return <span>{props.placeholder}</span>
    }


    const onChangeProvince = async (e) => {
        const respond = await VnAddressService.getDistrict(e.value.code);
        const data = await respond.text();
        setVnAddress({ ...vnAddress, "district": JSON.parse(data).results })
        setInformation({ ...information, "city": e.value })
    }

    const onChangeDistrict = async (e) => {
        const respond = await VnAddressService.getCommune(e.value.code);
        const data = await respond.text();
        setVnAddress({ ...vnAddress, "commune": JSON.parse(data).results })
        setInformation({ ...information, "town": e.value })
    }


    const onChangeCommune = async (e) => {
        setInformation({ ...information, "ward": e.value })
    }

    return (
        <div className="grid">
            <div className="dataview-demo col-6">
                <div className="card"><DataView value={lineItems} layout="list" itemTemplate={LineItem} paginator rows={10} /></div>
            </div>
            <div className="col-6">
                {vnAddress.province.length !== 0 &&
                    <span className="p-float-label my-10 h-10">
                        <Dropdown value={information.city} options={vnAddress.province}
                            onChange={onChangeProvince}
                            optionLabel="name"
                            valueTemplate={selectedCountryTemplate}
                            itemTemplate={e => e.name}
                            className="w-full h-full" />
                        <label>Province</label>
                    </span>}
                {vnAddress.district.length !== 0 &&
                    <span className="p-float-label my-10 h-10">
                        <Dropdown value={information.town} options={vnAddress.district}
                            onChange={onChangeDistrict}
                            optionLabel="name"
                            valueTemplate={selectedCountryTemplate}
                            itemTemplate={e => e.name}
                            className="w-full h-full" />
                        <label>District</label>
                    </span>}
                {vnAddress.commune.length !== 0 &&
                    <span className="p-float-label my-10 h-10">
                        <Dropdown value={information.ward} options={vnAddress.commune}
                            onChange={onChangeCommune}
                            optionLabel="name"
                            valueTemplate={selectedCountryTemplate}
                            itemTemplate={e => e.name}
                            className="w-full h-full" />
                        <label>Commune</label>
                    </span>}
                <span className="p-float-label my-10"> <InputTextarea rows={3} className="w-full" /><label >detailAddress</label></span>
                <span className="p-float-label my-10 h-10">
                    <Dropdown className="w-full h-full" />
                    <label>Shipment</label>
                </span>
                <span className="p-float-label my-10 h-10">
                    <Dropdown className="w-full h-full" />
                    <label>Payment</label>
                </span>
                <Button label='Order' className="w-full h-20"></Button>
            </div>
        </div>
    );
}
export default UserCart;