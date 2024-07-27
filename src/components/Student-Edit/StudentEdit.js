import React, {useEffect} from 'react'
import {useNavigate, useParams} from "react-router-dom";
import * as Yup from "yup";
import {useFormik} from "formik";
import StudentService from "../../services/student.service";
import GroupService from "../../services/group.service";

const StudentEdit = () => {
    const [student, setStudent] = React.useState(null)
    const [groups, setGroups] = React.useState([])
    const {id} = useParams();
    const navigate = useNavigate();


    const editSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("email is required"),
        date: Yup.date().required("date is required"),
        group: Yup.string().required("Group is required")
    })
    const editForm = useFormik({
        initialValues: {
            name: '', email: '', date: '', group: ''
        }, validationSchema: editSchema, onSubmit: values => {
            const group = groups.find(g => g.name === values.group);
            const updatedStudent = {...values, groupId: group.id}
            StudentService.updateStudent(id, updatedStudent).then(response => {
                alert("update succeeded");
                navigate('/');
            })
        }
    })

    function getGroupById(groupId, groups) {
        return groups.find(g => g.id === groupId)?.name || 'Unknown';
    }

    useEffect(() => {
        GroupService.getAllGroups()
            .then(response => {
                setGroups(response.data);
            })
            .catch(error => {
                console.error('Error fetching groups: ', error);
            });
        StudentService.getStudentById(id)
            .then(response => {
                setStudent(response.data);
                editForm.setValues({
                    name: response.data.name,
                    email: response.data.email,
                    date: response.data.date,
                    group: getGroupById(response.data.groupId, groups)
                });
            })
            .catch(error => {
                console.error('Error fetching student: ', error);
            });


    }, [])

    return (<>
        <div className='container'>
            <h1 className='text-center'>Edit Student</h1>
            <form className='border p-3 rounded-3' onSubmit={editForm.handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputName" className="form-label">Name</label>
                    <input type="text" name="name" value={editForm.values.name} onChange={editForm.handleChange}
                           className="form-control"
                           id="exampleInputName"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" name="email" value={editForm.values.email} className="form-control"
                           onChange={editForm.handleChange}
                           id="email"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="group" className="form-label">Group</label>
                    <select name="group" className="form-control" id="group" value={editForm.values.group}
                            onChange={editForm.handleChange}>
                        <option value="">Select Group</option>
                        {groups.map(group => (<option key={group.id} value={group.name}>
                            {group.name}
                        </option>))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary w-100">Submit</button>
            </form>
        </div>

    </>)
}
export default StudentEdit
