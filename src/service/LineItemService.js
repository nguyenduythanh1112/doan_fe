const accessToken = localStorage.getItem("bookstoretoken")

const save = (bookItemId) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("bookItemId", bookItemId);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return fetch("http://localhost:8080/api/lineitem", requestOptions);
}

const add = (bookItemId) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("bookItemId", bookItemId);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return fetch("http://localhost:8080/api/lineitem/add", requestOptions);
}

const subtract = (bookItemId) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("bookItemId", bookItemId);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    return fetch("http://localhost:8080/api/lineitem/subtract", requestOptions);
}

export { save, add, subtract }