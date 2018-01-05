import React from 'react';
import PropTypes from 'prop-types';

import MenuUI from './Menu';
import onClickOutside from 'react-onclickoutside';

let Menu = onClickOutside(React.createClass({
    getInitialState: function() {
        return {
            showNavMenuItems: false,
            showUserMenuItems: false
        }
    },
    handleClickOutside: function(event) {
        this.setState({
            showNavMenuItems: false,
            showUserMenuItems: false
        });
    },
    handleFocusMenuItems: function(section, flag, event) {
        if (section === 'nav' ) {
            this.setState({
                showNavMenuItems: flag,
                showUserMenuItems: false
            });
        }  else if (section === 'user') {
            this.setState({
                showNavMenuItems: false,
                showUserMenuItems: flag
            });
        }
    },
    handleMenuClick: function(section, event) {
        if (section === 'nav') {
            this.setState({
                showNavMenuItems: !this.state.showNavMenuItems,
                showUserMenuItems: false
            });
        } else if (section === 'user') {
            this.setState({
                showNavMenuItems: false,
                showUserMenuItems: !this.state.showUserMenuItems
            });
        }
    },
    handleOnMenuBlur: function(section, event) {
        if(section === 'user') {
            this.setState({
                showUserMenuItems: false
            });
        } else if (section === 'nav') {
            this.setState({
                showNavMenuItems: false
            });
        }
    },
    handleLogoutClick: function(event) {
        event.preventDefault();
        if(this.props.userMenu.logoutAction) {
            this.props.userMenu.logoutAction(this.props.userMenu.displayName, event);
        }
        this.setState({
            showUserMenuItems: false
        });
    },
    render: function() {
        return (
            <MenuUI
                links = {this.props.links}
                navMenu = {this.props.navMenu}
                onFocusMenuItems = {this.handleFocusMenuItems}
                onLogoutClick = {this.handleLogoutClick}
                onMenuClick = {this.handleMenuClick}
                showNavMenuItems = {this.state.showNavMenuItems}
                showUserMenuItems = {this.state.showUserMenuItems}
                userMenu = {this.props.userMenu}
                onMenuBlur = {this.handleOnMenuBlur}
            />
        )
    }
}));

Menu.propTypes = {
    navMenu: PropTypes.object,
    userMenu: PropTypes.object,
    links: PropTypes.array
};

export default Menu;
