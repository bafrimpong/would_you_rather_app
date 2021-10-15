import { Button, Divider, Typography } from '@mui/material';
import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom';

class PageNotFound extends Component {
    render() {
        return (
            <Fragment>
                <Typography component="h1" variant="h1" color="primary" align="center" >
                    Error 404
                </Typography>
                <br />
                <Typography align="center" component="h4">
                    Sorry the requested page is not found!
                </Typography>
                <br />
                <Typography align="center">
                    <Link
                        to={`/login`}
                        style={{ textDecoration: 'none' }}>
                        <Button
                            variant="contained">
                            Go Back
                        </Button>
                    </Link>
                </Typography>
            </Fragment>
        );
    }
}

export default PageNotFound;