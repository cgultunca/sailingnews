import React, { Component } from 'react'
// import Axios from 'axios';
// import { URL } from '../../../../config'
import {firebaseDB,firebaseTeams,firebaseLooper} from '../../../../firebase'
import styles from '../../articles.css'
import Header from './header';

export default class NewsArticle extends Component {

    state = {
        article: [],
        team: []
    }

    componentWillMount() {

        firebaseDB.ref(`articles/${this.props.match.params.id}`).once('value')
        .then((snapshot)=>{
            let article = snapshot.val();

            firebaseTeams.orderByChild('teamId').equalTo(article.team).once('value')
            .then((snapshot)=>{
                const team = firebaseLooper(snapshot);
                this.setState({
                    article,
                    team
                })
            })
        })


        // Axios.get(`${URL}/articles?id=${this.props.match.params.id}`)
        //     .then(response => {
        //         let article = response.data[0];

        //         Axios.get(`${URL}/teams?id=${article.team}`)
        //             .then(response => {
        //                 this.setState({
        //                     article,
        //                     team: response.data
        //                 })
        //             })

        //     })
    }

    render() {

        const article = this.state.article;
        const team = this.state.team
        return (
            <div className={styles.articleWrapper}>

                <Header
                    teamData={team[0]}
                    date={article.date}
                    author={article.author}
                ></Header>
                <div className={styles.articleBody}>
                    <h1>{article.title}</h1>
                    <div className={styles.articleImage}
                        style={{
                            background: `url(/images/news/${article.image})`
                        }}
                    ></div>
                    <div className={styles.articleText}>
                        {article.body}
                    </div>
                </div>
            </div>
        )
    }
}