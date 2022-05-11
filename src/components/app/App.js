import { Component } from "react/cjs/react.development";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";

import decoration from '../../resources/img/vision.png';

class App extends Component {
    state = {
        seletedChar: null
    }

    onCharSelected = (id) => {
        this.setState({
            seletedChar: id
        })
    }

    render() {
        return (
            <div className="app" >
                <AppHeader />
                <main>
                    <RandomChar />
                    <div className="char__content">
                        <CharList onCharSelected={this.onCharSelected} />
                        <CharInfo charId={this.state.seletedChar} />
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision" />
                </main>
            </div>
        )
    }
}

export default App;