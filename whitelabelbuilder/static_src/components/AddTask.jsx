import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from '@material-ui/icons/Add';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles/index';
import apiUrls from '../constants/apiUrls';
import {bindActionCreators} from 'redux';
import {createTask} from '../actions/tasks';
import {loadCurrentUser} from '../actions/users';
import PropTypes from 'prop-types';
import {Material} from 'react-color';
import SketchExample from './ColorPicker';


const styles = theme => ({
    button: {
        position: 'fixed',
        bottom: theme.spacing.unit * 2,
        right: theme.spacing.unit * 2,
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
        primary_color: '#0373ff',

        link: '',
        displayColorPicker: false,
        color: {
            r: '241',
            g: '112',
            b: '19',
            a: '1',
        },

    };

    handleClickOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
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
    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.isLoading) {
            return;
        }
        if (!this.props.current_user_id || this.props.current_user_id === null) {
            this.props.loadCurrentUser(apiUrls.currentUser);
        }
        this.setState({isLoading: true});
        const newTask = {
            title: this.state.title,
            service_id: this.state.service_id,
            primary_color: this.state.primary_color,
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
            this.setState({isLoading: false});
            return this.props.createTask(json);
        }).catch((error) => {
            this.setState({isLoading: false});
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
                <Button
                    onClick={this.handleClickOpen}
                    variant="fab"
                    color="primary"
                    aria-label="add"
                    className={this.props.classes.button}
                >
                    <AddIcon/>
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
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
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Идентификатор ресторана"
                                type="service_id"
                                value={this.state.service_id}
                                onChange={this.handleServiceId}
                                fullWidth
                            />
                            <TextField
                                autoFocus
                                margin="dense"
                                id="name"
                                label="Основной цвет"
                                type="primary_color"
                                value={this.state.primary_color}
                                onChange={this.handlePrimaryColor}
                                fullWidth
                            />
                            <SketchExample callback={this.handlePrimaryColor}/>
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


const mapDispatchToProps = dispatch => bindActionCreators({createTask, loadCurrentUser}, dispatch);

const mapStateToProps = ({users}) => ({
    current_user_id: users.current.id,
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FormDialog));
