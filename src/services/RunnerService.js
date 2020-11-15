import axios from 'axios';
class RunnerService {
    loginKey = "";

    setLoginKey(loginKey) {
        this.loginKey = loginKey;
    }

    getApiUrl() {
        return "http://localhost:8080/api/v1/runner/" + this.loginKey;
    }

    checkValidKey() {
        return axios.get(this.getApiUrl());
    }
}
export default new RunnerService();