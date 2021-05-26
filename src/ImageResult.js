import React from 'react'

const ImageResult = ({ Tags, Image }) => {
    return (
        <div>
            <h1>{Tags}</h1>
            <img src={Image} />
        </div>
    )
}

export default ImageResult;
