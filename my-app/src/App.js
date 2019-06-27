import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';

const api = {
    baseUrl: 'https://api.giphy.com/v1/gifs/trending',
    key: 'aMcf8zKGDl7IqLkLj85alm25UhQcHmLx'
}
class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            listImage: [],
            page: 1,
            perPage: 5,
            hasMoreItems: true,

        };
        
    }
    
    loadItems() {
        const { page, perPage } = this.state;
        
        axios.get(`${api.baseUrl}?api_key=${api.key}&limit=${perPage}&offset=${(page-1) * perPage}`)
            .then(res => {
                const listImage = res.data.data;
                this.setState({ 
                    listImage:  listImage.concat(this.state.listImage),
                    page: page + 1
            });
        })
    }
    
    render() {
        const { listImage } = this.state;
        const loader = <div className="loader">Loading ...</div>;
        var item = []
        listImage.map((img) => {
            return item.push(
                <div className="item" key={img.id}>
                    <a href={'#' + img.id} key={img.id}>
                        <img src={img.images.fixed_height_still.url} alt="myImage"/>
                    </a>
                    <div className="zoomout-target" id={img.id}>
                        <img src={img.images.original.url} alt="myZoomImage"/>
                        <a className="zoomout-close" href="#"></a>
                    </div>
                </div>
            )
        })
        
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>

                <div className="container">
                    {item.reverse()}
                </div>
            </InfiniteScroll>
        );
    }
}

export default App;
