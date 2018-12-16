import React from 'react';

const Header = (props) => {
    return (
        <header>
            <div className="wrapper">
                <div className="headerContainer">
                    {props.user ? <button onClick={props.logOut}>Log Out</button> : <button onClick={props.logIn}>Login</button>}
                    <div className="headerTitle">
                        <h2>Strain search</h2>
                        <h1>Cannabis strain search engine</h1>
                    </div>
                    <i className="fas fa-angle-double-down"></i>
                </div>
            </div>
        </header>
    )
}

export default Header;