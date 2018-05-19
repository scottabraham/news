
import React, { Component } from 'react';
import Articles from './Articles'
import SourceSelector from './SourceSelector';
import Loader from './Loader'

const apiKey = 'c8c1496ed81940f3a1bda6cd62842212';
const defaultSource = 'cbc-news';

class NewsFeed extends Component{

    constructor(props){
        super(props);
        this.state = {
            isLoading: true
        }
    }
  
    render(){

        let articles;
        let sources;
        let selectedSource;
        
        const handleSelectedSource = (selectedSource) => {
            this.setState({source: selectedSource})
            this.updateNews(selectedSource);
        }

        const loader = <Loader></Loader>

        if(this.state){
            if (this.state.isLoading !== null && this.state.isLoading===true){
                return loader;
            }
            if (this.state.newsfeed !== null && this.state.newsfeed.articles !== null){
                articles = this.state.newsfeed.articles;
            }

            if (this.state.sources !== null){
                sources = this.state.sources;
            }

            if (this.state.source !== null){
                selectedSource = this.state.source;
            }

            return(
            
            <div>
                <div className="titleBar">
                    <h1>Scotts News</h1>
                    <SourceSelector sources={sources} selectedSource={selectedSource || defaultSource} onChange={(val) => handleSelectedSource(val)}></SourceSelector>
                </div>
                <div className="articles">
                    <Articles articles={articles}></Articles>
                </div>
            </div>
            )

        } else {
            // state not initialized yet....
            return loader;
        }
    }

    componentDidMount(){
        let source; 
        if(this.state !== null && this.state.source !== null){
            source = this.state.source;
        }
        this.updateNews(source);
        this.updateSources();
    }

    async updateNews(source = defaultSource){
        this.setState({
            isLoading: true
        })
        const res = await fetch('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+apiKey)
        const json = await res.json();
        
        this.setState({
            newsfeed: json,
            isLoading: false
        });
    }

    async updateSources(){
        const res = await fetch('https://newsapi.org/v2/sources?apiKey='+apiKey)
        const json = await res.json();
        
        this.setState({
            sources: json.sources
        });

    }

} 
export default NewsFeed