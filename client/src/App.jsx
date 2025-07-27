import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favourite from './pages/Favourite'
import Footer from './components/Footer'
import { Toaster } from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import LoadingScreen from './components/LoadingScreen';
import { useAppContext } from './context/AppContext'
import { SignIn } from '@clerk/clerk-react'
import Loading from './components/Loading'

const App = () => {


  const isAdminRoute = useLocation().pathname.startsWith('/admin')

  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // Simulate loading delay or wait for real API setup
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000); // Show splash screen for 2 seconds

  //   return () => clearTimeout(timer);
  // }, []);

  // if (loading) return <LoadingScreen />;

  const { user } = useAppContext()

  return (
    <>
      <Toaster />
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/loading/:nextUrl' element={<Loading />} />
        <Route path='/favourite' element={<Favourite />} />

        <Route path='/admin/*' element={user ? <Layout /> : (<div className='min-h-screen flex justify-center items-center'>
          <SignIn fallbackRedirectUrl={'/admin'} />
        </div>)}>
          <Route index element={<Dashboard />} />
          <Route path='add-shows' element={<AddShows />} />
          <Route path='list-shows' element={<ListShows />} />
          <Route path='list-bookings' element={<ListBookings />} />
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
