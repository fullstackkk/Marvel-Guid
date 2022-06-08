import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';


import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';

const ComicsList = () => {

    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(100);
    const [comicsEnded, setComicsEnded] = useState(false);

    const { loading, error, getAllComics } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = (newComicsList) => {
        let ended = false;
        if (newItemLoading.length < 8) {
            ended = true;
        }

        setComicsList(comicsList => [...comicsList, ...newComicsList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 8);
        setComicsEnded(comicsEnded => ended);
    }

    const renderItems = (arr) => {
        console.log(arr);
        const items = arr.map((item, i) => {
            return (
                <li className="comics__item"
                    tabIndex={0}>
                    <a href="#">
                        <img src={item.thumbnail} alt={item.name} className="comics__item-img" />
                        <div className="comics__item-name">{item.name}</div>
                        <div className="comics__item-price">{item.price}</div>
                    </a>
                </li>
            )
        })
        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )

    }
    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;
    const content = renderItems(comicsList);
    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}
            <button
                onClick={() => onRequest(offset)}
                disabled={newItemLoading}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
                className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;