import './App.css';
import StudentList from "./components/Student-List/StudentList";
import {Route, Routes} from "react-router-dom";
import StudentAdd from "./components/Student-Add/StudentAdd";
import StudentEdit from "./components/Student-Edit/StudentEdit";

function App() {
    return (<>
        <Routes>
            <Route path="/" element={<StudentList/>}/>
            <Route path="student-add" element={<StudentAdd/>}></Route>
            <Route path="student-edit/:id" element={<StudentEdit/>}></Route>
        </Routes>
    </>);
}

export default App;
