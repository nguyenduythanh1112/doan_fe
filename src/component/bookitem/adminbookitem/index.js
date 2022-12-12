import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { TreeSelect } from 'primereact/treeselect';
import { SelectButton } from 'primereact/selectbutton';
import { toast } from 'react-toastify';
import * as BookItemService from '../../../service/BookItemService';
import * as BookService from '../../../service/BookService';
import './index.css';
import { Link } from 'react-router-dom';

const AdminBookItem = () => {

    let emptyProduct = {
        "id": null,
        "barcode": "",
        "exportedPrice": "",
        "discount": "",
        "status": "yes",
        "bookModel": {
            "id": ""
        }
    };

    let [refresh, setRefresh] = useState(false);
    let [products, setProducts] = useState(null);
    let [postedBooks, setPostedBooks] = useState([]);
    let [productDialog, setProductDialog] = useState(false);
    let [deleteProductDialog, setDeleteProductDialog] = useState(false);
    let [product, setProduct] = useState(emptyProduct);
    let [globalFilter, setGlobalFilter] = useState(null);
    let dt = useRef(null);

    function getDataSelect() {
        return postedBooks.map((value) => {
            return ({
                key: value.id,
                label: `${value.id} ${value.title}`,
                icon: "pi pi-fw pi-cog"
            })
        })
    }

    useEffect(() => {

        BookItemService.findAll().then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) resolve(response.text());
                reject();
            })
        }).then(result => {
            setProducts(JSON.parse(result));
            // toast.success("Load book item success")
        }).catch(error => {
            toast.error("Load book item error")
        });

        BookService.findNotPostedBook().then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) resolve(response.text());
                reject();
            })
        }).then(result => {
            setPostedBooks(JSON.parse(result));
            // toast.success("Load not posted book item success")
        }).catch(error => {
            toast.error("Load not posted book item error")
        });


    }, [refresh]);

    const openNew = () => {
        setProduct(emptyProduct);
        setProductDialog(true);
    }

    const hideDialog = () => {
        setProductDialog(false);
    }

    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    }


    const saveProduct = async () => {
        // console.log(product)
        BookItemService.save(product, product.bookModel.id).then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) resolve(response.text());
                reject();
            })
        }).then(result => {
            toast.success("Load book item success");
            setRefresh(!refresh)
        }).catch(error => {
            toast.error("Load book item error");

        });
    }

    const editProduct = (product) => {
        console.log(product)
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = async () => {
        const respond = await BookItemService.deleteById(product.id);
        if(respond.ok){
            toast.success("Delete success: " + product.id);
            setRefresh(!refresh);
        }
        else toast.error("Delete error "+product.id);
        setDeleteProductDialog(false);
    }

    const exportCSV = () => { dt.current.exportCSV(); }


    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" onClick={openNew} />
            </React.Fragment>
        )
    }

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
                <Button label="Refresh" icon="pi pi-upload" className="mx-3" onClick={e => setRefresh(!refresh)} />
            </React.Fragment>
        )
    }

    const imageBodyTemplate = (rowData) => {
        return <img src={rowData.bookModel.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
    }

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning mr-2" onClick={() => confirmDeleteProduct(rowData)} />
                <Link to={`show/${rowData.id}`} >
                    <Button icon="pi pi-eye" className="p-button-rounded p-button-warning" />
                </Link>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage Products</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" className="p-button-text" onClick={saveProduct} />
        </React.Fragment>
    );
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo capitalize">
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    className='capitalize'
                    ref={dt}
                    value={products}
                    dataKey="id" paginator rows={5} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">

                    <Column header="action" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    <Column field="id" header="id BookItem" sortable ></Column>
                    <Column field="bookModel.id" header="Id book" sortable ></Column>
                    <Column field="barcode" header="barcode" sortable ></Column>
                    <Column field="exportedPrice" header="exportedPrice" sortable ></Column>
                    <Column field="discount" header="discount" sortable ></Column>
                    <Column field="status" header="status" sortable ></Column>
                    <Column field="bookModel.image" header="image" sortable body={imageBodyTemplate}></Column>
                    <Column field="bookModel.summary" header="summary" sortable style={{ minWidth: '25rem' }}></Column>
                    <Column field="bookModel.title" header="title" sortable ></Column>
                    <Column field="bookModel.numberOfPage" header="numberOfPage" sortable ></Column>
                    <Column field="bookModel.language" header="language" sortable ></Column>
                    <Column field="bookModel.file" header="file" sortable ></Column>
                    <Column field="bookModel.description" header="description" sortable ></Column>
                    <Column field="bookModel.importedPrice" header="importedPrice" sortable ></Column>
                    <Column field="bookModel.importedQuantity" header="importedQuantity" sortable ></Column>
                    <Column field="bookModel.exportedQuantity" header="exportedQuantity" sortable ></Column>
                    <Column field="bookModel.publisher" header="publisher" sortable ></Column>
                    <Column field="bookModel.author" header="author" sortable ></Column>
                    <Column field="bookModel.category" header="category" sortable ></Column>
                    <Column field="bookModel.height" header="height" sortable ></Column>
                    <Column field="bookModel.weight" header="weight" sortable ></Column>
                    <Column field="bookModel.longs" header="longs" sortable ></Column>

                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '650px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>

                {product.id && <label>Book Item ID: {product.id}</label>}
                <div className="field"><label>barcode</label><InputText value={product.barcode} onChange={(e) => setProduct({ ...product, barcode: e.target.value })} required /></div>
                <div className="field"><label>exportedPrice</label><InputText value={product.exportedPrice} onChange={(e) => setProduct({ ...product, exportedPrice: e.target.value })} required /></div>
                <div className="field"><label>discount</label><InputText value={product.discount} onChange={(e) => setProduct({ ...product, discount: e.target.value })} required /></div>
                <div className="field"><label>status</label><SelectButton options={["yes", "no"]} value={product.status} onChange={(e) => setProduct({ ...product, status: e.value })} /></div>
                <label>book</label>
                <TreeSelect value={product.bookModel.id} required filter options={getDataSelect()} placeholder="Select Items" onChange={(e) => setProduct({ ...product, bookModel: { ...product.bookModel, id: e.value } })}></TreeSelect>
            </Dialog>

            <Dialog
                visible={deleteProductDialog}
                style={{ width: '450px' }}
                header="Confirm" modal
                footer={deleteProductDialogFooter}
                onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && <span>Are you sure you want to delete BOOK ITEM: {product.id} <b>{product.name}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}
export default AdminBookItem;