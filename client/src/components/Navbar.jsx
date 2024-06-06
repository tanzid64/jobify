import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft } from "react-icons/fa";
import Logo from "./Logo";
import { useDashboardContext } from "../pages/DashboardLayout";
import ThemeToggle from "./ThemeToggle";
import LogoutContainer from "./LogoutContainer";

const Navbar = () => {
  const { toggleSidebar } = useDashboardContext();
  return (
    <Wrapper>
      <div className="nav-center">
        {/* SideBar toggler */}
        <button className="toggle-btn" onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        {/* Logo */}
        <div>
          <Logo />
          <h4 className="logo-text">dashboard</h4>
        </div>
        {/* Buttons */}
        <div className="btn-container">
          <div className="btn-container">
            <ThemeToggle />
            <LogoutContainer />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
export default Navbar;
