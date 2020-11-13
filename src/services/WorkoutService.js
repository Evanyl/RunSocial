import axios from 'axios';

const WORKOUT_API_DATABASE_URL = "http://localhost:8080/api/v1/1/workouts";

class WorkoutService {

    getWorkouts() {
        return axios.get(WORKOUT_API_DATABASE_URL);
    }

    createWorkout(workout) {
        return axios.post(WORKOUT_API_DATABASE_URL, workout);
    }

    getWorkoutById(id) {
        return axios.get(WORKOUT_API_DATABASE_URL + '/' + id);
    }

    updateWorkout(workout, id) {
        return axios.put(WORKOUT_API_DATABASE_URL + '/' + id, workout);
    }
}

export default new WorkoutService();