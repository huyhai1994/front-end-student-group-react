import React, {useEffect, useState} from 'react'
import {Table} from "react-bootstrap";
import StudentService from "../../services/student.service";

const StudentList = () => {

    const [students, setStudents] = useState([])

    useEffect(() => {
        StudentService.getAllStudents().then(response => {
            setStudents(response.data);
        })
    })


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
                <tr className="table-row">
                    <td className="text-center"> 1</td>
                    <td className="text-center"> John Doe</td>
                    <td className="text-center">email@gmail.com</td>
                    <td className="text-center"> 22/07/2024</td>
                    <td className="text-center"> C0224G1</td>
                    <td className="text-center"> Delete | Edit</td>
                </tr>
                </tbody>
            </Table>
        </div>

    )
}
export default StudentList
