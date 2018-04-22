import React, { Component } from 'react';
export default function SourceSelector(props){
    
    if(props===undefined || props.sources===undefined) {
        return "Loading...";
    }
    else{

        const sourcesOptions = props.sources.map(source=>{
            return <option value={source.id} selected={source.id===props.selectedSource}>{source.name}</option>
        })

        return (
            <select id='sourceSelector' onClick={()=> props.onClick(props.selectedSource)}>{sourcesOptions}</select>
        )
    }
}
           