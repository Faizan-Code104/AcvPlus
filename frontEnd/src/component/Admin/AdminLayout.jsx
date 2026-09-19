import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  BarChart3,
  Bell,
  ChevronDown,
  LayoutDashboard,
  LogOut,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  Store,
  User,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   ACV PLUS ADMIN LAYOUT
========================================================= */

const AdminLayout = ({ children }) => {
  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);

  const [
    profileOpen,
    setProfileOpen,
  ] = useState(false);

  const [
    searchOpen,
    setSearchOpen,
  ] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const profileRef = useRef(null);

  /* =======================================================
     MENU ITEMS
  ======================================================= */

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
  ];

  /* =======================================================
     ACTIVE ROUTE
  ======================================================= */

  const isActive = (path) => {
    if (path === "/admin") {
      return (
        location.pathname === "/admin" ||
        location.pathname ===
          "/admin/dashboard"
      );
    }

    return location.pathname.startsWith(
      path
    );
  };

  /* =======================================================
     CLOSE SIDEBAR ON ROUTE CHANGE
  ======================================================= */

  useEffect(() => {
    setSidebarOpen(false);
    setProfileOpen(false);
    setSearchOpen(false);
  }, [location.pathname]);

  /* =======================================================
     MOBILE BODY LOCK
  ======================================================= */

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow =
        "hidden";
    } else {
      document.body.style.overflow =
        "";
    }

    return () => {
      document.body.style.overflow =
        "";
    };
  }, [sidebarOpen]);

  /* =======================================================
     CLOSE PROFILE WHEN CLICKING OUTSIDE
  ======================================================= */

  useEffect(() => {
    const handleOutsideClick = (
      event
    ) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     LOGOUT
  ======================================================= */

  const handleLogout = () => {
    localStorage.removeItem(
      "acvplus-token"
    );

    localStorage.removeItem(
      "acvplus-user"
    );

    setProfileOpen(false);

    navigate("/login", {
      replace: true,
    });
  };

  /* =======================================================
     PAGE TITLE
  ======================================================= */

  const getPageTitle = () => {
    if (
      location.pathname === "/admin" ||
      location.pathname ===
        "/admin/dashboard"
    ) {
      return "Dashboard";
    }

    if (
      location.pathname.startsWith(
        "/admin/products"
      )
    ) {
      return "Products";
    }

    if (
      location.pathname.startsWith(
        "/admin/orders"
      )
    ) {
      return "Orders";
    }

    if (
      location.pathname.startsWith(
        "/admin/users"
      )
    ) {
      return "Users";
    }

    return "Management Panel";
  };

  return (
    <div className="min-h-screen bg-[#F1F6FF] text-[#263B63]">
      {/* =================================================
          MOBILE OVERLAY
      ================================================= */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-[#10285D]/45 backdrop-blur-[2px] lg:hidden"
        />
      )}

      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-[#D6E2F7] bg-white shadow-[10px_0_40px_rgba(16,40,93,0.04)] transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
        }`}
      >
        {/* ===============================================
            SIDEBAR LOGO
        =============================================== */}

        <div className="flex h-[82px] items-center justify-between border-b border-[#D6E2F7] px-6">
          <Link
            to="/admin"
            onClick={() =>
              setSidebarOpen(false)
            }
            aria-label="ACV Plus Admin"
            className="flex items-center"
          >
            <img
              src="/logo.png"
              alt="ACV Plus"
              className="h-[48px] w-auto max-w-[180px] object-contain"
            />
          </Link>

          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#263B63]/60 transition-all hover:bg-[#E8F1FF] hover:text-[#183A7A] lg:hidden"
          >
            <X
              size={19}
              strokeWidth={1.8}
            />
          </button>
        </div>

        {/* ===============================================
            ADMIN LABEL
        =============================================== */}

        <div className="px-6 pb-2 pt-7">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F1FF] px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3569C8]" />

            <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#183A7A]">
              Administration
            </span>
          </div>
        </div>

        {/* ===============================================
            MAIN NAVIGATION
        =============================================== */}

        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#263B63]/40">
            Main Menu
          </p>

          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active =
                isActive(item.path);

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() =>
                    setSidebarOpen(false)
                  }
                  className={`group relative flex min-h-[48px] items-center gap-3 overflow-hidden rounded-[13px] px-4 text-[13px] font-semibold transition-all duration-200 ${
                    active
                      ? "bg-[#183A7A] text-white shadow-[0_8px_22px_rgba(24,58,122,0.16)]"
                      : "text-[#263B63]/70 hover:bg-[#F1F6FF] hover:text-[#183A7A]"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] transition-colors ${
                      active
                        ? "bg-white/10 text-white"
                        : "bg-[#F1F6FF] text-[#3569C8] group-hover:bg-white"
                    }`}
                  >
                    <Icon
                      size={17}
                      strokeWidth={
                        active ? 2.2 : 1.9
                      }
                    />
                  </div>

                  <span>
                    {item.name}
                  </span>

                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#AFC8FF]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* =============================================
              MANAGEMENT
          ============================================= */}

          <div className="mt-8">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-[#263B63]/40">
              Management
            </p>

            <div className="space-y-1.5">
              <button
                type="button"
                className="group flex min-h-[48px] w-full items-center gap-3 rounded-[13px] px-4 text-[13px] font-semibold text-[#263B63]/65 transition-all hover:bg-[#F1F6FF] hover:text-[#183A7A]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#F1F6FF] text-[#3569C8] transition-colors group-hover:bg-white">
                  <BarChart3
                    size={17}
                    strokeWidth={1.9}
                  />
                </div>

                Analytics
              </button>

              <button
                type="button"
                className="group flex min-h-[48px] w-full items-center gap-3 rounded-[13px] px-4 text-[13px] font-semibold text-[#263B63]/65 transition-all hover:bg-[#F1F6FF] hover:text-[#183A7A]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[#F1F6FF] text-[#3569C8] transition-colors group-hover:bg-white">
                  <Settings
                    size={17}
                    strokeWidth={1.9}
                    className="transition-transform duration-300 group-hover:rotate-45"
                  />
                </div>

                Settings
              </button>
            </div>
          </div>
        </nav>

        {/* ===============================================
            SIDEBAR BOTTOM
        =============================================== */}

        <div className="border-t border-[#D6E2F7] p-4">
          <Link
            to="/"
            onClick={() =>
              setSidebarOpen(false)
            }
            className="group flex min-h-[46px] items-center gap-3 rounded-[12px] px-4 text-[13px] font-semibold text-[#263B63]/65 transition-all hover:bg-[#E8F1FF] hover:text-[#183A7A]"
          >
            <Store
              size={18}
              strokeWidth={1.9}
              className="text-[#3569C8]"
            />

            <span>View Store</span>
          </Link>

          {/* ADMIN PROFILE */}

          <div className="mt-3 flex items-center gap-3 rounded-[15px] border border-[#D6E2F7] bg-[#F1F6FF] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#183A7A] text-[13px] font-bold text-white">
              A
            </div>

            <div className="min-w-0">
              <p className="truncate text-[13px] font-bold text-[#10285D]">
                Admin User
              </p>

              <p className="mt-0.5 truncate text-[10px] font-medium text-[#263B63]/50">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* =================================================
          MAIN AREA
      ================================================= */}

      <div className="lg:pl-[270px]">
        {/* ===============================================
            TOP BAR
        =============================================== */}

        <header className="sticky top-0 z-30 border-b border-[#D6E2F7] bg-white/95 backdrop-blur-xl">
          <div className="flex h-[82px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            {/* LEFT */}

            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                aria-label="Open sidebar"
                onClick={() =>
                  setSidebarOpen(true)
                }
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[11px] border border-[#D6E2F7] bg-[#F1F6FF] text-[#183A7A] transition-all hover:bg-[#E8F1FF] lg:hidden"
              >
                <Menu
                  size={20}
                  strokeWidth={1.8}
                />
              </button>

              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#3569C8]">
                  ACV Plus Admin
                </p>

                <h1 className="mt-1 truncate text-[20px] font-bold tracking-[-0.025em] text-[#10285D] sm:text-[22px]">
                  {getPageTitle()}
                </h1>
              </div>
            </div>

            {/* RIGHT */}

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              {/* SEARCH */}

              <div className="relative hidden xl:block">
                <div className="flex h-[42px] w-[230px] items-center gap-2 rounded-full border border-[#D6E2F7] bg-[#F1F6FF] px-4 transition-all focus-within:border-[#AFC8FF] focus-within:bg-white">
                  <Search
                    size={16}
                    strokeWidth={1.8}
                    className="shrink-0 text-[#3569C8]"
                  />

                  <input
                    type="text"
                    placeholder="Search admin..."
                    className="min-w-0 flex-1 border-0 bg-transparent text-[12px] text-[#10285D] outline-none placeholder:text-[#263B63]/40"
                  />
                </div>
              </div>

              <button
                type="button"
                aria-label="Search"
                onClick={() =>
                  setSearchOpen(
                    (current) => !current
                  )
                }
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#263B63]/60 transition-all hover:bg-[#E8F1FF] hover:text-[#183A7A] xl:hidden"
              >
                <Search
                  size={18}
                  strokeWidth={1.8}
                />
              </button>

              {/* NOTIFICATION */}

              <button
                type="button"
                aria-label="Notifications"
                className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#263B63]/60 transition-all hover:bg-[#E8F1FF] hover:text-[#183A7A]"
              >
                <Bell
                  size={18}
                  strokeWidth={1.8}
                />

                <span className="absolute right-[9px] top-[8px] h-[7px] w-[7px] rounded-full bg-[#3569C8] ring-2 ring-white" />
              </button>

              <div className="hidden h-8 w-px bg-[#D6E2F7] sm:block" />

              {/* PROFILE */}

              <div
                ref={profileRef}
                className="relative"
              >
                <button
                  type="button"
                  onClick={() =>
                    setProfileOpen(
                      (current) =>
                        !current
                    )
                  }
                  className="flex items-center gap-2 rounded-full py-1 pl-1 pr-2 transition-all hover:bg-[#F1F6FF]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#183A7A] text-[12px] font-bold text-white">
                    A
                  </div>

                  <div className="hidden text-left md:block">
                    <p className="text-[11px] font-bold text-[#10285D]">
                      Admin User
                    </p>

                    <p className="mt-0.5 text-[9px] font-medium text-[#263B63]/45">
                      Administrator
                    </p>
                  </div>

                  <ChevronDown
                    size={14}
                    strokeWidth={1.8}
                    className={`hidden text-[#263B63]/45 transition-transform duration-200 md:block ${
                      profileOpen
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                </button>

                {/* =======================================
                    PROFILE DROPDOWN
                ======================================= */}

                {profileOpen && (
                  <div className="absolute right-0 top-[52px] w-[220px] overflow-hidden rounded-[16px] border border-[#D6E2F7] bg-white p-2 shadow-[0_18px_45px_rgba(16,40,93,0.14)]">
                    <div className="mb-2 rounded-[12px] bg-[#F1F6FF] px-3 py-3">
                      <p className="text-[12px] font-bold text-[#10285D]">
                        Admin User
                      </p>

                      <p className="mt-1 text-[10px] text-[#263B63]/50">
                        ACV Plus
                        Administrator
                      </p>
                    </div>

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-[12px] font-semibold text-[#263B63]/70 transition-colors hover:bg-[#F1F6FF] hover:text-[#183A7A]"
                    >
                      <User
                        size={16}
                        strokeWidth={1.8}
                      />

                      My Profile
                    </button>

                    <button
                      type="button"
                      className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-[12px] font-semibold text-[#263B63]/70 transition-colors hover:bg-[#F1F6FF] hover:text-[#183A7A]"
                    >
                      <Settings
                        size={16}
                        strokeWidth={1.8}
                      />

                      Settings
                    </button>

                    <div className="my-2 h-px bg-[#D6E2F7]" />

                    <button
                      type="button"
                      onClick={
                        handleLogout
                      }
                      className="flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-[12px] font-semibold text-red-500 transition-colors hover:bg-red-50"
                    >
                      <LogOut
                        size={16}
                        strokeWidth={1.8}
                      />

                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* =============================================
              MOBILE / TABLET SEARCH
          ============================================= */}

          {searchOpen && (
            <div className="border-t border-[#D6E2F7] bg-white px-4 py-3 xl:hidden">
              <div className="mx-auto flex h-[44px] max-w-[600px] items-center gap-2 rounded-full border border-[#D6E2F7] bg-[#F1F6FF] px-4">
                <Search
                  size={16}
                  strokeWidth={1.8}
                  className="shrink-0 text-[#3569C8]"
                />

                <input
                  type="text"
                  autoFocus
                  placeholder="Search admin..."
                  className="min-w-0 flex-1 border-0 bg-transparent text-[12px] text-[#10285D] outline-none placeholder:text-[#263B63]/40"
                />

                <button
                  type="button"
                  aria-label="Close search"
                  onClick={() =>
                    setSearchOpen(false)
                  }
                  className="flex h-7 w-7 items-center justify-center rounded-full text-[#263B63]/50 hover:bg-white hover:text-[#183A7A]"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          )}
        </header>

        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <main className="min-h-[calc(100vh-82px)] bg-[#F1F6FF] p-4 sm:p-6 lg:p-8">
          <section className="mx-auto max-w-[1600px]">
            {children}
          </section>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;