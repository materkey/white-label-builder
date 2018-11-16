import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { getAbsoluteUrl } from '../utils/absolute';
// import ShowTask from './TaskDetails';
import Loader from './Loader';
var QRCode = require('qrcode.react');

const styles = {
    card: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: 25,
    },
    media: {
        height: 345,
        paddingTop: '15%', // 16:9
    },
    center: {
        marginLeft: "auto",
        marginRight: "auto"
    },
};

class Task extends React.Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        title: PropTypes.string,
        is_successful: PropTypes.bool,
        url: PropTypes.string,
        lecturers: PropTypes.arrayOf(PropTypes.number),
    }

    static defaultProps = {
        title: null,
        is_successful: false,
        url: "no_apk",
        lecturers: null,
    }

    handleClick = () => {
        {/*<Link task_id={this.props.link}/>*/
        }
    };

    render() {
        // let lecturers = <Typography>Лектор: Не указан</Typography>
        // console.log(this.props.lecturers);
        // if (this.props.lecturers.length > 0) {
        //     lecturers = this.props.lecturers.map(item => <Lecturer key={item} id={item}/>);
        // }
        const isSuccessful = this.props.is_successful;
        let absoluteApkUrl = getAbsoluteUrl(this.props.url)

        return (
            <div>
                <Card className={this.props.classes.card} >
                    {isSuccessful ? (
                        <QRCode size={345} value={absoluteApkUrl} level="L" />

                    ) : (
                            <p />
                        )}

                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            {this.props.title}
                        </Typography>
                        <Typography component="p">
                            {/*{ lecturers }*/}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {isSuccessful ? (
                            <Button href={this.props.url} onClick={this.handleClick} size="small" color="primary">
                                Протестировать
                            </Button>
                        ) : (
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                    <Loader />
                                </div>
                            )}

                    </CardActions>
                </Card >
            </div >
        );
    }
}

// Task.propTypes = {
//     classes: PropTypes.object.isRequired,
// };

const mapStateToProps = ({ tasks }, ownProps) => ({
    ...tasks.tasks[ownProps.id],
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Task));
