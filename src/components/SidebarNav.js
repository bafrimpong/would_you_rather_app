import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AddCircle, Logout } from '@mui/icons-material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider'
import { connect } from 'react-redux';

class SidebarNav extends React.Component {
    /**
     * Redirect a user to the Leaderboard path
     */
    handleGoToLeaderboard = () => {
        this.props.history.push('/leaderboard')
    }

    render() {
        return (
            <div>
                <List>
                    <ListItem button component={Link} to='/'>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Dashboard" name={'dashboardPage'} 
                            />
                    </ListItem>
                    <ListItem button component={Link} to='/leaderboard' name={'leaderboardPage'} 
                        >
                        <ListItemIcon>
                            <LeaderboardIcon />
                        </ListItemIcon>
                        <ListItemText primary="Leaderboard" />
                    </ListItem>
                    <ListItem button component={Link} to='/add' name={'questionsPage'} 
                        >
                        <ListItemIcon>
                            <AddCircle />
                        </ListItemIcon>
                        <ListItemText primary="New Question" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListSubheader inset>User</ListSubheader>
                    <ListItem button onClick={this.props.handleLogOut}>
                        <ListItemIcon>
                            <Logout />
                        </ListItemIcon>
                        <ListItemText primary={'Sign Out'} />
                    </ListItem>
                </List>
            </div>
        )
    }
}

function mapStateToProp({ authenticatedUser, users }) {
    return {
        authenticatedUser: authenticatedUser,
        users: users
    }
}

export default withRouter(connect(mapStateToProp)(SidebarNav));