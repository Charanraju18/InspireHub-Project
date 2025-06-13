import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import $ from "jquery";
import "select2/dist/css/select2.min.css";
import "select2/dist/js/select2.full.min.js";
import "select2";
import { useAuth } from "../authContext";

const HeaderOne = () => {
  let { pathname } = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  const [scroll, setScroll] = useState(false);
  const [isMenuActive, setIsMenuActive] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      import("select2").then(() => {
        const selectElement = $(".js-example-basic-single");
        if (selectElement.length > 0) {
          selectElement.select2(); // Initialize Select2
        }
      });
    }

    window.onscroll = () => {
      if (window.pageYOffset < 150) {
        setScroll(false);
      } else if (window.pageYOffset > 150) {
        setScroll(true);
      }
      return () => (window.onscroll = null);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
    if (!isMenuActive) {
      document.body.classList.add("scroll-hide-sm");
    } else {
      document.body.classList.remove("scroll-hide-sm");
    }
  };

  const closeMenu = () => {
    setIsMenuActive(false);
    document.body.classList.remove("scroll-hide-sm");
  };

  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmenuClick = (index) => {
    if (windowWidth < 992) {
      setActiveSubmenu((prevIndex) => (prevIndex === index ? null : index));
    }
  };

  // Profile tab logic
  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/sign-in");
    }
  };

  // Header right user icon logic
  const handleUserIconClick = () => {
    if (isAuthenticated) {
      logout();
      navigate("/"); // Redirect to home page after logout
    } else {
      navigate("/sign-in");
    }
  };

  const menuItems = [
    { to: "/about", label: "About" },
    { to: "/roadmaps", label: "Roadmaps" },
    { to: "/events", label: "Live Events" },
    { to: "/instructor", label: "Instructors" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <div className={`side-overlay ${isMenuActive ? "show" : ""}`}></div>
      <header className={`header ${scroll ? "fixed-header" : ""}`}>
        <div className="container container--xl">
          <nav className="header-inner flex-between gap-8">
            <div className="header-content-wrapper flex-align flex-grow-1">
              {/* Logo Start */}
              <div className="logo">
                <Link to="/" className="link">
                  <img src="assets/images/logo/logo.png" alt="Logo" />
                </Link>
              </div>
              {/* Logo End  */}
              {/* Select Start */}
              {/* <div className="d-sm-block d-none">
                <div className="header-select border border-neutral-30 bg-main-25 rounded-pill position-relative">
                  <span className="select-icon position-absolute top-50 translate-middle-y inset-inline-start-0 z-1 ms-lg-4 ms-12 text-xl pointer-event-none d-flex">
                    <i className="ph-bold ph-squares-four" />
                  </span>
                  <select
                    className="js-example-basic-single border-0"
                    name="state"
                    defaultValue="categories"
                  >
                    <option value={"Categories"}>Categories</option>
                    <option value={"Design"}>Design</option>
                    <option value={"Development"}>Development</option>
                    <option value={"Architecture"}>Architecture</option>
                    <option value={"Life Style"}>Life Style</option>
                    <option value={"Data Science"}>Data Science</option>
                    <option value={"Marketing"}>Marketing</option>
                    <option value={"Music"}>Music</option>
                    <option value={"Typography"}>Typography</option>
                    <option value={"Finance"}>Finance</option>
                    <option value={"Motivation"}>Motivation</option>
                  </select>
                </div>
              </div> */}
              {/* Select End */}
              {/* Menu Start  */}
              <div className="header-menu d-lg-block d-none">
                <ul className="nav-menu flex-align">
                  {menuItems.map((item, index) =>
                    item.links ? (
                      <li
                        key={`menu-item-${index}`}
                        className="nav-menu__item has-submenu"
                      >
                        <span to="#" className="nav-menu__link">
                          {item.label}
                        </span>
                        <ul className={`nav-submenu scroll-sm`}>
                          {item.links.map((link, linkIndex) => (
                            <li
                              key={`submenu-item-${linkIndex}`}
                              className={`nav-submenu__item ${
                                pathname === link.to && "activePage"
                              }`}
                            >
                              <a
                                href={link.to}
                                className="nav-submenu__link hover-bg-neutral-30"
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li
                        key={`menu-contact-${index}`}
                        className={`nav-menu__item ${
                          pathname === item.to && "activePage"
                        }`}
                      >
                        <a href={item.to} className="nav-menu__link">
                          {item.label}
                        </a>
                      </li>
                    )
                  )}
                  {/* Profile tab beside Contact */}
                  {/* REMOVE underline and icon from Profile tab */}
                  {/* <li className='nav-menu__item'>
                    <button
                      onClick={handleProfileClick}
                      className='nav-menu__item btn btn-link p-0 text-main-600'
                      style={{ fontWeight: 600, fontSize: "1rem", textDecoration: "none" }}
                    >
                      Profile
                    </button>
                  </li> */}
                </ul>
              </div>
              {/* Menu End  */}
            </div>
            {/* Header Right start */}
            <div className="header-right flex-align">
              {isAuthenticated && (
                <>
                  <button
                    className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
                    style={{ marginRight: 8 }}
                    title="Wishlist"
                    onClick={() => navigate("/wishlist")}
                  >
                    <i className="ph ph-heart" />
                  </button>
                  <button
                    onClick={handleProfileClick}
                    className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
                    style={{ marginRight: 8 }}
                    title="Profile"
                  >
                    <i className="ph ph-user-circle" />
                  </button>
                </>
              )}
              <button
                onClick={handleUserIconClick}
                className="info-action w-52 h-52 bg-main-25 hover-bg-main-600 border border-neutral-30 rounded-circle flex-center text-2xl text-neutral-500 hover-text-white hover-border-main-600"
                style={{ marginRight: 8 }}
                title={isAuthenticated ? "Sign Out" : "Sign In"}
              >
                <i
                  className={`ph ${
                    isAuthenticated ? "ph-sign-out" : "ph-user-circle"
                  }`}
                />
              </button>
              <button
                type="button"
                className="toggle-mobileMenu d-lg-none text-neutral-200 flex-center"
                onClick={toggleMenu}
              >
                <i className="ph ph-list" />
              </button>
            </div>
            {/* Header Right End  */}
          </nav>
        </div>
      </header>

      <div
        className={`mobile-menu scroll-sm d-lg-none d-block ${
          isMenuActive ? "active" : ""
        }`}
      >
        <button type="button" className="close-button" onClick={closeMenu}>
          <i className="ph ph-x" />{" "}
        </button>
        <div className="mobile-menu__inner">
          <Link to="/" className="mobile-menu__logo">
            <img src="assets/images/logo/logo.png" alt="Logo" />
          </Link>
          <div className="mobile-menu__menu">
            <ul className="nav-menu flex-align nav-menu--mobile">
              {menuItems.map((item, index) =>
                item.links ? (
                  <li
                    key={`menu-item-${index}`}
                    className={`nav-menu__item has-submenu ${
                      activeSubmenu === index ? "activePage" : ""
                    }`}
                    onClick={() => handleSubmenuClick(index)}
                  >
                    <span className="nav-menu__link">{item.label}</span>
                    <ul className={`nav-submenu scroll-sm`}>
                      {item.links.map((link, linkIndex) => (
                        <li key={linkIndex} className="nav-submenu__item">
                          <Link
                            to={link.to}
                            className="nav-submenu__link hover-bg-neutral-30"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li
                    className={`nav-menu__item ${
                      pathname === item.to && "activePage"
                    }`}
                    key={index}
                  >
                    <Link to={item.to} className="nav-menu__link">
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <div className="d-sm-none d-block mt-24">
              <div className="header-select mobile border border-neutral-30 bg-main-25 rounded-pill position-relative">
                <span className="select-icon position-absolute top-50 translate-middle-y inset-inline-start-0 z-1 ms-lg-4 ms-12 text-xl pointer-event-none d-flex">
                  <i className="ph-bold ph-squares-four" />
                </span>
                <select
                  className="js-example-basic-single border-0"
                  name="state"
                >
                  <option value={"Categories"}>Categories</option>
                  <option value={"Design"}>Design</option>
                  <option value={"Development"}>Development</option>
                  <option value={"Architecture"}>Architecture</option>
                  <option value={"Life Style"}>Life Style</option>
                  <option value={"Data Science"}>Data Science</option>
                  <option value={"Marketing"}>Marketing</option>
                  <option value={"Music"}>Music</option>
                  <option value={"Typography"}>Typography</option>
                  <option value={"Finance"}>Finance</option>
                  <option value={"Motivation"}>Motivation</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderOne;
