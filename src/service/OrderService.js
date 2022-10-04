const accessToken = localStorage.getItem("bookstoretoken")

const create = (paymentId, shipmentId, information) => {

    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    var urlencoded = new URLSearchParams();
    urlencoded.append("paymentId", paymentId);
    urlencoded.append("shipmentId", shipmentId);
    urlencoded.append("city", information.city);
    urlencoded.append("town", information.town);
    urlencoded.append("ward", information.ward);
    urlencoded.append("detailAddress", information.detailAddress);
    urlencoded.append("phoneNumber", information.phoneNumber);
    urlencoded.append("name", information.name);

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    return fetch("http://localhost:8080/api/order", requestOptions)
}
export { create }