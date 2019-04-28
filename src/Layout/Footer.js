import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';
import NavigationHelperService from '../NavigationHelper/NavigationHelperService';
import Pagination from "material-ui-flat-pagination";

const ITEMS_PER_PAGE_PARAM = 'itemsPerPage';
const OFFSET_PARAM = 'offset';
const NUMBER_OF_ALBUNS = 100;

const styles = theme => ({
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing.unit * 3,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
    }
});

function Footer(props) {
    const { classes } = props;
    const itemsPerPageFromURL = NavigationHelperService.getValueFromURL(ITEMS_PER_PAGE_PARAM) || 20;
    const offsetFromURL = NavigationHelperService.getValueFromURL(OFFSET_PARAM) || 0;

    const [itemsPerPage, setItemsPerPage] = useState(itemsPerPageFromURL);
    const [offset, setOffset] = useState(offsetFromURL);

    if (itemsPerPage !== itemsPerPageFromURL) {
        setItemsPerPage(itemsPerPageFromURL);
    }

    if (offset !== offsetFromURL) {
        setOffset(offsetFromURL);
    }

    const updateItemsPerPage = (event) => {
        let newItemsPerPage = event.target.value;
        setItemsPerPage(newItemsPerPage);
        NavigationHelperService.applyParamToURL(ITEMS_PER_PAGE_PARAM, newItemsPerPage);
    };

    const updateSelectedPage = (event, newOffset) => {
        setOffset(newOffset);
        NavigationHelperService.applyParamToURL(OFFSET_PARAM, newOffset);
    };

    return (
        <footer className={classes.footer}>
            <Grid container>
                <Grid item sm={12} md={10}>
                    <Pagination
                        limit={itemsPerPage}
                        offset={offset}
                        total={NUMBER_OF_ALBUNS}
                        onClick={updateSelectedPage}
                    />
                </Grid>
                <Grid item sm={12} md={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-helper">Items per page</InputLabel>
                        <NativeSelect
                            value={itemsPerPage}
                            onChange={updateItemsPerPage}
                            input={<Input name="age" id="age-native-helper" />}
                        >
                            <option value={20}>20</option>
                            <option value={30}>30</option>
                            <option value={50}>50</option>
                        </NativeSelect>
                    </FormControl>
                </Grid>
            </Grid>
        </footer>
    );
}

Footer.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);