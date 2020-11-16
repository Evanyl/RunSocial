import axios from 'axios';

class WorkoutService {
    loginKey = ""

    setLoginKey(loginKey) {
        this.loginKey = loginKey;
    }

    checkEmpty() {
        if (localStorage.getItem("loginKey") === "") {
            return true;
        }
        return false;
    }

    getApiUrl() {
        return "http://ec2-54-173-26-187.compute-1.amazonaws.com:8080/api/v1/" + localStorage.getItem("loginKey") + "/workouts"
    }

    getWorkouts() {
        return axios.get(this.getApiUrl());
    }

    createWorkout(workout) {
        return axios.post(this.getApiUrl(), workout);
    }

    getWorkoutById(id) {
        return axios.get(this.getApiUrl() + '/' + id);
    }

    updateWorkout(workout, id) {
        return axios.put(this.getApiUrl() + '/' + id, workout);
    }

    deleteWorkout(id) {
        return axios.delete(this.getApiUrl() + '/' + id);
    }
}

export default new WorkoutService();