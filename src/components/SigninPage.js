import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setAuthenticatedUser } from '../actions/authenticatedUser';

// material ui imports
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { HorizontalRule } from '@mui/icons-material';
import CopyRightSection from './CopyRightSection';

const theme = createTheme();

class SigninPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedUser: ""
        }

        this.previousPath = null;
        this.handleSelectUser = this.handleSelectUser.bind(this)
        this.handleOnFormSubmit = this.handleOnFormSubmit.bind(this)
    }


    /**
     * Switches or changes the values of the previous selected username to a the new username value
     * @param {*} event the event of the action being taken
     */
    handleSelectUser = (event) => {
        if (event.target.value !== "" || event.target.value !== null) {
            this.setState({
                selectedUser: event.target.value
            })
        }
    }


    /**
     * Submits the sigin-in form and perform login validations
     * @param {*} event the event of the action being taken
     */
    handleOnFormSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(document.getElementById('signin-form'));
        console.log({
            username: data.get('username'),
            myName: this.state.selectedUser
        });

        // const { selectedUser } = this.state
        this.props.dispatch(setAuthenticatedUser(data.get('username')))

        // set the previous routing path
        if (this.props.location.state !== undefined) {
            this.previousPath = this.props.location.state.previous.pathname
        } else {
            this.previousPath = null;
        }

        // check if previous or old router path existing
        // and push it to the history or set it to the root path
        if (this.previousPath) {
            this.props.history.push(this.previousPath);
        } else {
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography component='h1' variant='h4'>Would U Rapther?</Typography>
                            <HorizontalRule />
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign in
                            </Typography>

                            <FormControl component='form' validate='true' onSubmit={this.handleOnFormSubmit} sx={{ mt: 1 }} id='signin-form'>
                                <InputLabel id="username-label">Username</InputLabel>
                                <Select
                                    labelId='username-label'
                                    required
                                    fullWidth
                                    id="username"
                                    defaultValue={this.state.selectedUSer}
                                    value={this.state.selectedUser}
                                    label="Username"
                                    name='username'
                                    onChange={this.handleSelectUser}>

                                    {this.props.users.map(user => (
                                        <MenuItem key={user.id} id={user.id} value={user.id}>{user.name}</MenuItem>
                                    ))}
                                </Select>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>
                                <Grid container>
                                    <Grid item>
                                        <Link href="#" variant="body2">
                                            {"Don't have an account? Sign Up"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <CopyRightSection sx={{ mt: 5 }} />
                            </FormControl>
                        </Box>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

function mapStateToProps({ authenticatedUser, users }) {
    return {
        users: Object.values(users),
        authenticatedUser: authenticatedUser
    }
}
export default withRouter(connect(mapStateToProps)(SigninPage));