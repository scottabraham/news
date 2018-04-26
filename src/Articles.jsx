import React from 'react';
export default function Articles(props){
    
    if(props===undefined || props.articles===undefined) {
        return "Loading...";
    }
    else{
        const articleList = props.articles.map( (article, i) => {
            return (
                <div className='article' key={i}>
                    <a href={article.url}>{article.url}</a>
                    <h2>{article.title}</h2>
                    <a href={article.url}> <img src={article.urlToImage} alt={article.title}></img></a>
                    <p>{article.description}</p>
                </div>
            );
        });
    
        return (
            articleList      
    
        )

    }
           
}