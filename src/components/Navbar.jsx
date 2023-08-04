import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/reducers/authSlice";
import { Button, Layout } from "antd";
import { BiUser } from "react-icons/bi";
import logo from "../logo.svg";
import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    navigate("/login");
  }, [dispatch, navigate]);
  return (
    <Layout.Header className="w-full bg-gray-900 px-[5%] border-0 border-solid border-b border-b-gray-300">
      <div className="flex h-full mx-auto max-w-[1400px] justify-between gap-4 items-center">
        <div className="flex gap-2 flex-1 items-center">
          <Link to="/" className="hover:animate-pulse">
            <img src={logo} alt="logo" className="m-0 w-8 h-8 object-cover" />
          </Link>
        </div>
        {!["/login", "/register"].includes(location.pathname) ? (
          <>
            {!auth?.token ? (
              <Link to={"/login"}>
                <Button
                  icon={<BiUser />}
                  className="bg-white hover:bg-slate-300 hover:border-2 hover:border-gray-600"
                >
                  Login
                </Button>
              </Link>
            ) : (
              <Button
                icon={<BiUser />}
                onClick={handleLogout}
                className="bg-gray-900 text-white hover:text-gray-900 hover:bg-white delay-100"
              >
                Logout
              </Button>
            )}
          </>
        ) : null}
      </div>
    </Layout.Header>
  );
}

export default Navbar;
