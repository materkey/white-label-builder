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
import Grid from '@material-ui/core/Grid';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
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
    paper: {
        paddingTop: '16px',
        paddingBottom: '8px',
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    upload: {
        width: '98%',
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
        logo: null,
        about_us_photo: null,
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
        this.setState({ isLoading: true });

        let formData = new FormData();
        formData.append('title', this.state.title);
        formData.append('service_id', this.state.service_id);
        formData.append('primary_color', this.state.primary_color);
        formData.append('about_us', this.state.about_us);
        formData.append('vk', this.state.vk);
        formData.append('instagram', this.state.instagram);
        formData.append('facebook', this.state.facebook);
        formData.append('site', this.state.site);
        if (this.state.logo != null) {
            formData.append('logo', this.state.logo);
        }
        if (this.state.about_us_photo != null) {
            formData.append('about_us_photo', this.state.about_us_photo);
        }
        formData.append('author', '1'); //TODO: author set
        const csrfToken = this.getCookie('csrftoken');
        fetch(apiUrls.task, {
            method: 'POST',
            credentials: 'include',
            body: formData,
            headers: {
                'X-CSRFToken': csrfToken,
            },
        })
            .then((response) => {
                if (response.ok) {
                    this.handleClose();
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then((json) => {
                this.setState({ isLoading: false });
                return this.props.createTask(json);
            })
            .catch((error) => {
                this.setState({ isLoading: false });
                // if (error.service_id != null) {
                //     this.setState({ isServiceIdError: true });
                //     this.setState({ errorText: error.service_id });
                // }
                console.log(`There has been a problem with your fetch operation: ${error.message}`);
            });
    };

    handleChangeLogo = (e) => {
        this.setState({ logo: e.target.files[0] });
    };
    handleChangeAboutUsPhoto = (e) => {
        this.setState({ about_us_photo: e.target.files[0] });
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
        if (!this.props.current_user_id || this.props.current_user_id === null) {
            this.props.loadCurrentUser(apiUrls.currentUser);
        }
        return (
            <div>
                {/* <Button onClick={ this.handleClickOpen }>Open form dialog</Button> */}
                {this.props.is_authenticated &&
                <MuiThemeProvider theme={theme}>
                    <Button
                        onClick={this.handleClickOpen}
                        variant="fab"
                        color="primary"
                        aria-label="add"
                        className={this.props.classes.button}
                    >
                        <AddIcon/>
                    </Button>
                </MuiThemeProvider>}
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
                                error={this.state.isServiceIdError}
                                helperText={this.state.errorText}
                                label="Идентификатор ресторана"
                                type="service_id"
                                value={this.state.service_id}
                                onChange={this.handleServiceId}
                                fullWidth
                            />
                            <Typography
                                className={this.props.classes.label}
                            >Основной цвет
                            </Typography>
                            <SketchExample callback={this.handlePrimaryColor}/>
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
                            <Grid container>
                                <Grid xs={12} sm={6} className={this.props.classes.paper}>
                                    <input
                                        style={{ display: 'none' }}
                                        id="raised-button-file-logo"
                                        multiple={false}
                                        accept=".jpg,.jpeg,.png"
                                        type="file"
                                        onChange={this.handleChangeLogo}
                                    />
                                    <label htmlFor="raised-button-file-logo">
                                        <Button variant="outlined" component="span" className={this.props.classes.upload}>
                                            Логотип
                                            <CloudUploadIcon className={this.props.classes.rightIcon}/>
                                        </Button>
                                    </label>
                                </Grid>
                                <Grid xs={12} sm={6} className={this.props.classes.paper}>
                                    <input
                                        accept=".jpg,.jpeg,.png"
                                        style={{ display: 'none' }}
                                        id="raised-button-file-about-us-photo"
                                        multiple
                                        type="file"
                                        onChange={this.handleChangeAboutUsPhoto}
                                    />
                                    <label htmlFor="raised-button-file-about-us-photo">
                                        <Button variant="outlined" component="span" className={this.props.classes.upload}>
                                            Фото ресторана
                                            <CloudUploadIcon className={this.props.classes.rightIcon}/>
                                        </Button>
                                    </label>
                                </Grid>
                            </Grid>
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


const mapDispatchToProps = dispatch => bindActionCreators({
    createTask,
    loadCurrentUser
}, dispatch);

const mapStateToProps = ({ users }) => ({
    current_user_id: users.current.id,
    is_authenticated: users.isAuthenticated,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormDialog));
