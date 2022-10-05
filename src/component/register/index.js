import { AutoComplete } from 'primereact/autocomplete';
import * as UserService from '../../service/UserService';
import { Button } from 'primereact/button';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function Register() {

    const [user, setUser] = useState({ username: "", password: "", email: "" })
    const navigate = useNavigate();

    const handleRegister = async () => {
        const respond = await UserService.register(user);
        if (respond.ok) {
            toast.success("Register success");
            navigate("/login");
        }
        else toast.error("Error");
    }

    return (
        <div className='flex  justify-center mt-10 flex-col w-1/2 m-auto'>
            <span className="p-float-label p-fluid my-10"><AutoComplete value={user.username} onChange={e => setUser({ ...user, username: e.target.value })} /><label>User name</label></span>
            <span className="p-float-label p-fluid mb-5"><AutoComplete value={user.password} onChange={e => setUser({ ...user, password: e.target.value })} /><label>Password</label></span>
            <span className="p-float-label p-fluid mb-5"><AutoComplete value={user.email} onChange={e => setUser({ ...user, email: e.target.value })} /><label>Email</label></span>
            <Button label="Register" className="p-button-raised p-button-text" onClick={handleRegister} />
        </div>
    );
}

export default Register;