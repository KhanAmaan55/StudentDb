import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import StudentList from './pages/student_list/StudentList';
import { AddStudent } from './pages/add_student/AddStudent';
import { EditStudent } from './pages/edit_student/EditStudent';
import { AddUpdateStudent } from './pages/add_update/AddUpdate';
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<StudentList />}></Route>
          <Route exact path='/add-update/:id?' element={<AddUpdateStudent />}></Route>
          <Route exact path='/edit-student/:id' element={<EditStudent />}></Route>
          <Route exact path='/add-student' element={< AddStudent />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
