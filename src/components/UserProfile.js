import React, { Component, Fragment } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { connect } from 'react-redux';
import { Avatar } from '@mui/material';

class UserProfile extends Component {
    render() {
        const { authenticatedUser } = this.props;
        const CURRENT_USER_ID = authenticatedUser.authenticatedUser;

        const user = this.props.authenticatedUser.users[CURRENT_USER_ID]

        if (user !== null && user !== '') {
            return (
                <Fragment >
                    <Typography component="h3" variant="h6" color="primary" gutterBottom>
                        User Profile
                    </Typography>
                    <Avatar alt={user.id} src={user.avatarURL}
                        sx={{ width: 56, height: 56 }}
                    />
                    <Typography component="p" variant="h5">
                        {user.id}
                    </Typography>
                    <Typography color="text.secondary" sx={{ flex: 1 }}>
                        {user.name}
                    </Typography>
                    <div>
                        <Link color="primary" onClick={this.props.handleLogOut}
                            style={{ textDecoration: 'none', cursor: 'pointer' }}>
                            Sign Out
                        </Link>
                    </div>
                </Fragment >
            );
        } else {
            this.props.history.push('/login')
        }
    }
}

function mapStateToProp(authenticatedUser) {
    return {
        authenticatedUser: authenticatedUser
    }
}

export default connect(mapStateToProp)(UserProfile)