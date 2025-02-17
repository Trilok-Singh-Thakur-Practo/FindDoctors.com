import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import AddDoctorPage from './Pages/AddDoctorPage';
import DoctorDetailsPage from './Pages/DoctorDetailsPage';
import SearchDoctorsPage from './Pages/SearchDoctorsPage';
import SearchPracticesPage from './Pages/SearchPracticesPage';
import PracticeDetailsPage from './Pages/PracticeDetailsPage';
import LoginPage from './Pages/LoginPage';
import UserHomePage from './Pages/UserHomePage';
import HeaderPage from './Pages/HeaderPage';
import AddSpecialityPage from './Pages/AddSpecialityPage';
import AddPracticePage from './Pages/AddPracticePage';
import AdminHomePage from './Pages/AdminHomePage';

function App() {
  return (
    <Router>
      <HeaderPage />
      <Routes >

        <Route path='/' element={ <LoginPage/>} />
        <Route path='/login' element={ <LoginPage/>} />
        <Route path='/admin-home' element={ <AdminHomePage/>} />
        <Route path='/user-home' element={ <UserHomePage/>} />
        <Route path='/doctor/search-doctor' element={ <SearchDoctorsPage/>} />
        <Route path='/doctor/:doctorId' element={ <DoctorDetailsPage/>} />
        <Route path='/doctor/add-doctor' element={ <AddDoctorPage/>} />
        <Route path='/practice/search-practice' element = {< SearchPracticesPage />} />
        <Route path='/practice/:practiceId' element = {< PracticeDetailsPage/>} />
        <Route path='/practice/add-practice' element = {< AddPracticePage/>} />

        <Route path='/speciality/add-speciality' element={<AddSpecialityPage/>} />

      </Routes>
    </Router>
  );
}

export default App;
