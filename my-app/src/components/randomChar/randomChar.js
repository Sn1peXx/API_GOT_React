/* eslint-disable react/prop-types */
import React, { Component } from "react";
import GotServices from "../../services/gotServices";
import "./randomChar.css";
import Spinner from "./../spinner/spinner";
import ErrorMessage from './../error/errorMessage';
import PropTypes from "prop-types";

export default class RandomChar extends Component {

    gotServices = new GotServices();
    state = {
        pers: {},
        loading: true,
        error: false
    };


    componentDidMount() {
        this.updateCharacter();
        this.timerId = setInterval(this.updateCharacter, this.props.interval);
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    onCharLoaded = (pers) => {
        this.setState({
            pers,
            loading: false, 
        });
    };

    onError = () => {
        this.setState({
            error: true,
            loading: false
        });
    };

    updateCharacter = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        this.gotServices.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    };

    render() {
        const { pers, loading, error } = this.state;

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? <View pers={pers}/> : null;

        return (
            <div className="random-block rounded">
                {errorMessage}
                {spinner}
                {content}
            </div>
        );
    }
}

RandomChar.defaultProps = {
    interval: 15000
};

RandomChar.propTypes = {
    interval: PropTypes.number
};

const View = ({ pers }) => {
    const { name, gender, born, died, culture } = pers;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Gender </span>
                    <span>{gender.length > 1 ? gender : 'no data :('}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Born </span>
                    <span>{born.lenegth > 1 ? born : 'no data :('}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Died </span>
                    <span>{died.length > 1 ? died : 'no data :('}</span>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span className="term">Culture </span>
                    <span>{culture.lenegth > 1 ? culture : 'no data :('}</span>
                </li>
            </ul>
        </>
    );
};
