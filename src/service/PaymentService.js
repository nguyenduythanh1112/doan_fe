const accessToken = localStorage.getItem("bookstoretoken")

const findAll = () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch("http://localhost:8080/api/payment", requestOptions)
}
export { findAll }