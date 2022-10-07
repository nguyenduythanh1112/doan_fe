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


    useEffect(() => {

        // setProducts([
        //     {
        //         "id": 7,
        //         "barcode": "NDT147258369",
        //         "exportedPrice": 888.0,
        //         "discount": 0.25,
        //         "status": "yes",
        //         "bookModel": {
        //             "id": 45,
        //             "title": "title",
        //             "summary": "summary",
        //             "numberOfPage": 200,
        //             "language": "language",
        //             "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        //             "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpgb18794ce-d325-4129-8498-fe95a6ced7ba?alt=media&token=99697f6b-4341-4dc3-be29-8ea246e50760",
        //             "description": "description",
        //             "importedPrice": 10.0,
        //             "importedQuantity": 10,
        //             "exportedQuantity": 1,
        //             "publisher": "publisher",
        //             "author": "author",
        //             "category": "category"
        //         }
        //     },
        //     {
        //         "id": 7,
        //         "barcode": "NDT147258369",
        //         "exportedPrice": 888.0,
        //         "discount": 0.25,
        //         "status": "yes",
        //         "bookModel": {
        //             "id": 45,
        //             "title": "title",
        //             "summary": "summary",
        //             "numberOfPage": 200,
        //             "language": "language",
        //             "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        //             "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpgb18794ce-d325-4129-8498-fe95a6ced7ba?alt=media&token=99697f6b-4341-4dc3-be29-8ea246e50760",
        //             "description": "description",
        //             "importedPrice": 10.0,
        //             "importedQuantity": 10,
        //             "exportedQuantity": 1,
        //             "publisher": "publisher",
        //             "author": "author",
        //             "category": "category"
        //         }
        //     },
        //     {
        //         "id": 7,
        //         "barcode": "NDT147258369",
        //         "exportedPrice": 888.0,
        //         "discount": 0.25,
        //         "status": "yes",
        //         "bookModel": {
        //             "id": 45,
        //             "title": "title",
        //             "summary": "summary",
        //             "numberOfPage": 200,
        //             "language": "language",
        //             "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        //             "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpgb18794ce-d325-4129-8498-fe95a6ced7ba?alt=media&token=99697f6b-4341-4dc3-be29-8ea246e50760",
        //             "description": "description",
        //             "importedPrice": 10.0,
        //             "importedQuantity": 10,
        //             "exportedQuantity": 1,
        //             "publisher": "publisher",
        //             "author": "author",
        //             "category": "category"
        //         }
        //     },
        //     {
        //         "id": 8,
        //         "barcode": "NDT147258369",
        //         "exportedPrice": 888.0,
        //         "discount": 0.25,
        //         "status": "yes",
        //         "bookModel": {
        //             "id": 46,
        //             "title": "title",
        //             "summary": "summary",
        //             "numberOfPage": 200,
        //             "language": "language",
        //             "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        //             "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpga7663d04-fa69-43dc-882d-51acdd7c05ff?alt=media&token=8119e870-13e3-44b6-bff8-646789fb65c1",
        //             "description": "description",
        //             "importedPrice": 10.0,
        //             "importedQuantity": 10,
        //             "exportedQuantity": 1,
        //             "publisher": "publisher",
        //             "author": "author",
        //             "category": "category"
        //         }
        //     }
        // ]);

        BookItemService.findAll().then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) resolve(response.text());
                reject();
            })
        }).then(result => {
            setProducts(JSON.parse(result));
            toast.success("Load book item success")
        }).catch(error => {
            toast.error("Load book item error")
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
                        <ProgressBar value={50} className="m-2"></ProgressBar>
                        <Rating value={5} stars={5} cancel={false} className="m-3" />
                    </div>
                    <div className="product-list-action">
                        <span className="product-price">${bookItem.exportedPrice}</span>
                        <Button icon="pi pi-shopping-cart" label="Add to Cart" onClick={() => handleSaveLineItem(bookItem.id)}></Button>
                        <Link to={`/bookitem/show/${bookItem.id}`} className="block w-full">
                            <Button label='More' className="p-button-outlined p-button-info w-full"></Button>
                        </Link>
                        <span className="product-badge">Hello</span>
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
                        <div className="product-description">{bookItem.bookModel.description}</div>
                        <div className="product-price my-3">Price: {bookItem.exportedPrice}</div>
                    </div>
                    <div className='flex flex-column'>
                        <ProgressBar value={50} className="m-2"></ProgressBar>
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
            <div className="col-12 md:col-4 w-full  ">
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
                        <div className="product-description">{bookItem.bookModel.description}</div>
                        <div className="product-price my-3">Price: {bookItem.exportedPrice}</div>
                    </div>
                    <div className='flex flex-column'>
                        <ProgressBar value={50} className="m-2"></ProgressBar>
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

    const renderHeader = () => {
        return (
            <div className="grid grid-nogutter">
                <div className="col-6" style={{ textAlign: 'left' }}>
                    <Dropdown options={sortOptions} value={sortKey} optionLabel="label" placeholder="Sort By Price" onChange={onSortChange} />
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
            <Carousel value={products} numVisible={3} numScroll={1} responsiveOptions={responsiveOptions} className="custom-carousel" circular
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