import React from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../error/errorMessage";
import CharacterPage from "../Page/characterPage/characterPage";
import GotService from './../../services/gotServices';
import ItemList from "../itemList";
import ItemDetails from "../itemDetails";
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './app.css';
import BookPage from "../Page/bookPage/bookPage";
import HousePage from "../Page/housePage/housePage";
import BooksItem from "../Page/bookPage/booksItem";

export default class App extends React.Component {
  gotService = new GotService();

  state = {
    modalStatus: true,
    error: false
  };

  componentDidCatch() {
    console.log('error');
    this.setState({
      error: true
    });
  }

  onToggle = () => {
    this.setState((state) => {
      return {
        modalStatus: !state.modalStatus
      };
    });
  };

  render() {
    const char = this.state.modalStatus ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {char}
                <button className="toggle-button" onClick={this.onToggle}>Toggel item</button>
              </Col>
            </Row>
            <Route path="/characters" component={CharacterPage} />
            <Route path="/houses" component={HousePage} />
            <Route path="/books" exact component={BookPage} />
            <Route path='/books/:id' render={
              ({match}) => {
                const {id} = match.params;

                return <BooksItem bookId={id} />;
              }
                }/>
          </Container>
        </div>
      </Router>
    );
  }
}