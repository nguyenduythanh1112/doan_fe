import { useContext, useState } from 'react';
import { UserInformation } from '../../App';

function Login() {

    const { userInformation, setUserInformation } = useContext(UserInformation);

    const [user, setUser] = useState({
        username: "",
        password: ""
    })

    const handleInformation = () => {
        if (userInformation.role === "user") setUserInformation({ ...userInformation, role: "admin" })
        else setUserInformation({ ...userInformation, role: "user" })
    }

    const handleLogin = (e) => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        var urlencoded = new URLSearchParams();
        urlencoded.append("username", user.username);
        urlencoded.append("password", user.password);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: urlencoded,
        };
        fetch("http://localhost:8080/login", requestOptions)
            .then(response => {
                return new Promise((resolve, reject) => {
                    if (response.ok) resolve(response.text());
                    reject();
                })
            })
            .then(result => {
                console.log(result);
                setUserInformation({ ...userInformation, isLogin: true, accessToken: result })
                localStorage.setItem("bookstoretoken", result);
                alert("success")
            })
            .catch(error => {
                console.log('error', error);
                alert("error")
            });
    }

    return (
        <div>
            <input placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} value={user.username}></input>
            <input placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} value={user.password}></input>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleInformation}>Set navigation</button>
        </div>
    );
}

export default Login;