import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

import TopMenu from '../Layout/TopMenu';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

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
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
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

    const renderByState = () => {
        if (!isLoaded) {
            return loading();
        }
        if (!hasErrors) {
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
                    {cards.map(card => (
                        <Grid item key={card} sm={6} md={4} lg={3}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Heading
                                    </Typography>
                                    <Typography>
                                        This is a media card. You can use this section to describe the content.
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
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