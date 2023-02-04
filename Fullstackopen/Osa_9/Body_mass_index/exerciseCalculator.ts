interface Vals {
    target: number;
    numberArrays: Array<number>;
}

const parseArray = (args: Array<string>): Vals => {
    if(args.length < 4) throw new Error('Too little arguments');
    if(isNaN(Number(args[2]))) throw new Error ('Not an integer value');
    const numberArrays = [];
    for(let i = 3; i < args.length; i++){
        if(!isNaN(Number(args[i]))) {
            numberArrays.push(Number(args[i]));
        }
        else {
            throw new Error(' Provided values were not all numerical ');
        }
    }
    return{
        target: Number(args[2]),
        numberArrays: numberArrays
    };
};

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const calculate = (days: Array<number>, target: number): Result => {
    const average = days.reduce((a, b) => a + b, 0) / days.length;

    let rating = 0;
    let ratingDescription = "";

    if(average > target){
        rating = 2;
        ratingDescription = "You have exceeded the goal";
    } else if( average === target ){
        rating = 1;
        ratingDescription = "You have achieved your goal!";
    } else {
        rating = 0;
        ratingDescription = "You can achieve your goal next time !";
    }
    return {
        periodLength: days.length,
        trainingDays: days.filter( x => x !== 0 ).length,
        success: (average > target),
        average: average,
        target: target,
        rating: rating,
        ratingDescription: ratingDescription
    };
};

try{
    const{target, numberArrays}= parseArray(process.argv);
    calculate(numberArrays, target);
    console.log(calculate(numberArrays, target));
}catch(error:unknown){
    let errorMessage = 'Something bad happened. ';
    if(error instanceof Error){
        errorMessage += 'Error: ' + error.message;
    }
    console.log(errorMessage);
}

