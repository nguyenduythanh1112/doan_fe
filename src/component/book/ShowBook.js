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
import { toast } from 'react-toastify';
import * as BookService from '../../service/BookService';
import './index.css';
import { Link } from 'react-router-dom';
import { async } from '@firebase/util';

const ShowBook = () => {

    const [refresh, setRefresh] = useState(true);
    let [books, setBooks] = useState(null);
    let [bookId, setBookId] = useState(null);
    let [deleteBookDialog, setDeleteBookDialog] = useState(false);
    let [globalFilter, setGlobalFilter] = useState(null);
    let dt = useRef(null);

    useEffect(() => {
        BookService.findAll().then(response => {
            return new Promise((resolve, reject) => {
                if (response.ok) resolve(response.text());
                reject();
            })
        }).then(result => {
            setBooks(JSON.parse(result));
            // toast.success("Load book success")
        }).catch(error => {
            toast.error("Load book error")
        });
    }, [refresh]);



    const hideDeleteBookDialog = () => { setDeleteBookDialog(false); }
    const confirmDeleteProduct = (product) => { setBookId(product.id); setDeleteBookDialog(true); }
    const exportCSV = () => { dt.current.exportCSV(); }
    const leftToolbar = () => <Link to="/book/save"><Button label="New Book" icon="pi pi-plus" className="p-button-success mr-2" /></Link>
    const imageBody = (rowData) => <img src={rowData.image} onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} alt={rowData.image} className="product-image h-12 w-auto" />
    
    
    const deleteProduct =async () => {
        const respond = await BookService.deleteById(bookId);
        if(respond.ok){
            toast.success("Delete success: " + bookId);
            setRefresh(!refresh);
        }
        else toast.error("Delete error "+bookId);
        setDeleteBookDialog(false);
        
    }

    const rightToolbar = (
        <React.Fragment>
            <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />
            <Button label="Refresh" icon="pi pi-upload" className="mx-3" onClick={e => setRefresh(!refresh)} />
        </React.Fragment>
    )


    const actionBody = (rowData) => (
        <React.Fragment>
            <Link to={`/book/save/${rowData.id}`}><Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" /></Link>
            <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteProduct(rowData)} />
        </React.Fragment >
    );

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Manage books</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
    const deleteBookDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" className="p-button-text" onClick={hideDeleteBookDialog} />
            <Button label="Yes" icon="pi pi-check" className="p-button-text" onClick={deleteProduct} />
        </React.Fragment>
    );

    return (
        <div className="datatable-crud-demo capitalize">
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbar} right={rightToolbar}></Toolbar>
                <DataTable
                    className='capitalize' ref={dt} value={books}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} books"
                    globalFilter={globalFilter} header={header} responsiveLayout="scroll">

                    <Column header="action" body={actionBody} exportable={false} style={{ minWidth: '12rem' }} ></Column>
                    <Column field="id" header="id" sortable style={{ minWidth: '9rem' }}></Column>
                    <Column field="image" header="image" sortable body={imageBody} style={{ minWidth: '9rem' }}></Column>
                    <Column field="summary" header="summary" sortable style={{ minWidth: '25rem' }}></Column>
                    <Column field="title" header="title" sortable style={{ minWidth: '9rem' }}></Column>
                    <Column field="numberOfPage" header="numberOfPage" sortable ></Column>
                    <Column field="language" header="language" sortable ></Column>
                    <Column field="file" header="file" sortable style={{ minWidth: '9rem' }}></Column>
                    <Column field="description" header="description" sortable style={{ minWidth: '25rem' }}></Column>
                    <Column field="importedPrice" header="importedPrice" sortable ></Column>
                    <Column field="importedQuantity" header="importedQuantity" sortable></Column>
                    <Column field="exportedQuantity" header="exportedQuantity" sortable ></Column>
                    <Column field="publisher" header="publisher" sortable style={{ minWidth: '9rem' }}></Column>
                    <Column field="author" header="author" sortable style={{ minWidth: '9rem' }}></Column>
                    <Column field="category" header="category" sortable style={{ minWidth: '9rem' }} ></Column>

                </DataTable>
            </div>
            <Dialog
                visible={deleteBookDialog}
                style={{ width: '450px' }}
                header="Confirm" modal
                footer={deleteBookDialogFooter}
                onHide={hideDeleteBookDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    <span>Are you sure you want to delete BOOK ID: {bookId}</span>
                </div>
            </Dialog>
        </div>
    );
}
export default ShowBook;