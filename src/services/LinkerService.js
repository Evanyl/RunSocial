import axios from 'axios';
import https from 'https';

class LinkerService {
    apiUrl = "https://runsocial.xyz/api/v1/groupLinker/";

    groupsByUsername(username) {
        return axios.get(this.apiUrl + "runner/" + username);
    }

    groupsById(id) {
        return axios.get(this.apiUrl + id);
    }

    createLink(link) {
        return axios.post(this.apiUrl, link);
    }

}
export default new LinkerService();