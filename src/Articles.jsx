import React from 'react';
export default function Articles(props){
    
    if(props===undefined || props.articles===undefined) {
        return "Loading...";
    }
    else{
        const articleList = props.articles.map( (article, i) => {
            return (
                <div className='col-6 col-md-4' key={i}>
                    <h4>{article.title}</h4>
                    <p><a href={article.url}>Read Article</a></p>
                    <a href={article.url}> <img src={article.urlToImage} alt={article.title} className="img-thumbnail"></img></a>
                    <p>{article.description}</p>
                </div>
            );
        });
    
        return (
            articleList      
    
        )

    }
           
}