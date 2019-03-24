import React, {Component} from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Home from "./Scenes/Home";

type Props = {};
export default class App extends Component<Props> {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="Home" component={Home} title="Home" initial={true}/>
                </Scene>
            </Router>
        )
    }
}
