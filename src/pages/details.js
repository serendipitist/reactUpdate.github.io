//http://www.hackingwithreact.com/read/1/8/using-jsx-to-render-several-elements-at-once
import React from 'react';
import ajax from 'superagent';


class Detail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: 'commits',
            commits: [],
            forks: [],
            pulls: []
        };
    }

    fetchFeed(type) {
        ajax.get(`https://api.github.com/repos/facebook/react/${type}`)
            .end((error, response) => {
                    if (!error && response) {
                        this.setState({ [type]: response.body });
                    } else {
                        console.log(`Error fetching ${type}`, error);
                    }
                }
            );
    }
    componentWillMount() {
        this.fetchFeed('commits');
        this.fetchFeed('forks');
        this.fetchFeed('pulls');
    }
    selectMode(event) {
        this.setState({ mode:event.currentTarget.dataset.mode });
    }

    renderCommits(){
        return this.state.commits.map((commit, index) => {
            const author = commit.author ? commit.author.login : 'Anonymous';
            return (<div key={index}>
                <a target="_blank" href={commit.author.html_url}>
                    <div className="thecard">
                    <div className="card-img">
                        <img src={commit.author.avatar_url} height="200px"/>
                    </div>
                        <div className="card-caption">
                          <strong>Author:{author}</strong>
                          <h5><span>Commit Message: </span>{commit.commit.message}</h5>
                        </div>
                    </div>
                    </a>
                </div>
           );
        });
    }
    renderForks() {
        return this.state.forks.map((fork, index) => {
            const owner = fork.owner ? fork.owner.login : 'Anonymous';

            return (<div key={index}>
                <a target="_blank" href={fork.owner.html_url}>
                    <div className="thecard">
                        <div className="card-img">
                            <img src={fork.owner.avatar_url} height="200px"/>
                        </div>
                        <div className="card-caption">
                            <h5>Owner: {owner}</h5>
                            <h5> Forked to <a href={fork.html_url}>{fork.html_url}</a></h5>
                            <h5>Creation Timestamp: {fork.created_at}</h5>
                        </div>
                    </div>
                </a>
            </div>);
        });
    }
    renderPulls() {
        return this.state.pulls.map((pull, index) => {
            const user = pull.user ? pull.user.login : 'Anonymous';

            return (<div key={index}>
                <a target="_blank" href={pull.user.html_url}>
                    <div className="thecard">
                        <div className="card-img">
                            <img src={pull.user.avatar_url} height="200px"/>
                        </div>
                        <div className="card-caption">
                            <h5>User :{user}</h5>
                            <h5>Title : {pull.title}</h5>
                            <h5>{pull.html_url}</h5>
                            <h5> Pull Request Created : {pull.created_at}</h5>
                            </div>
                        </div>
                    </a>
                </div>
            );
        });
    }

    render() {
        let content;

        if (this.state.mode === 'commits') {
            content = this.renderCommits();
        } else if (this.state.mode === 'forks') {
            content = this.renderForks();
        } else {
            content = this.renderPulls();
        }

        return (<div className="btn-area">
             <h2 className="title-react">REACT UPDATES</h2>
               <section className="border">
            <button onClick={this.selectMode.bind(this)} data-mode="commits">
                Show Commits
            </button>


            <button onClick={this.selectMode.bind(this)} data-mode="forks">
                Show Forks
            </button>


            <button className="pull-area" onClick={this.selectMode.bind(this)} data-mode="pulls">
                Show Pulls
            </button>

                </section>
            {content}
        </div>);
    }
}
//To use bind() just put it after the method name you want to call,
// then make sure and pass in the current value of this to make that the one used inside your method
//shouldComponentUpdate() will be skipped if forceUpdate is used
//Normally you should try to avoid all uses of forceUpdate() and only read from this.props and this.state in render(). This makes your component "pure" and your application much simpler and more efficien
//React has a solution and it's called state. State looks and works just like props, with one exception: while props are read-only by their' +
// owning component, any component can change its own state or even a different component's state if it wants to.
export default Detail;