import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Members from './pages/Members';
import Events from './pages/Events';

import Achievement from './pages/Achievement';
import Media from './pages/Media';


// New Admin imports
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './pages/Admin/DashboardLayout';
import Overview from './pages/Admin/Overview';
import ManageEvents from './pages/Admin/ManageEvents';
import ManageMedia from './pages/Admin/ManageMedia';
import ManageMembers from './pages/Admin/ManageMembers';
import ManageAchievements from './pages/Admin/ManageAchievements';
import ManageAdmins from './pages/Admin/ManageAdmins';
import ManageAbout from './pages/Admin/ManageAbout';

// Create a simple PublicLayout wrapper
const PublicLayout = () => {
  return (
    <>
      <Navbar />
      <div className="page-wrapper">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Routes>
      {/* Admin Dashboard Routes (No public Navbar/Footer here) */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Overview />} />
        <Route path="events" element={<ManageEvents />} />
        <Route path="media" element={<ManageMedia />} />
        <Route path="members" element={<ManageMembers />} />
        <Route path="achievements" element={<ManageAchievements />} />
        <Route path="users" element={<ManageAdmins />} />
        <Route path="about" element={<ManageAbout />} />
      </Route>

      {/* Public Routes with standard layout */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/members" element={<Members />} />
        <Route path="/events" element={<Events />} />

        <Route path="/achievement" element={<Achievement />} />
        <Route path="/media" element={<Media />} />

        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
