import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import TopMenu from '../Layout/TopMenu';
import DataLoaderService from '../DataLoader/DataLoaderService';
import PhotoThumbnail from './PhotoThumbnail';
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
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: "pointer"
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

const PhotoGrid = (props) => {
    const { classes, match } = props;
    const [isLoaded, setLoaded] = useState(false);
    const [hasErrors, setErrors] = useState(false);
    const [album, setAlbum] = useState({});
    const [owner, setOwner] = useState({});
    const [photoList, setPhotoList] = useState([]);

    const itemsPerPageFromURL = NavigationHelperService.getValueFromURL(NavigationHelperService.PHOTO.ITEMS_PER_PAGE) || 20;
    const offsetFromURL = NavigationHelperService.getValueFromURL(NavigationHelperService.PHOTO.OFFSET) || 0;

    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageFromURL);
    const [offset, setOffset] = useState(offsetFromURL);

    useEffect(() => {
        loadAllData();
    }, [setErrors, setAlbum, setOwner, setPhotoList]);

    const loadAllData = () => {
        setLoaded(false);
        return loadAlbumAndUserDetails().then(loadPhotoList).finally(() => {
            setLoaded(true);
        });
    };

    const loadAlbumAndUserDetails = () => {
        return DataLoaderService.load(`${NavigationHelperService.BASE_URL}albums/${match.params.albumId}`, setErrors)
            .then(albumFromServer => {
                return DataLoaderService.load(`${NavigationHelperService.BASE_URL}users/${albumFromServer.userId}`, setErrors)
                    .then(ownerFromServer => {
                        setAlbum(albumFromServer);
                        setOwner(ownerFromServer);
                    });
            });
    };

    const loadPhotoList = () => {
        return DataLoaderService.load(`${NavigationHelperService.BASE_URL}photos?albumId=${match.params.albumId}&_start=${offset}&_limit=${itemsPerPage}`, setErrors)
            .then(photoListFromServer => {
                return setPhotoList(photoListFromServer);
            });
    };

    const renderByState = () => {
        if (!isLoaded) {
            return loading();
        }
        if (hasErrors) {
            return showErrorsLoadingAlbuns();
        }
        return renderPhotoGrid();
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

    const renderPhotoGrid = () => {
        return (
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container spacing={40}>
                    <Grid item sm={12}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                    {album.title}
                                </Typography>
                                <Typography>
                                    Owner: {owner.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>

                    {photoList.map(photo => {
                        return (
                            <PhotoThumbnail key={photo.id} photoDetails={photo} owner={owner} />
                        )
                    })}
                </Grid>
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
            <Footer type="PHOTO" />
        </React.Fragment>
    );
};

PhotoGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PhotoGrid);