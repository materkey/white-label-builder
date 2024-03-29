import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        maxWidth: 345,
        margin: 'auto',
        marginTop: 25,
    },
    media: {
        height: 0,
        paddingTop: '100%', // 16:9
    },
};

function SimpleMediaCard(props) {
    const { classes } = props;
    return (
        <div>
            <Card className={ classes.card }>
                <CardMedia
                    className={ classes.media }
                    image="/static/video.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                        Квантовая механика
                    </Typography>
                    <Typography component="p">
                        Лекции по квантовой механике
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary">
                        Поделиться
                    </Button>
                    <Button size="small" color="primary">
                        Подробнее
                    </Button>
                </CardActions>
            </Card>
        </div>
    );
}

SimpleMediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleMediaCard);
