import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import Menu from '../Menu';

import './header.css';

function Header (props) {
    const fullWidthClass = !props.fullWidth ? '' : " full-width",
        showMenu = !props.showMenu ? props.showMenu : true,
        stickyClass = !props.sticky ? '' : ' navbar-fixed-top';
    return (
        <header>
            <nav className={'navbar navbar-default' + stickyClass + fullWidthClass}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <span className="navbar-brand"><Logo /></span>
                        {props.title &&
                            <h1>{props.title}</h1>
                        }
                    </div>
                    {showMenu &&
                        <Menu
                            navMenu={props.menu.navMenu}
                            userMenu={props.menu.userMenu}
                            links={props.menu.links}
                        />
                    }
                </div>
            </nav>
        </header>
    )
}

Header.propTypes = {
    fullWidth: PropTypes.bool,
    menu: PropTypes.object,
    showMenu: PropTypes.bool,
    sticky: PropTypes.bool,
    title: PropTypes.string,
};

export default Header;
