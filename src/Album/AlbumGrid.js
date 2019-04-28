import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';

import _ from 'lodash';

import TopMenu from '../Layout/TopMenu';
import DataLoaderService from '../DataLoader/DataLoaderService';
import AlbumThumbnail from './AlbumThumbnail';
import Footer from '../Layout/Footer';
import NavigationHelperService from '../NavigationHelper/NavigationHelperService';

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
    },
    breadcrumbs: {
        padding: `${theme.spacing.unit * 2}px`,
    }
});

const AlbumGrid = (props) => {
    const { classes } = props;
    const [isLoaded, setLoaded] = useState(false);
    const [hasErrors, setErrors] = useState(false);
    const [albumList, setAlbumList] = useState([]);
    const [userList, setUserList] = useState([]);

    const itemsPerPageFromURL = NavigationHelperService.getValueFromURL(NavigationHelperService.ALBUM.ITEMS_PER_PAGE) || 20;
    const offsetFromURL = NavigationHelperService.getValueFromURL(NavigationHelperService.ALBUM.OFFSET) || 0;

    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageFromURL);
    const [offset, setOffset] = useState(offsetFromURL);

    useEffect(() => {
        loadAllData();
    }, [setErrors, setUserList, setAlbumList]);

    const loadAllData = () => {
        setLoaded(false);
        loadUserList().then(loadAlbumList).finally(() => {
            setLoaded(true);
        });
    };

    const loadUserList = () => {
        return DataLoaderService.load(`${NavigationHelperService.BASE_URL}users`, setErrors)
            .then(userListFromServer => {
                setUserList(userListFromServer);
            });
    };

    const loadAlbumList = () => {
        return DataLoaderService.load(`${NavigationHelperService.BASE_URL}albums?_start=${offset}&_limit=${itemsPerPage}`, setErrors)
            .then(albumListFromServer => {
                setAlbumList(albumListFromServer);
            });
    };

    const renderByState = () => {
        if (!isLoaded) {
            return loading();
        }
        if (hasErrors) {
            return showErrorsLoadingAlbuns();
        }
        return renderAlbumGrid();
    };

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
            <div>
                <Paper className={classes.breadcrumbs}>
                    <Breadcrumbs aria-label="Breadcrumb">
                        <Typography color="textPrimary">Albuns</Typography>
                    </Breadcrumbs>
                </Paper>
                <div className={classNames(classes.layout, classes.cardGrid)}>
                    <Grid container spacing={40}>
                        {albumList.map(albumDetails => {
                            const owner = _.find(userList, ['id', albumDetails.userId]);
                            return (
                                <AlbumThumbnail key={albumDetails.id} albumDetails={albumDetails} owner={owner} />
                            )
                        })}
                    </Grid>
                </div>
            </div>
        );
    };

    if (itemsPerPage !== itemsPerPageFromURL) {
        setItemsPerPage(itemsPerPageFromURL);
        loadAllData();
    }

    if (offset !== offsetFromURL) {
        setOffset(offsetFromURL);
        loadAllData();
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <TopMenu />
            <main>
                {renderByState()}
            </main>
            <Footer type="ALBUM" />
        </React.Fragment>
    );
};

AlbumGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlbumGrid);