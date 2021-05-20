import { render } from '@testing-library/react';
import React, { Component } from 'react';
import { ToastContainer, toast, Zoom, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

export default class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username
        }

        axios.post('http://localhost:5000/users/add', user)
            .then(res => toast.success(res.data))
            .catch(() => toast.error('Something wrong!'));

        this.setState({
            username: ''
        })
    }

    render() {
        return (
            <div>
                <ToastContainer transition={Zoom} autoClose={5000}/>
                <h3>Create new user</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChangeUsername} />
                    </div>
                    <br />
                    <div className="form-group">
                        <input type="submit" value="Create User" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}