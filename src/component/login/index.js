import { useContext, useState } from 'react';
import { UserInformation } from '../../App';
import { decodeToken } from 'react-jwt';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Input, Typography } from '@material-tailwind/react';

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
        <div className='flex  justify-center mt-10'>
            {/* <input placeholder="Username" onChange={e => setUser({ ...user, username: e.target.value })} value={user.username}></input>
            <input placeholder="Password" onChange={e => setUser({ ...user, password: e.target.value })} value={user.password}></input>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleInformation}>Set navigation</button> */}
            <Card className="w-96">
                <CardHeader
                    variant="gradient"
                    color="blue"
                    className="mb-4 grid h-28 place-items-center"
                >
                    <Typography variant="h3" color="white">
                        Sign In
                    </Typography>
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <Input label="Username" size="lg" onChange={e => setUser({ ...user, username: e.target.value })} value={user.username} />
                    <Input label="Password" size="lg" onChange={e => setUser({ ...user, password: e.target.value })} value={user.password} />
                    <div className="-ml-2.5"><Checkbox label="Remember Me" /></div>
                </CardBody>
                <CardFooter className="pt-0">
                    <Button variant="gradient" fullWidth onClick={handleLogin}>
                        Sign In
                    </Button>
                    <Typography variant="small" className="mt-6 flex justify-center">
                        Don't have an account?
                        <Typography
                            as="a"
                            href="#signup"
                            variant="small"
                            color="blue"
                            className="ml-1 font-bold"
                        >
                            Sign up
                        </Typography>
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
}

export default Login;