//Libraries
import React, { Component } from 'react';
//Components
import PageHeader from '../component/PageHeader';
import TrendingSection from '../component/section/TrendingSection';
import FavoriteSection from '../component/section/FavoriteSection';
import SearchSection from '../component/section/SearchSection';
//Actions
import { fetchLastTenTreindGifs } from '../action/actions';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trending: [],
            favorites: [],
            results: [],
            searchValue: ''
        }
    }

    componentDidMount() {
        this.updateTreindingGifs(10);
    }

    updateTreindingGifs(limit) {
        fetchLastTenTreindGifs(10)
            .then(payload => {
                this.loadGifs(payload, 'trending')
            })
            .catch(console.error);
    }

    loadGifs(payload, gifType) {
        if (payload) {
            const gifs = payload.data || [];

            this.setState({ [gifType]: gifs });
        }
    }

    onDislike(event) {
        const { favorites: oldFavorites } = this.state;
        const gifID = event.target.id;
        const favorites = oldFavorites.filter(gif => gif.id !== gifID);

        this.setState({ favorites });
    }

    onLike(event) {
        const { favorites: oldFavorites } = this.state;
        const gifID = event.target.id;
        const favorites = oldFavorites.filter(gif => gif.id !== gifID);

        this.setState({ favorites });
    }

    onChangeSearchValue(searchValue) {
        this.setState({ searchValue });
    }

    render() {
        const { trending, favorites, results } = this.state;

        return (
            <div className="container">
                <PageHeader title='GIF Viewer' />
                <TrendingSection gifs={trending} />
                <FavoriteSection
                    gifs={favorites}
                    onDislike={this.onDislike.bind(this)}
                />
                <SearchSection
                    gifs={results}
                    onLike={this.onLike.bind(this)}
                    onChangeSearchValue={this.onChangeSearchValue.bind(this)}
                />
            </div>
        );
    }
}

export default App;
