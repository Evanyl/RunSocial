import axios from 'axios';
import https from 'https';

class RunnerService {

    getApiUrl() {
        return "https://runsocial.xyz/api/v1/runner";
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