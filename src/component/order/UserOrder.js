import { useEffect, useState } from "react";
import * as OrderService from "../../service/OrderService"
import { toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const UserOrder = () => {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetch = async () => {
            const respond = await OrderService.findAll();
            const data = await respond.text();
            if (respond.ok) {
                console.log(JSON.parse(data))
                // toast.success("Success");
                setOrders(JSON.parse(data));
            }
            else toast.error("Error");
        }
        fetch()
    }, [])

    return (
        <div className="grid justify-center">
            <div className="card col-11">
                <DataTable value={orders} responsiveLayout="scroll">
                    <Column field="id" header="ID"></Column>
                    <Column field="date" header="Ngày"></Column>
                    <Column field="status" header="Trạng thái"></Column>
                    <Column field="totalPrice" header="Tổng tiền thanh toán"></Column>
                    <Column field="informationToShip" header="Thông tin vận chuyển"></Column>
                    <Column field="shipmentModel.name" header="Hình thức vận chuyển"></Column>
                    <Column field="paymentModel.name" header="Hình thức thanh toán"></Column>
                </DataTable>
            </div>
        </div>
    )
}
export default UserOrder;
