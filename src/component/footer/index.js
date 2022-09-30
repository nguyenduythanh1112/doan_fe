import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Chip } from 'primereact/chip';

function Footer() {
    return (
        <div className="m-3">
            <div className="flex align-items-center flex-wrap">
                <Chip label="Facebook" icon="pi pi-facebook" className="mr-2 mb-2 bg-cyan-800 text-cyan-50" />
                <Chip label="Google" icon="pi pi-google" className="mr-2 mb-2 bg-cyan-800 text-cyan-50" />
                <Chip label="Git" icon="pi pi-github" className="mb-2 bg-cyan-800 text-cyan-50" />
            </div>
        </div>
    );
}

export default Footer;