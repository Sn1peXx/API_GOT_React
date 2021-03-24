/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import React, { Component } from "react";
import "./itemList.css";
import Spinner from "../spinner/spinner";
import PropTypes from "prop-types";
import GotService from "../../services/gotServices";

class ItemList extends Component {

  renderItems = arr => {
    return arr.map((item, i) => {

      const label = this.props.renderItem(item);

      return (
        <li key={i} className="list-group-item" onClick={() => this.props.onItemSelected(1 + i)}>{label}</li>
      );
    });
  };

  render() {
    const {data} = this.props;
    const items = this.renderItems(data);

    return (
      <ul className="item-list list-group">
        {items}
      </ul>
    );
  }
}

ItemList.propTypes = {
  onItemSelected: PropTypes.func
};


const withData = (View, getData) => {

  return class extends Component {
    state = {
      data: null
    };
  
    componentDidMount() {
      getData()
        .then(data => this.setState({
          data
        }));
    }

    render() {
      const {data} = this.state; 

      if (!data) {
        return <Spinner />;
      }

      return <View {...this.props} data={data} />;
    }
  };
};

const {getAllCharacters} = new GotService();
export default withData(ItemList, getAllCharacters);