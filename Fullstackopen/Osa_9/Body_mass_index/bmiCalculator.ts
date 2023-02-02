const calculateBmi = (height: number, mass: number): string => {
    const BMI = (mass / height / height) * 10000

    if(BMI < 18.5){
        return "Underweight (Unhealthy Weight)"
    }
    else if(BMI >= 18.5 && BMI <= 24.9){
        return "Normal (Healthy Weight)"
    }
    else if(BMI > 25 && BMI <= 29.9){
        return "Overweight (Unhealthy Weight)"
    }
    else if(BMI > 30){
        return "Obese (Very Unhealthy Weight)"
    }
}
console.log(calculateBmi(180, 74))
