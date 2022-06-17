import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import TicketBook from './pages/client/home/home';
import Login from './pages/client/login/login';
import SignIn from './pages/client/signin/SignIn';
import AddFlight from './pages/admin/addflight/addflight';
import Home from './pages/admin/home/home';
import BookingList from './pages/admin/bookings/bookings';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/client' element ={<TicketBook/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<SignIn/>}/>
        <Route path='/addflight' element={<AddFlight/>}/>
        <Route path='/admin' element={<Home/>}/>
        <Route path='/bookings/:id' element={<BookingList/>}/>
        

      </Routes>
    </BrowserRouter>
  );
}

export default App;