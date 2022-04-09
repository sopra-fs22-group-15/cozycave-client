import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Button from "./components/util/Button.js"


const Navbar = () => {
    return (
        <nav className="navbar navbar-light bg-transparent justify-content-between fixed-top">
            <div className="container-fluid">
                <a className="navbar-brand">Cozy Cave</a>
                <div className="d-flex">
                    <div className="container-fluid">
                        <Button type="button" outlined={true} variant="primary" opts="me-2">Sign In</Button>
                        <Button type="button" variant="primary">Sign Up</Button>
                    </div>
                </div>
            </div>
        </nav>

    )
}

export default Navbar;
