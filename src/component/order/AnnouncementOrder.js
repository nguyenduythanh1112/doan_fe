import { useSearchParams } from 'react'
import { Divider } from 'primereact/divider';
const AnnouncementOrder = () => {
    const [searchParams] = useSearchParams();
    return (
        <div>
            <Divider align="left" type="dashed"><b>Amount</b></Divider>{searchParams.get("vnp_Amount")}
            <Divider align="left" type="dashed"><b>BankCode</b></Divider>{searchParams.get("vnp_BankCode")}
            <Divider align="left" type="dashed"><b>BankTranNo</b></Divider>{searchParams.get("vnp_BankTranNo")}
            <Divider align="left" type="dashed"><b>CardType</b></Divider>{searchParams.get("vnp_CardType")}
            <Divider align="left" type="dashed"><b>OrderInfo</b></Divider>{searchParams.get("vnp_OrderInfo")}
            <Divider align="left" type="dashed"><b>PayDate</b></Divider>{searchParams.get("vnp_PayDate")}
            <Divider align="left" type="dashed"><b>ResponseCode</b></Divider>{searchParams.get("vnp_ResponseCode")}
            <Divider align="left" type="dashed"><b>TmnCode</b></Divider>{searchParams.get("vnp_TmnCode")}
            <Divider align="left" type="dashed"><b>TransactionNo</b></Divider>{searchParams.get("vnp_TransactionNo")}
            <Divider align="left" type="dashed"><b>TransactionStatus</b></Divider>{searchParams.get("vnp_TransactionStatus")}
            <Divider align="left" type="dashed"><b>TxnRef</b></Divider>{searchParams.get("vnp_TxnRef")}
            <Divider align="left" type="dashed"><b>SecureHash</b></Divider>{searchParams.get("vnp_SecureHash")}
        </div>
    )
}
export default AnnouncementOrder;