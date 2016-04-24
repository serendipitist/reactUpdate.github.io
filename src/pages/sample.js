/**
 * Created by shireesha on 07/04/16.
 */
import React from 'react';
import ajax from 'superagent';
import { Link } from 'react-router';//make your custom url

// to get the data from  Git hub api
class Sample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {objects: []};
    }


    componentWillMount() {
        ajax.get('')
            .end((error, response) => {
                    if (!error && response) {
                        this.setState({ commits: response.body });
                    } else {
                        console.log('There was an error fetching from GitHub', error);
                    }
                }
            );
    }

    render() {
        return (console.dir());
    }
}

export default Sample;
