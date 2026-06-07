import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import Navbar from "../components/Navbar";
import "../styles/profile.css";

const Profile = () => {

  const username =
    localStorage.getItem("username");

  const role =
    localStorage.getItem("role");

  const Layout =
    role?.toUpperCase() === "ADMIN"
      ? AdminLayout
      : UserLayout;

  return (

    <Layout>

      <Navbar
        title="Profile"
        subtitle="Manage your account"
      />

      <div className="profile-container">

        <div className="profile-card">

          <div className="profile-avatar">
            {username?.charAt(0).toUpperCase()}
          </div>

          <h1>{username}</h1>

          <span className="profile-badge">
            {role}
          </span>

          <div className="profile-details">

            <div className="detail-box">

              <h3>📧 Email</h3>

              <p>
                {username}@gmail.com
              </p>

            </div>

            <div className="detail-box">

              <h3>🛡️ Role</h3>

              <p>
                {role}
              </p>

            </div>

          </div>

        </div>

      </div>

    </Layout>
  );
};

export default Profile;