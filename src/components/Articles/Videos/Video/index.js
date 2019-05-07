import React, { Component } from 'react'
import { URL } from '../../../../config'
import Axios from 'axios';
import styles from '../../articles.css'
import Header from './header';
import VideosRelated from '../../../Widgets/VideosList/VideosRelated/videosRelated';

export default class VideoArticle extends Component {

    state = {
        article: [],
        team: [],
        teams: [],
        related: []
    }

    componentWillMount() {
        Axios.get(`${URL}/videos?id=${this.props.match.params.id}`)
            .then(response => {
                let article = response.data[0];

                Axios.get(`${URL}/teams?id=${article.team}`)
                    .then(response => {
                        this.setState({
                            article,
                            team: response.data
                        });
                        this.getRelated();
                    })

            })
    }

    getRelated = () => {
        Axios.get(`${URL}/teams`)
            .then(response => {
                let teams = response.data;
                Axios.get(`${URL}/videos?q=${this.state.team[0].city}&_limit=3`)
                    .then(response => {
                        this.setState({
                            teams,
                            related: response.data
                        })
                    });
            })

    }


    render() {
        const article = this.state.article;
        const team = this.state.team
        return (
            <div>
                <Header
                    teamData={team[0]}
                ></Header>
                <div className={styles.videoWrapper}>
                    <h1>{article.title}</h1>
                    <iframe
                        title="videoplayer"
                        width="100%"
                        height="300px"
                        src={`http://www.youtube.com/embed/${article.url}`}
                    >

                    </iframe>
                </div>
                <VideosRelated
                    data={this.state.related}
                    teams={this.state.teams}
                ></VideosRelated>
            </div>
        )
    }
}
