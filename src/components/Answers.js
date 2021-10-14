import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleAddAnswer } from '../actions/shared';

import { Button, Divider, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { pink, green, red } from '@mui/material/colors';

class Answer extends Component {
    state = {
        selectedQuestionOption: "",
    }

    /**
     * Sets the state of `selectedQuestionOption` from the questions
     * dropdown list
     * @param {*} event the intput or jsx element
     */
    handleSelectedQuestion(event) {
        if (event.target.value !== "" || event.target.value !== null) {
            this.setState(() => ({
                selectedQuestionOption: event.target.value.toString()
            }))
        }
    }


    /**
     * Submits a form which contains the selected option from the
     * dropdown list of items
     * @param {*} event 
     * @returns 
     */
    handleSubmitAnswer(event) {
        event.preventDefault();

        const { dispatch, question } = this.props;

        if (this.state.selectedQuestionOption === "") {
            event.preventDefault()
            return;
        } else {
            dispatch(handleAddAnswer(question.id, this.state.selectedQuestionOption))
        }
    }

    render() {
        return (
            <Fragment>
                <Divider />
                <RadioGroup
                    aria-label="question"
                    name="questionOptions"
                    value={this.state.selectedQuestionOption}
                    onChange={this.handleSelectedQuestion.bind(this)}
                    sx={{
                        color: red[800],
                        '&.Mui-checked': {
                            color: red[600],
                        },
                    }}
                >
                    <FormControlLabel
                        value="optionOne"
                        control={<Radio />}
                        label={this.props.question.optionOne.text}
                        sx={{
                            color: pink[800],
                            '&.Mui-checked': {
                                color: pink[600],
                            },
                        }} />
                    <Typography component='h4' variant='h5' align='center' >OR</Typography>
                    <FormControlLabel
                        value="optionTwo"
                        control={<Radio />}
                        label={this.props.question.optionTwo.text}
                        sx={{
                            color: green[800],
                            '&.Mui-checked': {
                                color: green[600],
                            },
                        }} />
                </RadioGroup>
                <Divider />
                <Button type="submit" onClick={this.handleSubmitAnswer.bind(this)} variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Submit Answer
                </Button>
            </Fragment>
        )
    }
}

export default connect()(Answer);