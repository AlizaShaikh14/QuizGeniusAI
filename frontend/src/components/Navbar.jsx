const Navbar = ({ title, subtitle }) => {

  const username = localStorage.getItem("username");

  return (
    <div className="navbar">

      <div>
        <h1>{title}, {username} 👋</h1>
        <p>{subtitle}</p>
      </div>

      <button
        className="btn"
        onClick={() => {
          document.body.classList.toggle("dark");
        }}
      >
        Dark Mode
      </button>

    </div>
  );
};

export default Navbar;