import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Exercise = props => {
    render();
    return (<tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0, 10)}</td>
        <td>
            <Link className="btn btn-success" to={`/edit/${props.exercise._id}`}>Edit</Link>  <a href="#" className="btn btn-danger" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</a>
        </td>
    </tr>)
}

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.deleteExercise = this.deleteExercise.bind(this);

        this.state = { exercises: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                this.setState({ exercises: res.data });
                toast.info('Exercise list was loaded!')
            })
            .catch(err => toast.error(err))
    }

    deleteExercise(id) {
        axios.delete(`http://localhost:5000/exercises/${id}`)
            .then(res => toast.warn(res.data))
            .catch(() => toast.error('Something wrong!'));

        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        });
    }

    exercisesList() {
        return this.state.exercises.map(currentExercise => {
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id} />;
        })
    }

    render() {
        return (
            <div>
                <ToastContainer transition={Zoom} autoClose={5000}/>
                <h3>Logged Exercises</h3>
                <table className="table">
                    <thead className="table-head">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exercisesList()}
                    </tbody>
                </table>
            </div>
        )
    }
}