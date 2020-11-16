import axios from 'axios';

class RunnerService {
    loginKey = "";

    setLoginKey(loginKey) {
        this.loginKey = loginKey;
    }

    getApiUrl() {
        return "http://ec2-54-173-26-187.compute-1.amazonaws.com:8080/api/v1/runner";
    }

    checkValidKey() {
        return axios.get(this.getApiUrl() + "/" + localStorage.getItem("loginKey"));
    }

    createRunner(runner) {
        return axios.post(this.getApiUrl(), runner);
    }
}
export default new RunnerService();