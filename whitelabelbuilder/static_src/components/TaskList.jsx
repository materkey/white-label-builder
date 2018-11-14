import React from 'react';
import PropTypes from 'prop-types';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {loadTasks} from './../actions/tasks';
import apiUrls from './../constants/apiUrls';
import {updateTask} from '../actions/tasks';

import Task from './Task';
import Loader from './Loader';


class TaskList extends React.Component {
    static propTypes = {
        isLoading: PropTypes.bool,
        taskList: PropTypes.arrayOf(PropTypes.number),
        loadTasks: PropTypes.func.isRequired,
        updateTask: PropTypes.func.isRequired,
    }

    static defaultProps = {
        taskList: [],
        isLoading: false,
    }

    componentDidMount() {
        this.props.loadTasks(apiUrls.task);
        let localProps = this.props
        let data = document.querySelector('#centrifuge').dataset || {};

        let centrifuge = new Centrifuge({
            url: data.url,
            user: data.user,
            timestamp: data.timestamp,
            info: data.info,
            token: data.token,
        });
        centrifuge.subscribe("news", function (message) {
            localProps.updateTask(message.data.value);
        });

        centrifuge.connect();

    }

    render() {
        if (this.props.isLoading) {
            return <div className="b-task-list">
                <Loader/>
            </div>;
        }

        const tasks = this.props.taskList.sort(function(a, b) {return a - b}).slice(0).reverse().map(
            item => <Task key={item} id={item}/>,
        );
        return (
            <div className="b-task-list">
                {tasks}
            </div>
        );
    }
}


const mapStateToProps = ({tasks}) => {
    return {
        taskList: tasks.taskList,
        isLoading: tasks.isLoading,
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({loadTasks, updateTask}, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
