import { useEffect, useState } from "react";
import * as OrderService from "../../service/OrderService"
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UserOrder=()=>{

    const [orders,setOrders]=useState([]);

    useEffect(()=>{
        const fetch = async () => {
            const respond = await OrderService.findAll();
            const data = await respond.text();
            if (respond.ok) {
                toast.success("Fetch Cart OK: ");
                setOrders(JSON.parse(data));
            }
            else toast.error(data);
        }
        fetch()
    },[])

    return(
        <div className="grid justify-center">
            <div className="card col-11">
                <DataTable value={orders} responsiveLayout="scroll">
                    <Column field="id" header="ID"></Column>
                    <Column field="date" header="Date"></Column>
                    <Column field="status" header="Status"></Column>
                    <Column field="totalPrice" header="Total Price"></Column>
                </DataTable>
            </div>
        </div>
    )
}
export default UserOrder;
