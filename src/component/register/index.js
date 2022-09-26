import { AutoComplete } from 'primereact/autocomplete';
import { Button } from 'primereact/button';
function Register() {
    return (
        <div className='flex  justify-center mt-10 flex-col w-1/2 m-auto'>
            <div className="p-float-label p-fluid my-10">
                <AutoComplete field="name" />
                <label>User name</label>
            </div>
            <span className="p-float-label p-fluid mb-5">
                <AutoComplete field="name" />
                <label>Password</label>
            </span>
            <span className="p-float-label p-fluid mb-5">
                <AutoComplete field="name" />
                <label>Email</label>
            </span>
            <Button label="Register" className="p-button-raised p-button-text" />

        </div>
    );
}

export default Register;