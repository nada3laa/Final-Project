import './App.css';
import { Outlet, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
import CustomerManagement from './components/Customers/CustomerManagement';
import CustomerForm from './components/Customers/CustomerForm';
import CustomerShow from './components/Customers/CustomerShow';
import EditCustomerForm from './components/Customers/EditCustomerForm';
import Analytics from './components/Analytics/Analytics';


function Appp() {
  return (
    <div className="App">
      <div className="AppGlass">
      <div style={{ width: '185px', height: '100vh', flexShrink: 0, backgroundColor: '#ffe0e0' }}> {/* Sidebar color and full height */}
        <Sidebar />
      </div>
        <MainDash />
        <RightSide />
        {/* Wrap Route definitions in Routes */}
        <Routes>
          <Route path="/CustomerManagement" element={<CustomerManagement />} />
          <Route path="/customer-form" element={<CustomerForm />} />
          <Route path="/customer-show/:id" element={<CustomerShow />} />
          <Route path="/CustomerEdit/:id" element={<EditCustomerForm />} /> {/* Edit customer form route */}
          <Route path="/Analytics" element={<Analytics />} />
        </Routes>
        {/* This will render the matched route component */}
        <Outlet />
      </div>
    </div>
  );
}

export default Appp;
