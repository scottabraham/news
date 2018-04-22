import React, { Component } from 'react';

export default function SourceSelector(props){
   
    const handleChange = (props) => {
        const s = document.getElementById('sourceSelector');
        const value = s.options[s.selectedIndex].value;
        
        props.onChange(value);
        
    }

    if(props===undefined || props.sources===undefined) {
        return "Loading...";
    }
    else{

        const sourcesOptions = props.sources.map(source=>{
            return <option value={source.id} selected={source.id===props.selectedSource}>{source.name}</option>
        })

        return (
            <select id='sourceSelector' className='source-selector' onChange={()=> handleChange(props)}>{sourcesOptions}</select>
        )
    }
}



           