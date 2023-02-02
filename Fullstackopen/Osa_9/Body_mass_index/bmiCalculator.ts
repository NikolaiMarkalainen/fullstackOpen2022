interface Values {
    num1: number;
    num2: number;
}


const parseArguments = (args: Array<string>): Values => {
    if(args.length > 4) throw new Error('Too many arguments');
    if(args.length < 4) throw new Error('Not enough arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return{
            num1: Number(args[2]),
            num2: Number(args[3])
        }
    }
    else{
        throw new Error('Provided values are not numbers');
    }
}

interface Calculations {
    bmi: number;
    desc: string;
}

const calculateBmi = (height: number, mass: number): Calculations => {
    const BMI = (mass / height / height) * 10000;
    let description: string = '';
    if(BMI < 18.5){
        description = "Underweight (Unhealthy Weight)";
    }
    else if(BMI >= 18.5 && BMI <= 24.9){
        description = "Normal (Healthy Weight)";
    }
    else if(BMI > 25 && BMI <= 29.9){
        description = "Overweight (Unhealthy Weight)";
    }
    else if(BMI > 30){
        description = "Obese (Very Unhealthy Weight)";
    }
    return {
        bmi: BMI,
        desc: description 
    }
}
try{
    const{num1,num2} = parseArguments(process.argv);
    calculateBmi(num1, num2);
    console.log(calculateBmi(num1,num2));
}catch(error:unknown){
    let errorMessage = 'Something bad happened.'
    if(error instanceof Error){
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}
