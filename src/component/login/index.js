import { useContext, useState } from 'react';
import { UserInformation } from '../../App';
import { decodeToken } from 'react-jwt';
import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';

function Login() {

    const { userInformation, setUserInformation } = useContext(UserInformation);

    const [user, setUser] = useState({
        username: "2",
        password: "2"
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
                const accessToken = result;
                const payload = decodeToken(accessToken);
                setUserInformation({ ...userInformation, isLogin: true, accessToken: accessToken, role: payload.role })
                localStorage.setItem("bookstoretoken", result);
                alert("success")
            })
            .catch(error => {
                console.log('error', error);
                alert("error")
            });
    }

    return (
        <div className="grid justify-center">
            <div className='col-5 flex flex-col'>
                {/* <input placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} value={user.username}></input>
            <input placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} value={user.password}></input>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleInformation}>Set navigation</button> */}


                <div className="p-float-label p-fluid my-10">
                    <AutoComplete field="name" onChange={e => setUser({ ...user, username: e.target.value })} value={user.username} />
                    <label>User name</label>
                </div>
                <span className="p-float-label p-fluid mb-2">
                    <AutoComplete field="name" onChange={e => setUser({ ...user, password: e.target.value })} value={user.password} />
                    <label>Password</label>
                </span>
                <Button onClick={handleLogin} label="Login" className="p-button-raised p-button-text" />
                <div className="grid my-5 justify-between">
                    <Button label="Login with google" className="p-button-raised p-button-text pi pi-google col-5" />
                    <Button label="Login with facebook" className="p-button-raised p-button-text pi pi-facebook col-5" />
                </div>

            </div>
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="col-5"></img>
        </div>
    );
}

export default Login;