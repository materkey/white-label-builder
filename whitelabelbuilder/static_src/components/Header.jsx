import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import LoginDialog from './LoginDialog';
import LogoSvgComponent from './Logo';


const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flex: 1,
    },
    menuButton: {
        marginLeft: -12,
    },
};

class Header extends React.Component {
    static propTypes = {
        classes: PropTypes.object.isRequired,
    };

    render() {
        return (
            <div className={ this.props.classes.root }>
                <AppBar
                    position="static"
                    style={ {
                        backgroundColor: '#0EC645',
                    } }
                >
                    <Toolbar>
                        <LogoSvgComponent className={ this.props.classes.flex } />
                        <LoginDialog />
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(Header);
