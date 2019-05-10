import React, { Component } from 'react';
import styles from './videosList.css';
// import axios from 'axios';
// import { URL } from '../../../config';
import Button from '../Buttons/buttons';
import { firebaseTeams, firebaseVideos, firebaseLooper } from '../../../firebase'
import VideosListTemplate from './videosListTemplate'

export default class VideosList extends Component {

    state = {
        teams: [],
        videos: [],
        start: this.props.start,
        end: this.props.start + this.props.amount,
        amount: this.props.amount
    }

    componentWillMount() {
        this.request(this.state.start, this.state.end);
    }

    request = (start, end) => {

        if (this.state.teams.length < 1) {

            firebaseTeams.once('value')
                .then((snapshot) => {
                    const teams = firebaseLooper(snapshot);
                    this.setState({
                        teams
                    });
                });

            // axios.get(`${URL}/teams`)
            //     .then(response => {
            //         this.setState({
            //             teams: response.data
            //         })
            //     })
        }

        // axios.get(`${URL}/videos?_start=${start}&_end=${end}`)
        //     .then(response => {
        //         this.setState({
        //             videos: [...this.state.videos, ...response.data],
        //             start,
        //             end
        //         })
        //     })

        firebaseVideos.orderByChild('id').startAt(start).endAt(end).once('value')
            .then((snapshot) => {
                const videos = firebaseLooper(snapshot);
                this.setState({
                    videos: [...this.state.videos, ...videos],
                    start,
                    end
                });
            })
            .catch(e => {
                console.log(e);
            })
    }


    renderVideos = () => {
        let template = null;
        switch (this.props.type) {
            case ('card'):
                template = <VideosListTemplate data={this.state.videos} teams={this.state.teams}></VideosListTemplate>
                break;
            default:
                template = null;
        }
        return template;
    }

    loadMore = () => {
        let end = this.state.end + this.state.amount;
        this.request(this.state.end + 1, end);
    }

    renderButton = () => {
        return this.props.loadmore ?
            <Button type="loadmore" cta="Load More Videos" loadMore={() => this.loadMore()}></Button>
            :
            <Button type="linkTo" cta="More Videos" linkTo="/videos"></Button>
    }

    renderTitle = (title) => {
        return title ?
            <h3><strong>Sailing</strong> Videos</h3> : null
    }

    render() {
        return (
            <div className={styles.videoList_wrapper}>
                {this.renderTitle(this.props.title)}
                {this.renderVideos()}
                {this.renderButton()}
            </div>
        )
    }
}
