const calculateIntensity = (exercisesIntensity) => {
  // The intensity of the workout is calculated by the average intensity of the exercises
  const intensities = {
    low: 1,
    medium: 2,
    high: 3,
  }
    let intensity = 0;
    // Calculate the intensity
    exercisesIntensity.forEach(exercise => {
        // Add the intensity of the exercise to the total intensity
        intensity += intensities[exercise.intensity];
    });
    // Divide the total intensity by the number of exercises to get the average intensity
    intensity = intensity / exercisesIntensity.length;
    // Round the average intensity to the nearest whole number
    intensity = Math.round(intensity);
    // Convrt the average intensity to a string
    if (intensity <= 1) {
        intensity = 'Low';
    } else if (intensity <= 2) {
        intensity = 'Medium';
    } else {
        intensity = 'High';
    }
  return intensity;
}

module.exports = calculateIntensity;