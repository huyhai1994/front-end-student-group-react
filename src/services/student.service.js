import axios from 'axios';
import {STUDENT_API_URL} from "../config/backend.config";

class StudentService {
    static async getAllStudents() {
        return await axios.get(STUDENT_API_URL + '?_embed=group');
    }

    static async deleteStudent(id) {
        return await axios.delete(`STUDENT_API_URL/${id}`);
    }

    static async getStudentById(id) {
    }

    static async createStudent(student) {
        return await axios.post(`STUDENT_API_URL`, student);
    }

    static async updateStudent(id, student) {
        return await axios.put(`STUDENT_API_URL/${id}`, student);
    }

}

export default StudentService