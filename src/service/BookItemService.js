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
function save(bookItem, bookId) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    if (bookItem.id) urlencoded.append("id", bookItem.id);
    urlencoded.append("barcode", bookItem.barcode);
    urlencoded.append("exportedPrice", bookItem.exportedPrice);
    urlencoded.append("discount", bookItem.discount);
    urlencoded.append("status", bookItem.status);
    urlencoded.append("bookId", bookId);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return fetch("http://localhost:8080/api/bookitem", requestOptions);
}



export { findAll, findById, save }