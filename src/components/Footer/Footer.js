import React from 'react'
import PropTypes from 'prop-types'
//import classNames from 'classnames'

import './footer.css'

function Footer (props) {
    //const classes = classNames(styles.default, styles[size], block && styles.block, className)
    return (
        <footer className="footer">
            <div className="row">
                <div className="footer-links">
                    <div>
                        <ul className="nav navbar-nav" role="navigation">
                            {props.items.map( (footerItem, index) => {
                                return (
                                    <li key={index}><a href={footerItem.link} target="_blank">{footerItem.label}</a></li>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

Footer.propTypes = {
    items: PropTypes.array.isRequired
}

export default Footer
