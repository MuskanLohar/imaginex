// import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';

// // Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Explore from './pages/Explore';
import Generate from './pages/Generate';
import Profile from './pages/Profile';
import PostDetail from './pages/PostDetail';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUsers from './pages/admin/AdminUsers';
import AdminPosts from './pages/admin/AdminPosts';
import AdminReports from './pages/admin/AdminReports';
import AdminSidebar from './components/admin/AdminSidebar';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Loader from './components/Loader';
import PrivateComponent from './components/PrivateComponent';
import PrivateAdminComponent from './components/admin/PrivateAdminComponent';

// function App() {

//   // const { user, isLoading } = useSelector(state => state.auth)
//   // const navigate = useNavigate()

//   // const [isLoggedIn, setIsLoggedIn] = useState(user ? true : false);



//   // // Layout wrapper component
//   // const AppLayout = ({ children }) => (
//   //   <div className="flex h-screen overflow-hidden">
//   //     <Sidebar />
//   //     <div className="flex-1 flex flex-col relative overflow-hidden">
//   //       <Navbar />
//   //       <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
//   //         {children}
//   //       </main>
//   //     </div>
//   //   </div>
//   // );

//   // // Protected Route wrapper
//   // const ProtectedRoute = ({ children }) => {
//   //   return <AppLayout>{children}</AppLayout>;
//   // };

//   // const AdminLayout = ({ children }) => (
//   //   <div className="flex h-screen overflow-hidden">
//   //     <AdminSidebar />
//   //     <div className="flex-1 flex flex-col overflow-hidden">
//   //       <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
//   //         {children}
//   //       </main>
//   //     </div>
//   //   </div>
//   // );

//   // const AdminRoute = ({ children }) => {
//   //   if (!isLoggedIn) return <Navigate to="/login" />;
//   //   return <AdminLayout>{children}</AdminLayout>;
//   // };


//   // useEffect(() => {
//   //   if (user) {
//   //     navigate("/feed")
//   //   }

//   //   if (!user) {
//   //     navigate("/")
//   //   }

//   // }, [user])


//   // if (isLoading) {
//   //   return (
//   //     <Loader />
//   //   )
//   // }


//   // return (
//   //   <>
//   //     <Routes>
//   //       <Route path="/" element={isLoggedIn ? <Navigate to="/feed" /> : <Landing />} />
//   //       <Route path="/login" element={<Login />} />
//   //       <Route path="/register" element={<Register />} />

//   //       {/* Protected routes */}
//   //       <Route path="/feed" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
//   //       <Route path="/explore" element={<ProtectedRoute><Explore /></ProtectedRoute>} />
//   //       <Route path="/generate" element={<ProtectedRoute><Generate /></ProtectedRoute>} />
//   //       <Route path="/profile/:username" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
//   //       <Route path="/post/:id" element={<ProtectedRoute><PostDetail /></ProtectedRoute>} />

//   //       {/* Admin routes */}
//   //       <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
//   //       <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
//   //       <Route path="/admin/posts" element={<AdminRoute><AdminPosts /></AdminRoute>} />
//   //       <Route path="/admin/reports" element={<AdminRoute><AdminReports /></AdminRoute>} />
//   //     </Routes>
//   //     <ToastContainer />
//   //   </>
//   // );

//   <h1>Hello WOrld</h1>


// }

// export default App;



const App = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden">

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />


          {/* Auth Routes */}
          <Route path='/auth' element={<PrivateComponent />}>
            <Route path='feed' element={<Feed />} />
            <Route path='post/:pid' element={<PostDetail />} />
            <Route path='explore' element={<Explore />} />
            <Route path='generate' element={<Generate />} />
            <Route path='profile/:username' element={<Profile />} />
            {/* <Route path='post/:id' element={<PostDetail />} /> */}
          </Route>


          {/*Admin Routes  */}
          <Route path='/admin' element={<PrivateAdminComponent />}>
            <Route path='dashboard' element={<AdminDashboard />} />
            <Route path='posts' element={<AdminPosts />} />
            <Route path='reports' element={<AdminReports />} />
            <Route path='users' element={<AdminUsers />} />
          </Route>

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App