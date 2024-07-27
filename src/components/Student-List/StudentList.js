import React, {useEffect, useState} from 'react';
import {Button, Table} from "react-bootstrap";
import StudentService from "../../services/student.service";
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

const StudentList = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([])

    useEffect(() => {
        StudentService.getAllStudents().then(response => {
            console.log(response.data);
            setStudents(response.data);
        })
    }, [])

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this student?")) {
            StudentService.deleteStudentById(id).then(() => {
                setStudents(students.filter(student => student.id !== id));
                toast.success("Student deleted successfully!");
            }).catch(error => {
                toast.error("Failed to delete student.");
            });
        }
    };

    return (<div className="container">
        <h4 className="card-title text-center my-5 ">Student List</h4>
        <Table className="table">
            <thead>
            <tr>
                <th className="text-center" style={{fontWeight: 'bold'}}>#</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Name</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Email</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Date</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Group</th>
                <th className="text-center" style={{fontWeight: 'bold'}}>Action</th>
            </tr>
            </thead>
            <tbody>
            {students.map((student, index) => (
                <tr className={`table-row ${student.active ? "" : "inactive-row"}`} key={student.id}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">{student.name}</td>
                    <td className="text-center">{student.email}</td>
                    <td className="text-center">{student.date}</td>
                    <td className="text-center">{student.group.name}</td>
                    <td className="text-center">
                        <Button className='btn btn-danger' onClick={() => handleDelete(student.id)}>Delete</Button>
                        <Button className='btn btn-primary'
                                onClick={() => navigate('/student-edit/' + student.id)}>Edit</Button>
                    </td>
                </tr>))}
            </tbody>
        </Table>
        <ToastContainer/>
    </div>)
}

export default StudentList;