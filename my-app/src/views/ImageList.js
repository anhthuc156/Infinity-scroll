import React, { Component } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import ImageActionCreator from '../actions/ImageActionCreator';
import './ImageList.css';

class ImageList extends Component {
    constructor() {
        super();
        this.state = {
            selectedImage: null,
        }
    }

    componentDidMount() {
        this.loadItems();
    }

    loadItems = () => {
        const { page, perPage, dispatch } = this.props;
        dispatch(ImageActionCreator.loadImage(page, perPage));
    }

    handleSetImage = (selectedImage) => {
        if (selectedImage) {
            document.documentElement.style.overflow = 'hidden';  // firefox, chrome
            document.body.scroll = "no"; // ie only
        } else {
            document.documentElement.style.overflow = 'auto';  // firefox, chrome
            document.body.scroll = "yes"; // ie only
        }
        this.setState({
            selectedImage
        })
    }

    render() {
        const { listImages, hasMoreItems } = this.props;

        const { selectedImage } = this.state;

        const loader = <div className="loader">Loading ...</div>;
        return (
            <>
                <InfiniteScroll
                    pageStart={0}
                    initialLoad={false}
                    loadMore={this.loadItems}
                    hasMore={hasMoreItems}
                    loader={loader}>
                    <div className="container">
                        {
                            listImages.map(img => (
                                <img
                                    key={img.id}
                                    className="item"
                                    src={img.images.fixed_height_still.url}
                                    alt="myImage"
                                    onClick={() => this.handleSetImage(img)}
                                />
                            ))
                        }
                    </div>
                </InfiniteScroll>
                {
                    selectedImage && <div
                        className="full-screen"
                    >
                        <img
                            src={selectedImage.images.original.url}
                            alt="myImage"
                        />
                        <div className="btn-close" onClick={() => this.handleSetImage(null)}>
                            X
                        </div>
                    </div>
                }
            </>
        );
    }
}

const mapStateToProps = ({ imageReducer: { listImages, page, perPage, hasMoreItems } }) => ({
    listImages,
    page,
    perPage,
    hasMoreItems
})
export default connect(mapStateToProps, null)(ImageList);