import React from 'react';
import PropTypes from 'prop-types';

import './menu.css';

function Menu (props) {
    const expandMenu = props.showNavMenuItems ? ' open' : '',
        expandUserMenu = props.showUserMenuItems ? ' open' : '',
        navItemCount = props.navMenu && props.navMenu.items ? props.navMenu.items.length : 0;
    return (
        <ul className="nav navbar-nav navbar-right">
            {props.links ?
                props.links.map( (linkItem, linkIndex) => {
                    const linkTarget = linkItem.target ? linkItem.target : '';
                    return (
                        <li key={linkIndex}><a href={linkItem.link} target={linkTarget}>{linkItem.label}</a></li>
                    )
                }) : ''
            }
            {props.navMenu &&
                <li className={'dropdown' + expandMenu} tabIndex="0" onFocus={props.onFocusMenuItems.bind(null, "nav", true)}>
                    <a className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded={props.showNavMenuItems}>
                        <span className="fa fa-bars fa-fw" aria-hidden={!props.showNavMenuItems}></span> {props.navMenu.title}
                    </a>
                    <ul className="dropdown-menu">
                        {props.navMenu.items.map( (navMenuItem, navIndex) => {
                            if ( navIndex < (navItemCount - 1) ) {
                                return (<li key={navIndex}><a href={navMenuItem.link}>{navMenuItem.label}</a></li>)
                            } else {
                                return (<li key={navIndex}><a className="last-child" onBlur={props.onMenuBlur.bind(null, 'nav')} href={navMenuItem.link}>{navMenuItem.label}</a></li>)
                            }
                        })}
                    </ul>
                </li>
            }
            {props.userMenu && props.userMenu.displayName &&
                <li className={'dropdown' + expandUserMenu} tabIndex="0" onFocus={props.onFocusMenuItems.bind(null, "user", true)}>
                    <a className="dropdown-toggle" role="button" aria-haspopup="true" aria-expanded={props.showUserMenuItems}>
                        <span className="fa fa-user fa-fw" aria-hidden={!props.showUserMenuItems}></span> {props.userMenu.displayName}
                    </a>
                    <ul className="dropdown-menu">
                        {props.userMenu.items && props.userMenu.items.map( (userMenuItem, userIndex) => {
                            return (
                                <li key={userIndex}><a href={userMenuItem.link}>{userMenuItem.label}</a></li>
                            )
                        })}
                        {props.userMenu.logoutLink &&
                            <li><a href={props.userMenu.logoutLink} onBlur={props.onMenuBlur.bind(null, 'user')}>Exit</a></li>
                        }
                        {props.userMenu.logoutAction &&
                            <li><a href="" className="logout-link" onClick={props.onLogoutClick} onBlur={props.onMenuBlur.bind(null, 'user')}>Exit</a></li>
                        }
                    </ul>
                </li>
            }
        </ul>
    )
}

Menu.propTypes = {
    links: PropTypes.array,
    navMenu: PropTypes.object,
    onFocusMenuItems: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func,
    onMenuClick: PropTypes.func.isRequired,
    userMenu: PropTypes.object,
    showNavMenuItems: PropTypes.bool,
    showUserMenuItems: PropTypes.bool,
    onMenuBlur: PropTypes.func
}

export default Menu;
