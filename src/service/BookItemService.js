const accessToken = localStorage.getItem("bookstoretoken")
function findAll() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch("http://localhost:8080/api/bookitem", requestOptions)
}
function findById(id) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch(`http://localhost:8080/api/bookitem/${id}`, requestOptions)
}
export { findAll, findById }