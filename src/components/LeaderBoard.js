import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { SCORE } from '../utils/data/api';

// material ui (mui) import
import * as MuiIcons from '@mui/icons-material'
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { withRouter } from 'react-router';
class LeaderBoard extends Component {
    returnToDashboard = () => {
        this.props.history.push('/')
    }

    render() {
        const { users } = this.props;
        console.log('HISTORY', this.props.history)
        return (
            <Fragment>
                <Typography component="h1" variant="h3" color="primary" align="center" >
                    Leaderboard
                </Typography>
                <Container sx={{ py: 5 }} maxWidth="md">
                    <Grid container spacing={4}>
                        {users.map((userCard) => (
                            <Grid item key={userCard.id} xs={12} sm={6} md={4}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                >
                                    <CardMedia
                                        component="img" sx={{ // 545%  
                                            pt: '16:9',
                                        }}
                                        image={userCard.avatarURL}
                                        alt={userCard.id}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }} align="center">
                                        <Typography gutterBottom variant="h5" component="div">
                                            {userCard.name}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ flex: 1 }} >
                                            Questions: {userCard.questions.length}
                                        </Typography>
                                        <Typography color="text.secondary" sx={{ flex: 1 }} >
                                            Answered: {Object.keys(userCard.answers).length}
                                        </Typography>
                                    </CardContent>
                                        <Typography align="center" >
                                            Score Count: {userCard.score}
                                        </Typography>
                                    <CardActions>
                                        <Button size="small">View Questions</Button>
                                        <Button size="small">View Answers</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                    <div style={{ marginRight: 'auto !important', marginLeft: 'auto !important'}}>
                    <Typography component="h5" variant="h6" color="primary" >
                        <ListItem button onClick={this.returnToDashboard}>
                            <ListItemIcon>
                                <MuiIcons.Home color="success" />
                            </ListItemIcon>
                            <ListItemText primary={'Back to Dashboard'} />
                        </ListItem>
                    </Typography>
                    </div>
                </Container>
            </Fragment>
        );
    }
}

function mapStateToProp({ users, authenticatedUser }) {
    // in order not to destroy the existing user info,
    // an object has to be created to be assigned the details needed
    let newUser = Object.assign({}, users);
    Object.values(users).map((user) => (newUser[user.id][SCORE]) = (Object.keys(user.answers).length) + (user.questions.length))

    // sort the users by thier respect scores
    const sortUsersByScore = Object.values(newUser).sort((_i, _j) => {
        const _iScore = _i.score;
        const _jScore = _j.score;
        let result = 0;

        if (_iScore < _jScore) {
            result = 1;
        } else if (_iScore > _jScore) {
            result = -1
        }

        return result;
    })

    return {
        users: sortUsersByScore,
        authenticatedUser: authenticatedUser
    }
}
export default withRouter(connect(mapStateToProp)(LeaderBoard));