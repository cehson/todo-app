import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { signOut } from '../../auth/signIn/redux/actions'

const SignedInLinks: React.FC = (props) => {
    return (
        <ul className="navbar-menu display_flex display_flex-justify-content--flex-end">
        <li className="navbar-item">
            <Link to="/create/">
               Create
        </Link>
        </li>
        <li className="navbar-item">
            <a onClick={props.signOut}>
                Sign out
        </a>
        </li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut : () => dispatch(signOut())
    }
}
 
export default connect(null, mapDispatchToProps)(SignedInLinks)
