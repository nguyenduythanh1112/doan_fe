const login = (user) => {

}



const register = (user) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    var urlencoded = new URLSearchParams();
    urlencoded.append("username", user.username);
    urlencoded.append("password", user.password);
    urlencoded.append("email", user.email);
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
    };

    return fetch("http://localhost:8080/api/user/register", requestOptions)
}

export { login, register }