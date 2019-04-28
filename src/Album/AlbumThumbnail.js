import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    cardMedia: {
        paddingTop: '56.25%'
    },
    cardContent: {
        flexGrow: 1
    }
});

const AlbumThumbnail = (props) => {
    const { classes, albumDetails } = props;

    console.log('albumDetails', albumDetails)

    return (
        <Grid item sm={6} md={4} lg={3}>
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
    );
};

AlbumThumbnail.propTypes = {
    classes: PropTypes.object.isRequired,
    albumDetails: PropTypes.object.isRequired
};

export default withStyles(styles)(AlbumThumbnail);