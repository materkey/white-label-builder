import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles/index';
import apiUrls from '../constants/apiUrls';
import { bindActionCreators } from 'redux';
import { createTask } from '../actions/tasks';
import { loadCurrentUser } from '../actions/users';
import PropTypes from 'prop-types';
import { Material } from 'react-color';
import SketchExample from './ColorPicker';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#F6F6F6',
            main: '#0EC645',
            dark: '#218126',
            contrastText: '#fff',
        },
    },
});

const styles = theme => ({
    button: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
    },
    label: {
        paddingTop: '16px',
        paddingBottom: '8px',
    },
});

class FormDialog extends React.Component {
    static propTypes = {
        current_user_id: PropTypes.number,
        loadCurrentUser: PropTypes.func,
    };
    static defaultProps = {
        current_user_id: null,
    };
    state = {
        open: false,
        isLoading: false,
        title: 'Новое приложение',
        service_id: '',
        isServiceIdError: false,
        errorText: '',
        primary_color: '#0373FF',
        about_us: 'Мы создаем для вас лучшие блюда из продуктов, выращенных и собранных с любовью и заботой, на фермерских хозяйствах русской земли. Лучшие ингредиенты - это ключ к созданию красивых, оригинальных и вкусных блюд.',
        vk: 'https://vk.com/deliveryclub',
        instagram: 'https://www.instagram.com/delivery_club',
        facebook: 'https://www.facebook.com/DeliveryClub.ru/',
        site: 'delivery-club.ru',

    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };
    handleClose = () => {
        this.setState({ open: false });
    };
    //   }
    handleTitle = (e) => {
        this.setState({
            title: e.target.value,
        });
    };

    handleServiceId = (e) => {
        this.setState({
            service_id: e.target.value,
        });
    };
    handlePrimaryColor = (color) => {
        this.setState({
            primary_color: color.hex,
        });
    };
    handleAboutUs = (e) => {
        this.setState({
            about_us: e.target.value,
        });
    };
    handleVK = (e) => {
        this.setState({
            vk: e.target.value,
        });
    };
    handleInstagram = (e) => {
        this.setState({
            instagram: e.target.value,
        });
    };
    handleFecebook = (e) => {
        this.setState({
            facebook: e.target.value,
        });
    };
    handleSite = (e) => {
        this.setState({
            site: e.target.value,
        });
    };
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.isLoading) {
            return;
        }
        if (!this.props.current_user_id || this.props.current_user_id === null) {
            this.props.loadCurrentUser(apiUrls.currentUser);
        }
        this.setState({ isLoading: true });
        const newTask = {
            title: this.state.title,
            service_id: this.state.service_id,
            primary_color: this.state.primary_color,
            about_us: this.state.about_us,
            vk: this.state.vk,
            instagram: this.state.instagram,
            facebook: this.state.facebook,
            site: this.state.site,
            author: '1',
        };
        const csrfToken = this.getCookie('csrftoken');
        fetch(apiUrls.task, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(newTask),
            headers: {
                'content-type': 'application/json',
                'X-CSRFToken': csrfToken,
            },
        }).then((response) => {
            if (response.ok) {
                this.handleClose();
                return response.json();
            }
            throw new Error('Network response was not ok.');
        }).then((json) => {
            this.setState({ isLoading: false });
            return this.props.createTask(json);
        }).catch((error) => {
            this.setState({ isLoading: false });
            // if (error.service_id != null) {
            //     this.setState({ isServiceIdError: true });
            //     this.setState({ errorText: error.service_id });
            // }
            console.log(`There has been a problem with your fetch operation: ${error.message}`);
        });
    };

    getCookie(name) {
        if (!document.cookie) {
            return null;
        }

        const xsrfCookies = document.cookie.split(';')
            .map(c => c.trim())
            .filter(c => c.startsWith(`${name}=`));

        if (xsrfCookies.length === 0) {
            return null;
        }

        return decodeURIComponent(xsrfCookies[0].split('=')[1]);
    }

    render() {

        return (
            <div>
                {/* <Button onClick={ this.handleClickOpen }>Open form dialog</Button> */}
                <MuiThemeProvider theme={theme}>
                    <Button
                        onClick={this.handleClickOpen}
                        variant="fab"
                        color="primary"
                        aria-label="add"
                        className={this.props.classes.button}
                    >
                        <AddIcon />
                    </Button>
                </MuiThemeProvider>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                    scroll='body'
                >

                    <DialogTitle id="form-dialog-title">Создание приложения для ресторана</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Заполните форму создания приложения для ресторана.
                        </DialogContentText>
                        <form id="createTaskForm" onSubmit={this.handleSubmit}>
                            {/* <DjangoCSRFToken/> */}
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Название"
                                type="title"
                                value={this.state.title}
                                onChange={this.handleTitle}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                error={ this.state.isServiceIdError }
                                helperText={ this.state.errorText }
                                label="Идентификатор ресторана"
                                type="service_id"
                                value={ this.state.service_id }
                                onChange={ this.handleServiceId }
                                fullWidth
                            />
                            <Typography
                            className={this.props.classes.label}
                            >Основной цвет
                            </Typography>
                            <SketchExample callback={this.handlePrimaryColor} />
                            <TextField
                                id="name"
                                multiline
                                label="О ресторане"
                                value={this.state.about_us}
                                onChange={this.handleAboutUs}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                label="Ссылка на VK"
                                value={this.state.vk}
                                onChange={this.handleVK}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                label="Ссылка на Instagram"
                                value={this.state.instagram}
                                onChange={this.handleInstagram}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                label="Ссылка на Facebook"
                                value={this.state.facebook}
                                onChange={this.handleFecebook}
                                fullWidth
                            />
                            <TextField
                                margin="dense"
                                id="name"
                                label="Сайт"
                                value={this.state.site}
                                onChange={this.handleSite}
                                fullWidth
                            />                                                                                                                                         
                        </form>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Отмена
                        </Button>
                        <Button type="submit" form="createTaskForm" onClick={this.handleSubmit} color="primary">
                            Создать
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => bindActionCreators({ createTask, loadCurrentUser }, dispatch);

const mapStateToProps = ({ users }) => ({
    current_user_id: users.current.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormDialog));
