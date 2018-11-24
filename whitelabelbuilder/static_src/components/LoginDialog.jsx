/* eslint-disable react/no-multi-comp */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import blue from '@material-ui/core/colors/blue';
import vkLogo from '../../static/vk_icon.svg';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";

const methods = [
    {name: 'Войти через ВКонтакте', logo: vkLogo, url: '/social/login/vk-oauth2/'},
];
const styles = {
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

class SimpleDialog extends React.Component {
    handleClose = () => {
        this.props.onClose(this.props.selectedValue);
    };

    handleListItemClick = (value) => {
        this.props.onClose(value);
    };

    render() {
        const {
            classes, onClose, selectedValue, ...other
        } = this.props;
        const i = 0;
        return (
            <Dialog onClose={this.handleClose} aria-labelledby="simple-dialog-title" {...other}>
                <DialogTitle id="simple-dialog-title">Логин</DialogTitle>
                <div>
                    <List>
                        {methods.map(method => (
                            <Button key={method.name} href="/social/login/vk-oauth2/">
                                <ListItem
                                    button
                                    onClick={() => this.handleListItemClick(method)}
                                >
                                    <ListItemAvatar>
                                        <Avatar src={method.logo}/>
                                    </ListItemAvatar>
                                    <ListItemText primary={method.name}/>
                                </ListItem>
                            </Button>
                        ))}
                    </List>
                </div>
            </Dialog>
        );
    }
}

SimpleDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    selectedValue: PropTypes.string,
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component {
    state = {
        open: false,
        selectedValue: methods[1],
    };

    handleClickOpen = () => {
        this.setState({
            open: true,
        });
    };

    handleClose = (value) => {
        this.setState({open: false});
    };

    render() {
        const isLoggedIn = this.props.is_authenticated;

        return (
            <div>
                {isLoggedIn ? (
                    <Button
                        href="/accounts/logout"
                        color="inherit"
                    >Выйти
                    </Button>
                ) : (<div>
                        <Button
                            onClick={this.handleClickOpen}
                            color="inherit"
                        >Войти
                        </Button>
                        < SimpleDialogWrapped
                            selectedValue={this.state.selectedValue}
                            open={this.state.open}
                            onClose={this.handleClose}
                        />
                    </div>
                )}

            </div>
        );
    }
}

const mapStateToProps = ({users}) => ({
    is_authenticated: users.isAuthenticated,
});

export default connect(mapStateToProps)(SimpleDialogDemo);
