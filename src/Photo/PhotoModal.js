import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    modalBody: {
        top: "25%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        outline: 'none',
    },
});


const PhotoModal = (props) => {
    const { classes, modalDetails, closeModal } = props;
    const details = modalDetails || {};
    const albumTitle = details.album ? details.album.title : '';
    const ownerName = details.owner ? details.owner.name : '';
    const photoTitle = details.photo ? details.photo.title : '';
    const photoUrl = details.photo ? details.photo.url : '';
    const isOpen = details.isOpen;

    return (
        <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={isOpen}
            onClose={closeModal}
            style={{ alignItems: 'center', justifyContent: 'center' }}
        >
            <div className={classNames(classes.modalBody)}>
                <Typography variant="h4" id="modal-title">
                    Album: {albumTitle}
                </Typography>
                <Typography variant="h5" id="modal-title">
                    Owner: {ownerName}
                </Typography>
                <Typography variant="h6" id="modal-title">
                    Photo: {photoTitle}
                </Typography>
                <img src={photoUrl} alt={photoTitle} />
                <Typography align="right">
                    <Button variant="contained" color="primary" onClick={closeModal}> Close </Button>
                </Typography>
            </div>
        </Modal>
    );
};

PhotoModal.propTypes = {
    classes: PropTypes.object.isRequired,
    modalDetails: PropTypes.object.isRequired,
    closeModal: PropTypes.func.isRequired
};

export default withStyles(styles)(PhotoModal);