import axios from 'axios';
import {STUDENT_API_URL} from "../config/backend.config";

class StudentService {
    static async getAllStudents() {
        return await axios.get(STUDENT_API_URL + '?_embed=group');
    }

    static async deleteStudentById(id) {
        return await axios.delete(STUDENT_API_URL + "/" + id);
    }


}

export default StudentService