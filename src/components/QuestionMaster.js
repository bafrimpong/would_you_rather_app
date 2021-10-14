import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Results from './Results';
import Answers from './Answers';

// mui imports
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Button, Container, Grid, Paper } from '@mui/material';
import { Redirect } from 'react-router';
import { Box } from '@mui/system';
import { Divider } from '@mui/material';

class QuestionMaster extends Component {

    /**
     * Checks if a question has been answered or not and returns true for answered question and
     * false for unanswered question
     * @param {*} _currentUser 
     * @param {*} _users 
     * @param {*} _question 
     * @returns a boolean
     */
    getAnsweredQuestions = (_currentUser, _users, _question) => {
        return Object.keys(_users[_currentUser].answers).includes(_question.id)
    }

    render() {
        // destructure object
        const { authenticatedUser, users, question } = this.props;

        if ((this.props.question === undefined) || (this.props.question === null)) {
            return <Redirect to={'/'} />
        }

        const isQuestionAnswered = this.getAnsweredQuestions(authenticatedUser, users, question)

        return (
            <Fragment>
                <Typography component="h1" variant="h3" color="primary" align="center" >
                    {isQuestionAnswered === true ? 'Question is Answered' : 'Question is Not Answered'}
                </Typography>

                <Box
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        '& > :not(style)': {
                            m: 1,
                            width: '100%',
                            height: 'inherit',
                        },
                    }}
                >
                    <Paper elevation={3} >
                        <Container sx={{ py: 2 }} maxWidth="md">
                            <Grid item key={users[question.author].id} xs={12} sm={4} md={6}>
                                <Avatar alt={users[question.author].name}
                                    src={users[question.author].avatarURL} />
                            </Grid>
                            <Grid item key={1} xs={12} sm={8} md={6}>
                                <Typography component="h5" variant="h6" color="secondary" align="left" >
                                    Would you rather...
                                </Typography>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {isQuestionAnswered !== true ? 'Asked by' : 'Answered by'}
                                </Typography>&nbsp;&nbsp; <span style={{ color: 'green', fonWeight: 'bold', fontSize: '1.2em', marginBottom: '1em', fontWeight: 'bold' }}>{users[question.author].name}</span>
                                <Divider />
                                {
                                    isQuestionAnswered ? (
                                        <Results
                                            question={question}
                                            author={users[question.author]}
                                            authenticatedUser={authenticatedUser}
                                            avatarURL={users[question.author].avatarURL} />
                                    )
                                        :
                                        (<Answers
                                            question={question}
                                            author={users[question.author]} />
                                        )
                                }
                                &nbsp;&nbsp;&nbsp;
                                <Link style={{ cursor: 'pointer', textDecoration: 'none' }} to={'/'}>
                                    <Button variant='outlined'>
                                        Back to Dashboard
                                    </Button> 
                                </Link>
                            </Grid>
                        </Container>
                    </Paper>
                </Box>
            </Fragment >
        );
    }
}


function mapStateToProps({ authenticatedUser, users, questions }, props) {
    return {
        authenticatedUser: authenticatedUser,
        users: users,
        question: questions[props.match.params.id]
    }
}
export default connect(mapStateToProps)(QuestionMaster);