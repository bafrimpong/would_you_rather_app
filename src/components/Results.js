import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';

import { Card, CardActionArea, CardContent, Rating, Typography } from '@mui/material';
import { Redirect } from 'react-router';

class Results extends Component {
    constructor(props){
        super(props);
        this.getTotalVotes = this.getTotalVotes.bind(this);
        this.getPercentage = this.getPercentage.bind(this);
        this.getObjectLength = this.getObjectLength.bind(this);
        this.backToDashboard = this.backToDashboard.bind(this);
    }

    /**
     * Adds the length of `textOne.votes.length` and `_textTwo.votes.length` and returns its value
     * @param {*} _textOne an object for questionOne
     * @param {*} _textTwo an object for questionTwo
     * @returns an integer
     */
    getTotalVotes(_textOne, _textTwo) {
        const _total = _textOne.votes.length + _textTwo.votes.length;
        return _total;
    }

    /**
     * Calculates for a percentage value based on the two values `_valueOne` and `_totalVotes`
     * and returns a fixed integer value
     * @param {*} _valueOne 
     * @param {*} _totalVotes 
     * @returns an integer
     */
    getPercentage(_valueOne, _totalVotes){
        const _result = ((_valueOne.votes.length / _totalVotes) * 100).toFixed(0);
        return _result;
    }

    /**
     * Gets the length of an object and returns it
     * @param {*} _object 
     * @returns an integer
     */
    getObjectLength(_object){
        return _object.votes.length;
    }

    /**
     * Sets the current app path to the root or dashboard path
     * @returns a redirection to the root path
     */
    backToDashboard(){
        return <Redirect to='/' />
    }

    render() {

        const { question } = this.props;
        const { optionOne, optionTwo } = question;

        const _totalVotes = this.getTotalVotes(optionOne, optionTwo);

        return (
            <Fragment>
                <CardActionArea  >
                    <Card sx={{ display: 'flex' }}>
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                                {optionOne.text}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {`${this.getObjectLength(optionOne)} of ${_totalVotes} votes`}
                            </Typography>
                            <Rating name="optionOne" 
                                defaultValue={this.getPercentage(optionOne, _totalVotes)/10} 
                                precision={0.5}
                                max={10}
                                size={'large'} readOnly /> &nbsp;&nbsp;
                            <span style={{ fontSize: '1.5em', color: 'red'}}>
                                {`${this.getPercentage(optionOne, _totalVotes)} %`}
                            </span>
                        </CardContent>
                    </Card>
                </CardActionArea>
                <Typography color="danger" align="center" component='h1' style={{ color: 'green' }} variant='h4'>OR</Typography>
                <CardActionArea  >
                    <Card sx={{ display: 'flex' }} >
                        <CardContent sx={{ flex: 1 }}>
                            <Typography component="h2" variant="h5">
                                {optionTwo.text}
                            </Typography>
                            <Typography variant="subtitle1" color="text.secondary">
                                {`${this.getObjectLength(optionTwo)} of ${_totalVotes} votes`}
                            </Typography>
                            <Rating name="optionTwo" 
                                defaultValue={this.getPercentage(optionTwo, _totalVotes)/10}
                                precision={0.5}
                                max={10}
                                size={'large'} readOnly />&nbsp;&nbsp;
                            <span style={{ fontSize: '1.5em', color: 'red'}}>
                                {`${this.getPercentage(optionTwo, _totalVotes)} %`}
                            </span>
                        </CardContent>
                    </Card>
                </CardActionArea>
            </Fragment>
        )
    }
}

export default connect()(Results);