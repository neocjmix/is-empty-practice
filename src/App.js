import React, {useEffect, useState} from 'react';
import './App.css';
import search from "./search";

const Beat = beat => ({
    time: new Date(beat['@timestamp']),
    message: beat.message,
});

const update = async (setState, state) => {
    setState({
        ...state,
        beats: (await search({
            index: 'protologbeat-2019.03.03',
            query: {
                match_all: {},
            }
        })).map(Beat)
    })
}

const App = () => {
    const [state, setState] = useState(() => ({beats: []}));

    useEffect(() => {
        const intervalId = setInterval(() => update(setState, state), 3000);
        return () => clearInterval(intervalId)
    }, [])

    return (
        <dl>{
            state.beats.map(beat =>
                <React.Fragment key={beat.time.toString()}>
                    <dt>time</dt>
                    <dd>{beat.time.toString()}</dd>
                    <dt>message</dt>
                    <dd><input type="checkbox" checked={beat.message !== "false"} readOnly/></dd>
                </React.Fragment>
            )
        }</dl>
    );
}

export default App;
