import React from 'react';
import {Link} from 'react-router';

class List extends React.Component {
    render() {
        return (
            <div>
                <li><Link to="/react">React</Link></li>
            </div>
        )
    }
}

export default List;
