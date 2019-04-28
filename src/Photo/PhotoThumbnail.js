import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: "pointer"
    },
    cardMedia: {
        paddingTop: '56.25%'
    },
    cardContent: {
        flexGrow: 1
    },
    cover: {
        width: 150,
        height: 150,
        margin: "10pt auto"
    }
});

const PhotoThumbnail = (props) => {
    const { classes, photoDetails, owner } = props;

    return (
        <Grid item sm={6} md={4} lg={3}>
            <Card className={classes.card}>
                <img className={classNames(classes.cover)} src={photoDetails.thumbnailUrl} alt={photoDetails.title} />
                <CardContent className={classes.cardContent}>
                    <Typography>
                        {photoDetails.title}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

PhotoThumbnail.propTypes = {
    classes: PropTypes.object.isRequired,
    photoDetails: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired
};

export default withStyles(styles)(PhotoThumbnail);