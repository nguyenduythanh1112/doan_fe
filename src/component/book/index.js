import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import * as BookService from '../../service/BookService';
import * as FirebaseService from '../../service/FirebaseService';
import './index.css';

const Book = () => {

    let emptyProduct = {
        id: null,
        title: "title",
        summary: "summary",
        numberOfPage: "200",
        language: "language",
        image: "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        file: "https://images-na.ssl-images-amazon.com/images/I/51kpoART0HL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg",
        description: "description",
        importedPrice: "10",
        importedQuantity: "10",
        exportedQuantity: "1",
        publisher: "publisher",
        author: "author",
        category: "category",
    };

    let [products, setProducts] = useState(null);
    let [productDialog, setProductDialog] = useState(false);
    let [deleteProductDialog, setDeleteProductDialog] = useState(false);
    let [product, setProduct] = useState(emptyProduct);
    let [selectedProducts, setSelectedProducts] = useState(null);
    let [globalFilter, setGlobalFilter] = useState(null);
    let [selectedOption, setSelectedOption] = useState({
        image: "text",
        file: "text"
    })
    let [file, setFile] = useState({ image: "", file: "" })
    let toast = useRef(null);
    let dt = useRef(null);

    useEffect(() => {

        BookService.findAll().then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) resolve(response.text());
                reject();
            })
        }).then(result => {
            setProducts(JSON.parse(result))
        }).catch(error => {
            alert("error");
        });

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
        if (selectedOption.image === "file" && file.image) {
            const urlImage = await FirebaseService.uploadImage(file.image);
            console.log(urlImage);
            product = { ...product, image: urlImage };
        }
        if (selectedOption.file === "file" && file.file) {
            const urlFile = await FirebaseService.uploadFile(file.file);
            console.log(urlFile);
            product = { ...product, file: urlFile };
        }
        const respond = await BookService.save(product);

        if (respond.ok) {
            const data = await respond.text();
            setProducts([...products, JSON.parse(data)]);
            alert("OK")
        }
        else {
            alert("NO")
        }

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
        return <img src={rowData.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image" />
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
        <div className="datatable-crud-demo capitalize">
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
                    <Column field="id" header="id" sortable ></Column>
                    <Column field="image" header="image" sortable body={imageBodyTemplate}></Column>
                    <Column field="summary" header="summary" sortable ></Column>
                    <Column field="title" header="title" sortable ></Column>
                    <Column field="numberOfPage" header="numberOfPage" sortable ></Column>
                    <Column field="language" header="language" sortable ></Column>
                    {/* <Column field="file" header="file" sortable ></Column> */}
                    <Column field="description" header="description" sortable ></Column>
                    <Column field="importedPrice" header="importedPrice" sortable ></Column>
                    <Column field="importedQuantity" header="importedQuantity" sortable ></Column>
                    <Column field="exportedQuantity" header="exportedQuantity" sortable ></Column>
                    <Column field="publisher" header="publisher" sortable ></Column>
                    <Column field="author" header="author" sortable ></Column>
                    <Column field="category" header="category" sortable ></Column>

                </DataTable>
            </div>

            <Dialog visible={productDialog} style={{ width: '650px' }} header="Product Details" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field"><label>title</label><InputText value={product.title} onChange={(e) => onInputChange(e, 'title')} required /></div>
                <div className="field"><label>summary</label><InputText value={product.summary} onChange={(e) => onInputChange(e, 'summary')} required /></div>
                <div className="field"><label>numberOfPage</label><InputText value={product.numberOfPage} onChange={(e) => onInputChange(e, 'numberOfPage')} required /></div>
                <div className="field"><label>language</label><InputText value={product.language} onChange={(e) => onInputChange(e, 'language')} required /></div>

                {selectedOption.image === "text"
                    ?
                    <div className='flex'>
                        <InputText placeholder="image" value={product.image} onChange={(e) => setProduct({ ...product, image: e.target.value })}></InputText>
                        <Button className='w-3 p-button-raised p-button-text' onClick={() => setSelectedOption({ ...selectedOption, image: "file" })}>Or file</Button>
                    </div>
                    :
                    <div className='flex'>
                        <input type="file" placeholder="image" onChange={e => setFile({ ...file, image: e.target.files[0] })}></input>
                        <Button className='w-3 p-button-raised p-button-text' onClick={() => setSelectedOption({ ...selectedOption, image: "text" })}>Or text</Button>
                    </div>
                }
                {selectedOption.file === "text"
                    ?
                    <div className='flex'>
                        <InputText placeholder="file" value={product.file} onChange={(e) => setProduct({ ...product, file: e.target.value })}></InputText>
                        <Button className='w-3 p-button-raised p-button-text' onClick={() => setSelectedOption({ ...selectedOption, file: "file" })}>Choose file</Button>
                    </div >
                    :
                    <div className='flex'>
                        <input type="file" placeholder="file" onChange={e => setFile({ ...file, file: e.target.files[0] })}></input>
                        <Button className='w-3 p-button-raised p-button-text' onClick={() => setSelectedOption({ ...selectedOption, file: "text" })}>Enter text</Button>
                    </div>
                }
                {/* 

                <div className="field"><label>image</label><InputText value={product.image} onChange={(e) => onInputChange(e, 'image')} required /></div>
                <div className="field"><label>file</label><InputText value={product.file} onChange={(e) => onInputChange(e, 'file')} required /></div>
                <div className="field"><label>image</label><FileUpload accept="image/*" emptyTemplate={<p className="m-0">UPLOAD</p>} /></div>
                <div className="field"><label>file</label><FileUpload accept="image/*" emptyTemplate={<p className="m-0">UPLOAD</p>} /></div> */}
                <div className="field"><label>description</label><InputText value={product.description} onChange={(e) => onInputChange(e, 'description')} required /></div>
                <div className="field"><label>importedPrice</label><InputText value={product.importedPrice} onChange={(e) => onInputChange(e, 'importedPrice')} required /></div>
                <div className="field"><label>importedQuantity</label><InputText value={product.importedQuantity} onChange={(e) => onInputChange(e, 'importedQuantity')} required /></div>
                <div className="field"><label>exportedQuantity</label><InputText value={product.exportedQuantity} onChange={(e) => onInputChange(e, 'exportedQuantity')} required /></div>
                <div className="field"><label>publisher</label><InputText value={product.publisher} onChange={(e) => onInputChange(e, 'publisher')} required /></div>
                <div className="field"><label>author</label><InputText value={product.author} onChange={(e) => onInputChange(e, 'author')} required /></div>
                <div className="field"><label>category</label><InputText value={product.category} onChange={(e) => onInputChange(e, 'category')} required /></div>
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
export default Book;