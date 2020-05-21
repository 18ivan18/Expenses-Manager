/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import Logo from '../assests/logo.jpg'


const NavBar = ({ auth }) => { 
    useEffect(() => {
        // console.log("Component did mount...")
        const M = window.M;

        const elems = document.querySelectorAll('.sidenav');
        M.Sidenav.init(elems, {});

    }, []);

    return (
        <React.Fragment>
        <div className="navbar">
            <nav role="navigation" className="orange">
            <div className="nav-wrapper">
                <Link to="/" data-target="mobile-demo" className="sidenav-trigger">
                    <i className="material-icons">menu</i>
                </Link>
                <Link to="/" className="brand-logo"><img style={{width: "64px", height: "64px", position: "relative"}} src={Logo}/></Link>
                    <ul className="right hide-on-med-and-down">
                        {!auth.loggedIn && 
                        <React.Fragment>
                        <li><Link to="/login" style={{margin: "0px 30px 0px 30px"}}>Sign in</Link></li>
                        <li><Link to="/register" style={{margin: "0px 30px 0px 30px"}}>Sign up</Link></li>
                        </React.Fragment>
                        }
                </ul>
            </div>
            </nav>
        </div>

        <ul className="sidenav" id="mobile-demo">
            <li>
                <Link to="/">Home</Link>
            </li>
            <li>
                <Link to="/recepies">Recepies</Link>
        </li>
        </ul>
        
   
    </React.Fragment>
    )
}

const mapStateToProps = state => (
    {
        auth: state.auth
    }
)

const mapDispatchToProps = (dispatch) => {
    // return {
    //     logout: () => {  
    //         dispatch(logout())
    //     }
    // }
}

export default connect(
    mapStateToProps
)(NavBar);