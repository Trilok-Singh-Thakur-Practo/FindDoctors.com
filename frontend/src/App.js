import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import AddDoctor from './Pages/AddDoctor';
import DoctorDetailsPage from './Pages/DoctorDetailsPage';
import SearchDoctorsPage from './Pages/SearchDoctorsPage';
import SearchPracticesPage from './Pages/SearchPracticesPage';
import PracticeDetailsPage from './Pages/PracticeDetailsPage';
import HomePage from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import UserHomePage from './Pages/UserHomePage';
import HeaderPage from './Pages/HeaderPage';

function App() {
  return (
    <Router>
      <HeaderPage />
      <Routes >
        <Route path='/' element={ <HomePage/>} />

        <Route path='/login' element={ <LoginPage/>} />
        <Route path='/user-home' element={ <UserHomePage/>} />
        <Route path='/doctor/search-doctor' element={ <SearchDoctorsPage/>} />

        <Route path='/doctor/add-doctor' element={ <AddDoctor/>} />
        <Route path='/doctor/:doctorId' element={ <DoctorDetailsPage/>} />
        <Route path='/practice/search-practice' element = {< SearchPracticesPage />} />
        <Route path='/practice/:practiceId' element = {< PracticeDetailsPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
