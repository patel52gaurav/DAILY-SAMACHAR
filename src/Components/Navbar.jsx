import dailySamachaar from "../assets/dailySamachaar.svg";

const Navbar = ({ setCategory }) => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary position-fixed w-100"
      style={{ zIndex: 1000}}
    >
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{ background: "#87CEEB", borderRadius: "10px",  padding:"8px"  }}
      >
        <a
          className="navbar-brand d-flex align-items-center"
          href="#"
          style={{ textAlign: "center" }}
        >
          <span className="badge bg-light text-dark fs-4 d-flex align-items-center">
            <img
              src={dailySamachaar}
              alt="Daily Samachaar"
              style={{ height: "30px", width: "30px", marginRight: "8px"}}
            />
            Daily Samachaar
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
