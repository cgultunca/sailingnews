import React from 'react';
import Videoslist from '../../../Widgets/VideosList/videosList'
const VideosMain = () => {
    return (
        <div>
            <Videoslist type="card" title={false} loadmore={true} start={3} amount={10} >
            
            </Videoslist>
      
        </div>
    );
};

export default VideosMain;