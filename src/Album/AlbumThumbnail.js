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
        flexDirection: 'column'
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

const AlbumThumbnail = (props) => {
    const { classes, albumDetails, owner } = props;

    const getColorFromUserName = (str) => {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    };

    let color = getColorFromUserName(owner.name);

    return (
        <Grid item sm={6} md={4} lg={3}>
            <Card className={classes.card}>
                <img className={classNames(classes.cover)} src={`https://via.placeholder.com/150/${color}`} alt={albumDetails.title} />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                        {albumDetails.title}
                    </Typography>
                    <Typography>
                        Owner: {owner.name}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

AlbumThumbnail.propTypes = {
    classes: PropTypes.object.isRequired,
    albumDetails: PropTypes.object.isRequired,
    owner: PropTypes.object.isRequired
};

export default withStyles(styles)(AlbumThumbnail);