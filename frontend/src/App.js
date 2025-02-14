import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import UserLogin from './Pages/UserLogin';
import AddDoctor from './Pages/AddDoctor';
import DoctorDetails from './Pages/DoctorDetails';
import HomePage from './Pages/HomePage';
import SearchDoctorsPage from './Pages/SearchDoctorsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={ <UserLogin/>} />
        <Route path='/homePage' element={< HomePage />} />
        <Route path='/doctor/add-doctor' element={ <AddDoctor/>} />
        <Route path='/doctor/search-doctor' element={ <SearchDoctorsPage/>} />
        <Route path='/doctor/:doctorId' element={ <DoctorDetails/>} />
      </Routes>
    </Router>
  );
}

export default App;
