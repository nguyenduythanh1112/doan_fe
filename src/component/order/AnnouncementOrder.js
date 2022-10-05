import { useSearchParams } from "react-router-dom";
import { Divider } from 'primereact/divider';
const AnnouncementOrder = () => {
    console.log("OK")
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <div className="w-1/2 flex m-auto flex-col">
            <Divider align="left" type="dashed"><b>Amount</b></Divider><div className="text-center">{searchParams.get("vnp_Amount")}</div>
            <Divider align="left" type="dashed"><b>BankCode</b></Divider><div className="text-center">{searchParams.get("vnp_BankCode")}</div>
            <Divider align="left" type="dashed"><b>BankTranNo</b></Divider><div className="text-center">{searchParams.get("vnp_BankTranNo")}</div>
            <Divider align="left" type="dashed"><b>CardType</b></Divider><div className="text-center">{searchParams.get("vnp_CardType")}</div>
            <Divider align="left" type="dashed"><b>OrderInfo</b></Divider><div className="text-center">{searchParams.get("vnp_OrderInfo")}</div>
            <Divider align="left" type="dashed"><b>PayDate</b></Divider><div className="text-center">{searchParams.get("vnp_PayDate")}</div>
            <Divider align="left" type="dashed"><b>ResponseCode</b></Divider><div className="text-center">{searchParams.get("vnp_ResponseCode")}</div>
            <Divider align="left" type="dashed"><b>TmnCode</b></Divider><div className="text-center">{searchParams.get("vnp_TmnCode")}</div>
            <Divider align="left" type="dashed"><b>TransactionNo</b></Divider><div className="text-center">{searchParams.get("vnp_TransactionNo")}</div>
            <Divider align="left" type="dashed"><b>TransactionStatus</b></Divider><div className="text-center">{searchParams.get("vnp_TransactionStatus")}</div>
            <Divider align="left" type="dashed"><b>TxnRef</b></Divider><div className="text-center">{searchParams.get("vnp_TxnRef")}</div>
            {/* <Divider align="left" type="dashed"><b>SecureHash</b></Divider><div className="text-center">{searchParams.get("vnp_SecureHash")}</div> */}
        </div>
    )
}
export default AnnouncementOrder;