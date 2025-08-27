function Button(props){
    return(
        <div 
        className="button" 
        style={{width:props.width, backgroundColor:props.color}}
        onClick={props.onClickFunction}>{props.buttonName}</div>
    )
}

export default Button