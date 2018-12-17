import React from 'react';
import photo from '../src/assets/smoking.jpg';

const Photo = (props) => {
    return (
        <section className="photo">
            <img src={photo} alt="Man standing infront of of frozen waterfall in brown winter jacket and sunglasses releasing smoke from his mouth." />
        </section>
    )
}

export default Photo;