const DashboardLayout = ({ children }) => {
  return (
    <div className="drawer lg:drawer-open z-10">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col items-center justify-center">
        {/* Page content here */}
        <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">
          Sidebar
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Profile</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
