import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputSwitch } from 'primereact/inputswitch';
import { ListBox } from 'primereact/listbox';
import { TreeSelect } from 'primereact/treeselect';
import { SelectButton } from 'primereact/selectbutton';
import './index.css';

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
    // key: "0"
    // label: "Documents"
    // data: "Documents Folder"
    // icon: "pi pi-fw pi-inbox"
    // children:

    let [products, setProducts] = useState(null);
    let [privateBooks, setPrivateBooks] = useState([]);
    let [productDialog, setProductDialog] = useState(false);
    let [deleteProductDialog, setDeleteProductDialog] = useState(false);
    let [product, setProduct] = useState(emptyProduct);
    let [selectedProducts, setSelectedProducts] = useState(null);
    let [globalFilter, setGlobalFilter] = useState(null);

    let toast = useRef(null);
    let dt = useRef(null);

    console.log(product)

    function getDataSelect() {
        return privateBooks.map((value) => {
            return ({
                key: value.id,
                label: value.id,
                icon: "pi pi-fw pi-cog"
            })
        })
    }

    useEffect(() => {
        setPrivateBooks([
            {
                "id": 45,
                "title": "title",
                "summary": "summary",
                "numberOfPage": 200,
                "language": "language",
                "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
                "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpgb18794ce-d325-4129-8498-fe95a6ced7ba?alt=media&token=99697f6b-4341-4dc3-be29-8ea246e50760",
                "description": "description",
                "importedPrice": 10.0,
                "importedQuantity": 10,
                "exportedQuantity": 1,
                "publisher": "publisher",
                "author": "author",
                "category": "category"
            },
            {
                "id": 46,
                "title": "title",
                "summary": "summary",
                "numberOfPage": 200,
                "language": "language",
                "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
                "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpgb18794ce-d325-4129-8498-fe95a6ced7ba?alt=media&token=99697f6b-4341-4dc3-be29-8ea246e50760",
                "description": "description",
                "importedPrice": 10.0,
                "importedQuantity": 10,
                "exportedQuantity": 1,
                "publisher": "publisher",
                "author": "author",
                "category": "category"
            }
        ])

        setProducts([
            {
                "id": 7,
                "barcode": "NDT147258369",
                "exportedPrice": 888.0,
                "discount": 0.25,
                "status": "yes",
                "bookModel": {
                    "id": 45,
                    "title": "title",
                    "summary": "summary",
                    "numberOfPage": 200,
                    "language": "language",
                    "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
                    "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpgb18794ce-d325-4129-8498-fe95a6ced7ba?alt=media&token=99697f6b-4341-4dc3-be29-8ea246e50760",
                    "description": "description",
                    "importedPrice": 10.0,
                    "importedQuantity": 10,
                    "exportedQuantity": 1,
                    "publisher": "publisher",
                    "author": "author",
                    "category": "category"
                }
            },
            {
                "id": 7,
                "barcode": "NDT147258369",
                "exportedPrice": 888.0,
                "discount": 0.25,
                "status": "yes",
                "bookModel": {
                    "id": 45,
                    "title": "title",
                    "summary": "summary",
                    "numberOfPage": 200,
                    "language": "language",
                    "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
                    "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpgb18794ce-d325-4129-8498-fe95a6ced7ba?alt=media&token=99697f6b-4341-4dc3-be29-8ea246e50760",
                    "description": "description",
                    "importedPrice": 10.0,
                    "importedQuantity": 10,
                    "exportedQuantity": 1,
                    "publisher": "publisher",
                    "author": "author",
                    "category": "category"
                }
            },
            {
                "id": 7,
                "barcode": "NDT147258369",
                "exportedPrice": 888.0,
                "discount": 0.25,
                "status": "yes",
                "bookModel": {
                    "id": 45,
                    "title": "title",
                    "summary": "summary",
                    "numberOfPage": 200,
                    "language": "language",
                    "image": "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
                    "file": "https://firebasestorage.googleapis.com/v0/b/bookstore-1efe1.appspot.com/o/file%2F1.jpgb18794ce-d325-4129-8498-fe95a6ced7ba?alt=media&token=99697f6b-4341-4dc3-be29-8ea246e50760",
                    "description": "description",
                    "importedPrice": 10.0,
                    "importedQuantity": 10,
                    "exportedQuantity": 1,
                    "publisher": "publisher",
                    "author": "author",
                    "category": "category"
                }
            },
            {
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
            }
        ])

    }, []);

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
        console.log(product)

    }

    const editProduct = (product) => {
        setProduct({ ...product });
        setProductDialog(true);
    }

    const confirmDeleteProduct = (product) => {
        setProduct(product);
        setDeleteProductDialog(true);
    }

    const deleteProduct = () => {
        let _products = products.filter(val => val.id !== product.id);
        setProducts(_products);
        setDeleteProductDialog(false);
        setProduct(emptyProduct);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
    }

    const exportCSV = () => { dt.current.exportCSV(); }

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };
        _product[`${name}`] = val;
        setProduct(_product);
    }

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
                {/* <FileUpload mode="basic" name="demo[]" auto url="https://primefaces.org/primereact/showcase/upload.php" accept=".csv" chooseLabel="Import" className="mr-2 inline-block" onUpload={importCSV} /> */}
                <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
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
                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
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
        <div className="datatable-crud-demo capitalize m-3">
            <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable
                    className='capitalize'
                    ref={dt}
                    value={products}
                    selection={selectedProducts}
                    onSelectionChange={(e) => setSelectedProducts(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">

                    <Column header="action" body={actionBodyTemplate} exportable={false} ></Column>
                    <Column field="id" header="id BookItem" sortable ></Column>
                    <Column field="barcode" header="barcode" sortable ></Column>
                    <Column field="exportedPrice" header="exportedPrice" sortable ></Column>
                    <Column field="discount" header="discount" sortable ></Column>
                    <Column field="status" header="status" sortable ></Column>
                    <Column field="bookModel.image" header="image" sortable body={imageBodyTemplate}></Column>
                    <Column field="bookModel.summary" header="summary" sortable ></Column>
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
                    {product && <span>Are you sure you want to delete <b>{product.name}</b>?</span>}
                </div>
            </Dialog>

        </div>
    );
}
export default AdminBookItem;