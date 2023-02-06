const Total = ({exercises}: {exercises:number[]}) => {    
    return(
        <div> 
            Total amount of exercises completed: {exercises.reduce((sum, a) => sum + a , 0)}
        </div>
    )
}


export default Total;
