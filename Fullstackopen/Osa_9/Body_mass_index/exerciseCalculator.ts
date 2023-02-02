interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculate = (days: Array<number>, target: number): Result => {
    const average = days.reduce((a, b) => a + b, 0) / days.length;

    let rating = 0;
    let ratingDescription = ""

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
        success: (target / average > 1),
        average: average,
        target: target,
        rating: rating,
        ratingDescription: ratingDescription
    }
}

console.log(calculate([3, 0, 2, 4.5, 0, 3, 1], 2));
