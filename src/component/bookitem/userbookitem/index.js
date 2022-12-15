import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { toast } from 'react-toastify';
import { ProgressBar } from 'primereact/progressbar';
import * as BookItemService from '../../../service/BookItemService';
import './index.css';
import { Link } from 'react-router-dom';
import { Rating } from 'primereact/rating';
import { Carousel } from 'primereact/carousel';
import * as LineItemService from '../../../service/LineItemService';
import { Tooltip } from 'primereact/tooltip';
import { InputText } from 'primereact/inputtext';

const UserBookItem = () => {
    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [sortKey, setSortKey] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);
    const [sortField, setSortField] = useState(null);
    const sortOptions = [
        { label: 'Price High to Low', value: '!price' },
        { label: 'Price Low to High', value: 'price' },
    ];


    const responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '600px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '480px',
            numVisible: 1,
            numScroll: 1
        }
    ];


    const [productsInitiation, setProductsInitiation] = useState([]);
    const [enteredName, setEnteredName] = useState("");

    useEffect(() => {
        BookItemService.bookItemPublic().then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) resolve(response.text());
                reject();
            })
        }).then(result => {
            setProducts(JSON.parse(result));
            setProductsInitiation(JSON.parse(result))
            // toast.success("Load book item success")
        }).catch(error => {
            toast.error("Error")
        });
    }, []);


    const handleSaveLineItem = async (bookItemId) => {

        const respond = await LineItemService.save(bookItemId);
        const data = await respond.text();
        if (respond.ok) toast.success("Line item: " + JSON.parse(data).id);
        else toast.error(data);

    }

    const onSortChange = (event) => {
        const value = event.value;

        if (value.indexOf('!') === 0) {
            setSortOrder(-1);
            setSortField(value.substring(1, value.length));
            setSortKey(value);
        }
        else {
            setSortOrder(1);
            setSortField(value);
            setSortKey(value);
        }
    }

    const renderListItem = (bookItem) => {
        return (
            <div className="col-12">
                <div className="product-list-item">
                    <img src={bookItem.bookModel.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={bookItem.name} />
                    <div className="product-list-detail">
                        <div className="product-name">{bookItem.bookModel.title}</div>
                        <div className="product-description">{bookItem.bookModel.description}</div>
                        <i className="pi pi-tag product-category-icon"></i><span className="product-category">{bookItem.bookModel.category}</span>
                        <ProgressBar value={bookItem.bookModel.exportedQuantity / bookItem.bookModel.importedQuantity * 100} className="m-2"></ProgressBar>
                        <Rating value={5} stars={5} cancel={false} className="m-3" />
                    </div>
                    <div className="product-list-action">
                        <div className="text-lg">Giá bìa: {bookItem.exportedPrice} VND </div>
                        <div className="product-price my-3">Giá KM: {bookItem.exportedPrice * (1 - bookItem.discount / 100)} VND </div>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" onClick={() => handleSaveLineItem(bookItem.id)}></Button>
                        <Link to={`/bookitem/show/${bookItem.id}`} className="block w-full">
                            <Button label='More' className="p-button-outlined p-button-info w-full"></Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const renderGridItem = (bookItem) => {
        return (
            <div className="col-12 md:col-4">
                <div className="product-grid-item card w-4/5 justify-between flex flex-column m-auto my-3 shadow-xl h-max hover:opacity-08 transition duration-900 ease-in-out">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{bookItem.bookModel.category}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <img className="flex m-auto my-3" src={bookItem.bookModel.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={bookItem.name} />
                        <div className="product-name">{bookItem.bookModel.title}</div>
                        {/* <div className="product-description">{bookItem.bookModel.description}</div> */}
                        <div className="text-lg my-3">Giá bìa: {bookItem.exportedPrice} VND </div>
                        <div className="product-price my-3">Giá KM: {bookItem.exportedPrice * (1 - bookItem.discount / 100)} VND </div>
                    </div>
                    <div className='flex flex-column'>
                        <ProgressBar value={bookItem.bookModel.exportedQuantity / bookItem.bookModel.importedQuantity * 100} className="m-2"></ProgressBar>
                        <Rating value={5} stars={5} cancel={false} className="m-3 flex justify-center" />
                    </div>
                    <div className="product-grid-item-bottom ">
                        <Button icon="pi pi-cart-plus" tooltip="Add to Cart" tooltipOptions={{ className: 'cyan-tooltip', position: 'bottom' }} onClick={() => handleSaveLineItem(bookItem.id)}></Button>
                        <Link to={`/bookitem/show/${bookItem.id}`} className="block"><Button tooltip="More" tooltipOptions={{ className: 'cyan-tooltip', position: 'bottom' }} className="p-button-outlined" icon="pi pi-plus-circle" /></Link>
                    </div>
                </div >
            </div >
        );
    }

    const renderCarouselItem = (bookItem) => {
        return (
            <div className="col-12 md:col-4 w-full">
                <div className="product-grid-item card w-4/5 justify-between flex flex-column m-auto my-2 border-none shadow-2xl">
                    <div className="product-grid-item-top">
                        <div>
                            <i className="pi pi-tag product-category-icon"></i>
                            <span className="product-category">{bookItem.bookModel.category}</span>
                        </div>
                    </div>
                    <div className="product-grid-item-content">
                        <img className="flex m-auto my-3" src={bookItem.bookModel.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={bookItem.name} />
                        <div className="product-name">{bookItem.bookModel.title}</div>
                        {/* <div className="product-description">{bookItem.bookModel.description}</div> */}
                        <div className="text-lg my-3">Giá bìa: {bookItem.exportedPrice} VND </div>
                        <div className="product-price my-3">Giá KM: {bookItem.exportedPrice * (1 - bookItem.discount / 100)} VND </div>
                    </div>
                    <div className='flex flex-column'>
                        <ProgressBar value={bookItem.bookModel.exportedQuantity / bookItem.bookModel.importedQuantity * 100} className="m-2"></ProgressBar>
                        <Rating value={5} stars={5} cancel={false} className="m-3 flex justify-center" />
                    </div>
                    <div className="product-grid-item-bottom ">
                        <Button icon="pi pi-cart-plus" tooltip="Add to Cart" tooltipOptions={{ className: 'cyan-tooltip', position: 'bottom' }} onClick={() => handleSaveLineItem(bookItem.id)}></Button>
                        <Link to={`/bookitem/show/${bookItem.id}`} className="block"><Button tooltip="More" tooltipOptions={{ className: 'cyan-tooltip', position: 'bottom' }} className="p-button-outlined" icon="pi pi-plus-circle" /></Link>
                    </div>
                </div >
            </div >
        );
    }


    const itemTemplate = (product, layout) => {
        if (!product) {
            return;
        }

        if (layout === 'list')
            return renderListItem(product);
        else if (layout === 'grid')
            return renderGridItem(product);
    }



    const handleOnChangeName = (e) => {
        setProducts(pre => productsInitiation.filter(value => value.bookModel.title.includes(e.target.value)));
        setEnteredName(e.target.value);
    }

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{ textAlign: 'left' }}>
                    {/* <Dropdown className='w-full' options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} /> */}
                    <span className="p-float-label mt-4 ">
                        <InputText className='w-full' value={enteredName} onChange={e => handleOnChangeName(e)} />
                        <label>Enter book name</label>
                    </span>
                </div>
                <div className="col-6" style={{ textAlign: 'right' }}>
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </div>
        );
    }

    const header = renderHeader();

    return (
        <div className="dataview-demo">
            <Carousel value={productsInitiation} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
                autoplayInterval={3000} itemTemplate={renderCarouselItem} header={<h5 class="text-center"></h5>} />
            <div className="card">
                <DataView value={products} layout={layout} header={header}
                    itemTemplate={itemTemplate} paginator rows={9}
                    sortOrder={sortOrder} sortField={sortField} />
            </div>
        </div>
    );
}
export default UserBookItem;