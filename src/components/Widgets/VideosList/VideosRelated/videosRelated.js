import React from 'react';
import styles from '../videosList.css'
import VideosListTemplate from '../videosListTemplate';
const VideosRelated = (props) => {
    return (
        <div className={styles.relatedWrapper}> 
            <VideosListTemplate
            data={props.data}
            teams ={props.teams}
            >

            </VideosListTemplate>
        </div>
    );
};

export default VideosRelated;