
import React, { Component } from 'react';
import Articles from './Articles'
import SourceSelector from './SourceSelector';

const apiKey = 'c8c1496ed81940f3a1bda6cd62842212';
const defaultSource = 'cbc-news';
const onClick = (val) =>{
    this.setState({
        selectedSource: val
    })
}

class NewsFeed extends Component{
    render(){
        let articles;
        let sources;
        let selectedSource;
        
        if (this.state !== null && this.state.newsfeed !== null && this.state.newsfeed.articles !== null){
            articles = this.state.newsfeed.articles;
        }

        if (this.state !== null && this.state.sources !== null){
            sources = this.state.sources;
        }

        if (this.state !== null && this.state.selectedSource !== null){
            selectedSource = this.state.selectedSource;
        }


        return(
        
        <div>
            <h1>News</h1>
            <SourceSelector sources={sources} selectedSource={selectedSource || defaultSource} onClick={() => this.onClick}></SourceSelector>
            <Articles articles={articles}></Articles>
        </div>
        )
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
        const res = await fetch('https://newsapi.org/v2/top-headlines?sources='+source+'&apiKey='+apiKey)
        const json = await res.json();
        
        this.setState({
            newsfeed: json
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