import axios from 'axios';
import {GROUP_API_URL} from '../config/backend.config';

class GroupService {
    static async getAllGroups() {
        // TODO: Implement fetching all groups from the backend
        return await axios.get(GROUP_API_URL);
    }
}

export default GroupService;