import Sidebar from "../components/Sidebar";

const UserLayout = ({ children }) => {



  return (

    <div className="app">

      <Sidebar role="USER" />

      <div className="main">
        {children}
      </div>

    </div>
  );
};

export default UserLayout;