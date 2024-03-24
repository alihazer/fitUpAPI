const calculateFoodItemCalories= (protein, carbs, fats)=>{
    return protein*4 + carbs*4 + fats*4;
}

const calculateTotalCarbs = (foodItems) => {
    const totalCarbs = foodItems.reduce((accumulator, item) => {
        return accumulator + item.carbs;
    }, 0);
    return totalCarbs;
};

const calculateTotalProtien = (foodItems) => {
    const totalProtein = foodItems.reduce((accumulator, item) => {
        return accumulator + item.protein;
    }, 0);
    return totalProtein;
};

const calculateTotalFats = (foodItems) => {
    const totalFats = foodItems.reduce((accumulator, item) => {
        return accumulator + item.fats;
    }, 0);
    return totalFats;
};



module.exports = { calculateFoodItemCalories, calculateTotalProtien, calculateTotalCarbs, calculateTotalFats};