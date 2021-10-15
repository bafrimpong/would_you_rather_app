import React, { Component } from 'react'
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/shared';

// mui imports
import { Box } from '@mui/system';
import Paper from '@mui/material/Paper';
import { Avatar, Button, CssBaseline, Divider, FormControl, Grid, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

const theme = createTheme();
class AddNewQuestion extends Component {
    state = {
        optionOneText: "",
        optionTwoText: "",
        goToDashboard: false,
    }

    /**
     * Handels and execute a method to add a question and expects two values to be
     * as parameters to work
     * @param {*} _textOne question one
     * @param {*} _textTwo question two
     */
    handleExecuteAddQuestion = (_textOne, _textTwo) => {
        this.props.addQuestion(_textOne, _textTwo);
    }

    /**
     * Sets state of a defined state object based on the target name and value
     * @param {*} event the target input
     */
    handleTextBoxChange = (event) => {
        this.setState(() => ({
            [event.target.name]: event.target.value
        }))
    }

    /**
     * Submits the form contents to be added to the database
     * @param {*} event the target element
     */
    handleSubmitQuestion = (event) => {
        event.preventDefault();

        const { optionOneText, optionTwoText } = this.state

        if (optionOneText === "" || optionTwoText === "") {
            event.preventDefault();
            return;
        };

        this.handleExecuteAddQuestion(optionOneText, optionTwoText);

        // set the state of goToDashboard to true
        this.setState(() => ({
            goToDashboard: true
        }))

    }

    render() {
        const { optionOneText, optionTwoText } = this.state;

        // redirect to dashboard if question is saved
        if (this.state.goToDashboard === true) {
            // this.props.history.push('/')
            return <Redirect to={'/'} />
        }

        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" sx={{ height: '100vh' }}>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={3}
                        md={5}
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)',
                            backgroundRepeat: 'no-repeat',
                            backgroundColor: (t) =>
                                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    />
                    <Grid item xs={12} sm={9} md={7} component={Paper} elevation={6} square>
                        <Typography component="h1" variant="h4" color="primary" align="center" >
                            Add New Question
                        </Typography>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} src={this.props.avatarURL}>
                                {/* <LockOutlinedIcon /> */}
                            </Avatar>
                            <Typography component="h1" variant="h5" gutterBottom>
                                {this.props.authenticatedUserFullname}
                            </Typography>
                            <FormControl component='form' validate='true' onSubmit={this.handleSubmitQuestion} sx={{ mt: 1 }} id='addQuestion-form'>
                                <Divider />
                                <Typography component='h4' variant='h5' align="center"
                                >Would You Rather</Typography>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="optionOneText"
                                    label="Question One"
                                    name="optionOneText"
                                    placeholder="Enter Question one"
                                    autoFocus
                                    value={optionOneText}
                                    onChange={this.handleTextBoxChange}
                                />

                                <Typography color="danger" align="center" component='h1' variant='h4'>OR</Typography>

                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="optionTwoText"
                                    label="Question Two"
                                    placeholder="Enter Question two"
                                    name="optionTwoText"
                                    value={optionTwoText}
                                    onChange={this.handleTextBoxChange}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Save Question
                                </Button>
                                <Link to={`/`} style={{ textDecoration: 'none' }}
                                >
                                    <Button variant="outlined">Cancel</Button>
                                </Link>
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
        authenticatedUserFullname: users[authenticatedUser].name,
        avatarURL: users[authenticatedUser].avatarURL
    }
}

function mapDispatchAction(dispatch) {
    return {
        addQuestion: (_qOne, _qTwo) => dispatch(handleAddQuestion(_qOne, _qTwo))
    }
}

export default connect(mapStateToProps, mapDispatchAction)(AddNewQuestion);