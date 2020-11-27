import axios from 'axios';

class GroupService {
    apiUrl = "https://runsocial.xyz/api/v1/group/";

    getGroup(id) {
        return axios.get(this.apiUrl + id);
    }

    checkGroupExists(id) {
        return axios.get(this.apiUrl + "check/" + id);
    }

    updateGroup(group) {
        return axios.post(this.apiUrl, group);
    }
}
export default new GroupService();