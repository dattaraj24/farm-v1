import React from 'react';
import { Link } from 'react-router-dom';


const Logo = ({limage, dimage, simage}) => {
    return (
        <Link to={process.env.PUBLIC_URL + "/"}>
            <img className="light-version-logo" src={require("../../images/logo/logo.webp")} width="250px" alt="logo" />
            <img className="dark-version-logo" src={require("../../images/logo/logo.webp")} width="250px" alt="logo" />
            <img className="sticky-logo" src={require("../../images/logo/logo.webp")} width="250px" alt="logo" />
        </Link>
    )
}


export default Logo;