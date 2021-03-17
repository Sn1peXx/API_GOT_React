import React from 'react';
import GotService from '../../../services/gotServices';
import { Field } from '../../itemDetails/itemDetails';
import ItemDetails from "../../itemDetails";

export default class BooksItem extends React.Component {
    gotService = new GotService();

    render() {
        return (
            <ItemDetails
            itemId={this.props.bookId}
            getData={this.gotService.getBook} >
                <Field field='numberOfPages' label='Number of pages'/>
                <Field field='publisher' label='Publisher'/>
                <Field field='released' label='Released'/>
            </ItemDetails>
        );
    }
} 