import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import Input from '@material-ui/core/Input';

const PATH_PARAM = 'itemsPerPage';

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
    
    const [itemsPerPage, setItemsPerPage] = useState(20);

    return (
        <footer className={classes.footer}>
            <Grid container>
                <Grid item sm={12} md={10}>
                    PAGINATION
                </Grid>
                <Grid item sm={12} md={2}>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="age-native-helper">Items per page</InputLabel>
                        <NativeSelect
                            value={itemsPerPage}
                            onChange={event => setItemsPerPage(event.target.value)}
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