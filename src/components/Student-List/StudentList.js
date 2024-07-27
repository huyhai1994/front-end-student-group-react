import React, {useEffect, useState} from 'react'
import {Table} from "react-bootstrap";
import StudentService from "../../services/student.service";

const StudentList = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        StudentService.getAllStudents().then(response => {
            console.log(response.data);
            setStudents(response.data);
        })
    }, [])


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
                        <td className="text-center">Delete | Edit</td>
                    </tr>))}
                </tbody>
            </Table>
        </div>

    )
}
export default StudentList
