import React, { Component, Fragment } from 'react';
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import DashboardAppBar from './DashboardAppBar';
import { setAuthenticatedUser } from '../actions/authenticatedUser';

// mui import
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SidebarNav from './SidebarNav';
import CopyRightSection from './CopyRightSection';
import UserProfile from './UserProfile';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Button } from '@mui/material';

const drawerWidth = 240;
const mdTheme = createTheme();
class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            open: true,
            expanded: false
        }

        this.computeObjectLength = this.computeObjectLength.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this)
        this.isQuestionAnswered = true;
    }

    /**
     * Expans and/or Contracts the accordion component or element used in display the 
     * answered and unsanswered questions
     * @param {*} panelName 
     * @returns a boolean
     */
    handleExpandContractAccordion = (panelName) => (event, isExpanded) => {
        this.setState(() => ({
            expanded: isExpanded ? panelName : false
        }))
    }

    /**
     * 
     * @param {*} currentUser 
     * @returns 
     */
    redirectToSigninPage = (currentUser) => {
        if (currentUser === "" || currentUser === null) {
            return (
                this.props.history.push('/login')
            )
        }
    }

    /**
     * Renders a jsx of accordion
     * @param {String} _accordionTitle title for the accordion panel
     * @param {String} _panelName name of the accordion
     * @param {*} _dataSource source of data (answered or unanswered)
     * @param {*} _questions all questions in the database
     * @param {*} _users all users in the databse
     * @returns returns a jsx
     */
    renderAccordion = (_accordionTitle, _panelName, _dataSource, _questions, _users) => {
        const _accordion = <Accordion expanded={this.state.expanded === `${_panelName}`} onChange={this.handleExpandContractAccordion(`${_panelName}`)}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
            >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    {_accordionTitle}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>click to view</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
                    <Fragment >
                        {_dataSource !== null ? this.displayJSXWithData(_dataSource, _questions, _users) : null}
                        <Divider variant="inset" component="li" />
                    </Fragment>
                </List>
            </AccordionDetails>
        </Accordion>
        return _accordion;
    }

    /**
     * Display a JSX with answered or unanswered questions when passed the 
     * appropriate data (questions of answered or unanswered) for display
     * @param {*} _data source of data (answered or unansered)
     * @param {*} _questions all questions in the database
     * @param {*} _users all users in the databse
     * @returns a jsx of list items
     */
    displayJSXWithData = (_data, _questions, _users) => {
        return _data.map((_value) => (
            <ListItem key={_questions[_value].id} alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar alt={_users[_questions[_value].author].id}
                        src={_users[_questions[_value].author].avatarURL} />
                </ListItemAvatar>
                <Typography>Would you rather</Typography>
                <ListItemText
                    primary={`...${_questions[_value].optionOne.text}?`}
                    secondary={
                        <Fragment>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                Asked By
                            </Typography>
                            {` - ${_users[_questions[_value].author].name}`}
                        </Fragment>
                    }
                />
                <Link
                    to={`/question/${_questions[_value].id}`}
                    style={{ textDecoration: 'none' }}
                >
                    <Button variant="outlined">{this.isQuestionAnswered === true ? 'View Answer' : 'Submit Answer'}</Button>
                </Link>

            </ListItem>
        ))
    }

    /**
     * Calculates the length of an object `literal objects` and returns their length
     * @param {*} _object 
     * @returns integer
     */
    computeObjectLength(_object) {
        let _length = 0;
        if (typeof(Object.keys(_object)) !== 'undefined' || _object !== null) {
            _length = Object.keys(_object).length
        }
        return _length;
    }

    /**
  * Logs or signs out a user and redirect to the signin page
  */
    handleLogOut = () => {
        this.props.dispatch(setAuthenticatedUser(""))
        this.props.history.push('/login')
    }

    render() {
        const { open } = this.state;
        const { questions, users, authenticatedUser, answeredQuestions, unansweredQuestions } = this.props;
        let _answeredQuestions, _unansweredQuestions = null;
        _answeredQuestions = answeredQuestions;
        _unansweredQuestions = unansweredQuestions;

        console.log("DASHBOARD PROPS", this.props)

        // redirect to sign-in page if user is not logged-in
        this.redirectToSigninPage(authenticatedUser);

        const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
            ({ theme, open }) => ({
                '& .MuiDrawer-paper': {
                    position: 'relative',
                    whiteSpace: 'nowrap',
                    width: drawerWidth,
                    transition: theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.enteringScreen,
                    }),
                    boxSizing: 'border-box',
                    ...(!open && {
                        overflowX: 'hidden',
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.leavingScreen,
                        }),
                        width: theme.spacing(7),
                        [theme.breakpoints.up('sm')]: {
                            width: theme.spacing(9),
                        },
                    }),
                },
            }),
        );

        return (
            <ThemeProvider theme={mdTheme}>
                <DashboardAppBar
                    answered={this.computeObjectLength(this.props.answeredQuestions)}
                    unanswered={this.computeObjectLength(this.props.unansweredQuestions)}
                    handleLogOut={this.handleLogOut} />
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <Drawer variant="permanent" open={open}>
                        <SidebarNav handleLogOut={this.handleLogOut} />
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8} lg={8}>
                                    <Paper
                                        sx={{
                                            p: 2, display: 'flex', flexDirection: 'column', height: 240,
                                        }}
                                    >
                                        <Typography component="h3" variant="h6" color="primary" gutterBottom>
                                            Brief System Overview
                                        </Typography>
                                        <Typography>Total Answered Questions&nbsp;&nbsp;{this.computeObjectLength(this.props.answeredQuestions)}</Typography>
                                        <Typography>Total Unanswered Questions&nbsp;&nbsp;{this.computeObjectLength(this.props.unansweredQuestions)}</Typography>
                                        <Divider />
                                        <Typography>Total Questions&nbsp;&nbsp;{this.computeObjectLength(this.props.questions)}</Typography>
                                    </Paper>
                                </Grid>

                                {/* user profile */}
                                <Grid item xs={12} md={4} lg={4}>
                                    <Paper
                                        sx={{
                                            p: 2, display: 'flex', flexDirection: 'column', height: 240,
                                        }}
                                    >
                                        <UserProfile handleLogOut={this.handleLogOut} />
                                    </Paper>
                                </Grid>

                                <Grid item xs={12}>
                                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        {/* ACCORDION FOR ANSWERED QUESTIONS */}
                                        {this.isQuestionAnswered = true}
                                        {
                                            this.renderAccordion("ANSWERED QUESTIONS", 'panel1', _answeredQuestions,
                                                questions, users)
                                        }

                                        {/* ACCORDION FOR UNANSWERED QUESTIONS */}
                                        {this.isQuestionAnswered = false}
                                        {
                                            this.renderAccordion("UN-ANSWERED QUESTIONS", 'panel2', _unansweredQuestions,
                                                questions, users)
                                        }
                                    </Paper>
                                </Grid>
                            </Grid>
                            <CopyRightSection sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        );
    }
}

function mapStateToProp({ authenticatedUser, users, questions }) {
    // sort out the questions based on thier timestamp
    const sortedQuestions = (i, j) => {
        const a = new Date(questions[j].timestamp).getDate();
        const b = new Date(questions[i].timestamp).getDate();

        return (a - b)
    }

    // check for valid user and set their respect answered and unanswered questions
    let _answeredQuestions, _unansweredQuestions = null;
    if ((authenticatedUser !== null) && (authenticatedUser !== '')) {
        _answeredQuestions = Object.keys(users[authenticatedUser].answers).sort(sortedQuestions)
        _unansweredQuestions = Object.keys(Object.assign({}, questions)).sort(sortedQuestions)

        _answeredQuestions.map((_answer) =>
            _unansweredQuestions = _unansweredQuestions.filter((_unanswered) => _answer !== _unanswered)
        )
    }

    // return the objects
    return {
        authenticatedUser: authenticatedUser,
        users: users,
        questions: questions,
        unansweredQuestions: _unansweredQuestions,
        answeredQuestions: _answeredQuestions,
    }
}

export default withRouter(connect(mapStateToProp)(Dashboard));