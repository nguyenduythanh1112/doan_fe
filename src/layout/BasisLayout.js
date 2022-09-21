import Header from "../component/header";
import Footer from "../component/footer";
import { Outlet } from "react-router-dom";

function BasisLayout({ children }) {
    console.log("ok")
    return (
        <div>
            <Header></Header>
            {children}
            <Footer></Footer>
            <Outlet />
        </div>
    );
}

export default BasisLayout;