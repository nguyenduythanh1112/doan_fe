import { useEffect, useState } from "react";
import * as OrderService from "../../service/OrderService"
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import {Button} from "primereact/button"
const AdminOrder=()=>{

    const [orders,setOrders]=useState([]);
    const [order,setOrder]=useState([]);
    let status;
    let id;

    useEffect(()=>{
        const fetch = async () => {
            const respond = await OrderService.findAll();
            const data = await respond.text();
            if (respond.ok) {
                toast.success("Fetch OK ");
                setOrders(JSON.parse(data));
            }
            else toast.error(data);
        }
        fetch()
    },[])


    const handleOnChange=(rowData, e)=>{
        id=rowData.id;
        status=e.target.value;
        console.log(id,status)
    }


    const handleClick=async(rowData)=>{
        if(rowData.id==id){
            const respond = await OrderService.saveOrderById(id,status);
            // const data = await respond.text();
            if (respond.ok) toast.success("Save success");
            else toast.error("Save error");
        }
        else toast.error("Not change");
    }


    const bodyAction=(rowData)=>{
        return(
            <div>
                <Button icon="pi pi-save" className="p-button-rounded p-button-success mr-2" onClick={e=>handleClick(rowData)}/>
            </div>
        )
    }

    const bodyStatus=(rowData)=>{
        return(
            <div className="h-10">
                <select className="w-full h-10" onChange={e=>handleOnChange(rowData,e)}>
                    <option value={rowData.status}>{rowData.status} - Default</option>
                    <option value="yes">yes</option>
                    <option value="no">no</option>
                    <option value="pending">pending</option>
                </select>
            </div>
        )
    }


    return(
        <div className="grid justify-center">
            <div className="card col-11">
                <DataTable value={orders} responsiveLayout="scroll">
                    <Column field="id" header="ID"></Column>
                    <Column field="date" header="Date"></Column>
                    <Column field="totalPrice" header="Total Price"></Column>
                    <Column field="informationToShip" header="Address"></Column>
                    <Column field="identifyId" header="identifyId"></Column>
                    <Column field="shipmentModel.name" header="Shipment"></Column>
                    <Column field="identifyId" header="identifyId"></Column>
                    <Column header="Status" body={bodyStatus} className="w-2"></Column>
                    <Column header="Action" body={bodyAction}></Column>
                </DataTable>
            </div>
        </div>
    )
}
export default AdminOrder;
