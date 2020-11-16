import axios from 'axios';
import https from 'https';

class RunnerService {

    getApiUrl() {
        return "https://ec2-54-173-26-187.compute-1.amazonaws.com/api/v1/runner";
    }

    agent() {
        return new https.Agent({  
            rejectUnauthorized: false
          });
    }

    checkValidKey() {
        return axios.get(this.getApiUrl() + "/" + localStorage.getItem("loginKey"), { httpsAgent: this.agent() });
    }

    createRunner(runner) {
        return axios.post(this.getApiUrl(), runner, { httpsAgent: this.agent() });
    }
}
export default new RunnerService();