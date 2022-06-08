import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { MainPage, Comics } from "../pages"
import AppHeader from "../appHeader/AppHeader";

const App = () => {
    return (
        <Router>
            <div className="app" >

                <AppHeader />

                <main>
                    <Switch>
                        <Route exact path="/comics">
                            <Comics />
                        </Route>
                        <Route exact path="/">
                            <MainPage />
                        </Route>
                    </Switch>
                </main>
            </div >
        </Router>
    )
}

export default App;