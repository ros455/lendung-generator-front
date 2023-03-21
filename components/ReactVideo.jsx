import React from 'react';
import dynamic from 'next/dynamic';
// import ReactPlayer from 'react-player';

const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

const ReactVideo = ({ playing = false, videoUrl, videoWidth, videoHeight }) => {
    return (
        <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: 'center' }}>
            <ReactPlayer url={videoUrl} controls={true} playing={playing} width={videoWidth} height={videoHeight} />
        </div>
    )
}

export default ReactVideo