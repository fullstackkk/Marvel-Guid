import React, { Component } from 'react/cjs/react.production.min';
import propTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMassage/ErrorMessage';
import Spinner from '../spinner/Spinner';

import './charList.scss';

class CharList extends Component {

    myRef = React.createRef()

    state = {
        charList: [],
        loading: true,
        error: false,
        newItemLoading: false,
        offset: 210,
        charEnded: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.onRequest();
    }

    onRequest = (offset) => {
        this.onCharListLoading();
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError);
    }

    onCharListLoading = () => {
        this.setState({
            newItemLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList < 9) {
            ended = true;
        }


        this.setState(({ offset, charList }) => ({
            charList: [...charList, ...newCharList],
            loading: false,
            newItemLoading: false,
            offset: offset + 9,
            charEnded: ended
        }))
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onTargetItem = (e) => {

        const target = e.target;
        console.dir(target);
    }

    CallSelectFrame = (id) => {
        const listItem = document.querySelectorAll('.char__item');
        const clazz = "char__item_selected"
        listItem.forEach((item) => {
            item.className = "char__item ";
            if (item.id == id) {
                item.className += clazz;
            }
        })
    }

    renderItems(arr) {
        const items = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }

            return (
                <li className="char__item "
                    ref={this.myRef}
                    key={item.id}
                    id={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id);
                        this.CallSelectFrame(item.id)
                    }}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });
        // А эта конструкция вынесена для центровки спиннера/ошибки
        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    render() {

        const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

        const items = this.renderItems(charList);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button
                    className="button button__main button__long"
                    disabled={newItemLoading}
                    onClick={() => this.onRequest(offset)}
                    style={{ 'display': charEnded ? 'none' : 'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    onCharSelected: propTypes.func.isRequired
}

export default CharList;