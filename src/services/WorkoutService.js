import axios from 'axios';
import https from 'https';

class WorkoutService {
    checkEmpty() {
        if (localStorage.getItem("loginKey") === "") {
            return true;
        }
        return false;
    }

    agent() {
        return new https.Agent({  
            rejectUnauthorized: false
          });
    }

    getApiUrl() {
        return "https://ec2-54-173-26-187.compute-1.amazonaws.com:443/api/v1/" + localStorage.getItem("loginKey") + "/workouts"
    }

    getWorkouts() {
        return axios.get(this.getApiUrl(), {httpsAgent: this.agent()});
    }

    createWorkout(workout) {
        return axios.post(this.getApiUrl(), workout, { httpsAgent: this.agent() });
    }

    getWorkoutById(id) {
        return axios.get(this.getApiUrl() + '/' + id, { httpsAgent: this.agent() });
    }

    updateWorkout(workout, id) {
        return axios.put(this.getApiUrl() + '/' + id, workout, { httpsAgent: this.agent() });
    }

    deleteWorkout(id) {
        return axios.delete(this.getApiUrl() + '/' + id, { httpsAgent: this.agent() });
    }
}

export default new WorkoutService();