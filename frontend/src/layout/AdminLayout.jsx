import Sidebar from "../components/Sidebar";

const AdminLayout = ({ children }) => {

  return (
    <div className="app">

      <Sidebar role="ADMIN" />

      <div className="main">
        {children}
      </div>

    </div>
  );
};

export default AdminLayout;