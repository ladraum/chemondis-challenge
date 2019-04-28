import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import TopMenu from '../Layout/TopMenu';
import DataLoaderService from '../DataLoader/DataLoaderService';
import AlbumThumbnail from './AlbumThumbnail';

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
            width: 1100,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    errorMessage: {
        color: '#DC3545'
    }
});

const AlbumGrid = (props) => {
    const { classes } = props;
    const [isLoaded, setLoaded] = useState(false);
    const [hasErrors, setErrors] = useState(false);
    const [albumList, setAlbumList] = useState([]);

    useEffect(() => {
        DataLoaderService.load('https://jsonplaceholder.typicode.com/albums?_start=0&_limit=5', setErrors)
            .then(albumListFromServer => {
                setAlbumList(albumListFromServer);
                setLoaded(true);
            });
    }, [setErrors, setAlbumList]);

    const renderByState = () => {
        if (!isLoaded) {
            return loading();
        }
        if (hasErrors) {
            return showErrorsLoadingAlbuns();
        }
        return renderAlbumGrid();
    }

    const loading = () => {
        return (
            <div>
                <LinearProgress />
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    Loading albuns...
                </div>
            </div>
        );
    };

    const showErrorsLoadingAlbuns = () => {
        return (
            <div className={classNames(classes.layout, classes.cardGrid, classes.errorMessage)}>
                There was an error loading the albuns. Please try again.
            </div>
        );
    };

    const renderAlbumGrid = () => {
        return (
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container spacing={40}>
                    {albumList.map(albumDetails => (
                        <AlbumThumbnail key={albumDetails.id} albumDetails={albumDetails}/>
                    ))}
                </Grid>
            </div>
        );
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <TopMenu />
            <main>
                {renderByState()}
            </main>
        </React.Fragment>
    );
};

AlbumGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlbumGrid);