import React, { Component } from 'react';

class EnlargeImage extends Component {
    render() {
        return (
            <div className="lightbox-target" id="item">
                <img src={this.props.url}/>
                <a className="lightbox-close" href="#"></a>
            </div>
        )
    }
}

export default EnlargeImage;