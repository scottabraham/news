import React from 'react';

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

        const sourcesOptions = props.sources.map((source, i)=>{
            return <option key={i} value={source.id}>{source.name}</option>
        })

        return (
            <select id='sourceSelector' className='source-selector' value={props.selectedSource} onChange={()=> handleChange(props)}>{sourcesOptions}</select>
        )
    }
}



           