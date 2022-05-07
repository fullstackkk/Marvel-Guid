import { Component } from 'react/cjs/react.production.min';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMassage/ErrorMessage';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

class RandomChar extends Component {

    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    onCharLoaded = (char) => {
        this.setState({ char, loading: false })
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        this.marvelService
            .getCharacters(id)
            .then(this.onCharLoaded)
            .catch(this.onError);
    }
    componentDidMount() {
        this.timerId = setInterval(this.updateChar(), 3000);
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    render() {
        const { char, loading, error } = this.state;
        const errorMassage = error ? <ErrorMessage /> : null;
        const spiner = loading ? <Spinner /> : null
        const content = !(loading || error) ? <View char={char} /> : null

        return (
            <div className="randomchar" >
                {errorMassage}
                {spiner}
                {content}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.updateChar} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        )
    }
}

const View = ({ char }) => {
    const { name, thumbnail, homepage, wiki } = char;
    let { description } = char;
    let clazzImg = thumbnail.includes("image_not_available") ? "randomchar__img randomchar__img__undefined" : "randomchar__img";
    if (!description) {
        description = "Character information missing!"
    }
    if (description.length > 21) {
        description = description.slice(0, 60) + `...`
    }
    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt="Random character" className={clazzImg} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{description}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;