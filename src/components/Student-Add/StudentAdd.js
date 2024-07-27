import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import * as Yup from "yup";
import groupService from "../../services/group.service";
import {useFormik} from "formik";
import StudentService from "../../services/student.service";

const StudentAdd = () => {
    const navigate = useNavigate();
    const [groups, setGroups] = useState([]);

    const validateSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().required("Email is required"),
        date: Yup.date().required("Date is required"),
        group: Yup.string().required("Group is required")
    });

    useEffect(() => {
        groupService.getAllGroups().then(response => {
            setGroups(response.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: {
            name: '', email: '', date: '', group: ''
        }, validationSchema: validateSchema, onSubmit: (values, {setSubmitting, resetForm}) => {
            const group = groups.find(g => g.name === values.group);
            const studentData = {...values, groupId: group.id};
            console.log(studentData);

            StudentService.addStudent(studentData).then(response => {
                alert("Student added successfully");
                navigate('/');
            });
        }
    });

    return (<div className='container'>
        <h4 className="card-title text-center my-5">Add New Student</h4>
        <form onSubmit={formik.handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="name"
                />
                {formik.errors.name && <div className="text-danger">{formik.errors.name}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">email</label>
                <input
                    type="text"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="email"
                />
                {formik.errors.email && <div className="text-danger">{formik.errors.email}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="group" className="form-label">Group</label>
                <select
                    name="group"
                    value={formik.values.group}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="group"
                >
                    <option value="">Select Group</option>
                    {groups.map(group => (<option key={group.id} value={group.name}>
                        {group.name}
                    </option>))}
                </select>
                {formik.errors.group && <div className="text-danger">{formik.errors.group}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                    type="date"
                    name="date"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    className="form-control"
                    id="date"
                    min={new Date().toISOString().split("T")[0]} // This sets the minimum date to today
                />
                {formik.errors.date && <div className="text-danger">{formik.errors.date}</div>}
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={formik.isSubmitting}>
                Add Student
            </button>
        </form>
    </div>);
};

export default StudentAdd;