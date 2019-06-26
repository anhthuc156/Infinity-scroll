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
            perPage: 20,
            hasMoreItems: true,

        };
        
    }
    /*componentDidMount() {
        const {page, perPage } = this.state;
        axios.get(`${api.baseUrl}?api_key=${api.key}&limit=${perPage}&offset=${(page-1) * perPage}`)
            .then(res => {
                const listImage = res.data.data;
                this.setState({ listImage:  listImage.concat(this.state.listImage)});
                console.log(listImage);
        })
        .catch(error => console.log(error));
    }*/

    loadItems() {
        const { page, perPage } = this.state;
        
        axios.get(`${api.baseUrl}?api_key=${api.key}&limit=${perPage}&offset=${(page-1) * perPage}`)
            .then(res => {
                const listImage = res.data.data;
                this.setState({ listImage:  listImage.concat(this.state.listImage)});
                console.log(listImage);
        })
    }
    
    
    
    render() {
        const { listImage } = this.state;
        const loader = <div className="loader">Loading ...</div>;
        var item = []
        listImage.map((img) => {
            item.push(
                <a key={img.id} className="item" href={img.images.fixed_width.url}>
                    <img src={img.images.fixed_width.url} alt=""/>
                </a>
            )
        })
        /*if(listImage.length === 0 ) {
            return <div>Loading</div>
        }*/
        return (
            <InfiniteScroll
                pageStart={0}
                loadMore={this.loadItems.bind(this)}
                hasMore={this.state.hasMoreItems}
                loader={loader}>

                <div className="container">
                    {item}
                </div>
            </InfiniteScroll>
            
        );
    }
}

export default App;
