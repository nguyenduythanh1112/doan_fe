
const accessToken = localStorage.getItem("bookstoretoken")

async function save(book) {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    if (book.id) urlencoded.append("id", book.id);
    urlencoded.append("title", book.title);
    urlencoded.append("summary", book.summary);
    urlencoded.append("numberOfPage", book.numberOfPage);
    urlencoded.append("language", book.language);
    urlencoded.append("image", book.image);
    urlencoded.append("file", book.file);
    urlencoded.append("description", book.description);
    urlencoded.append("importedPrice", book.importedPrice);
    urlencoded.append("importedQuantity", book.importedQuantity);
    urlencoded.append("exportedQuantity", book.exportedQuantity);
    urlencoded.append("publisher", book.publisher);
    urlencoded.append("author", book.author);
    urlencoded.append("category", book.category);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };
    const respond = await fetch("http://localhost:8080/api/book", requestOptions)
    return respond;
}


function findAll() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", accessToken);
    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
    };
    return fetch("http://localhost:8080/api/book", requestOptions)
}


export { save, findAll }