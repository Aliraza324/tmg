import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setRole, logout } from "../features/auth/authSlice";
import { DASHBOARD_NAV_ITEMS } from "../constants/navigation";
import { ROLES } from "../constants/roles";
import { selectUnreadCount } from "../features/notifications/notificationSlice";
import Avatar from "../components/ui/Avatar";
import Badge from "../components/ui/Badge";
import Drawer from "../components/ui/Drawer";
import {
  LayoutDashboard,
  FolderKanban,
  Users,
  Calendar,
  Clock,
  FileText,
  Building2,
  Stethoscope,
  UserCheck,
  BarChart3,
  FileSpreadsheet,
  Shield,
  ShieldAlert,
  Bell,
  Settings,
  Search,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Globe,
  ExternalLink
} from "lucide-react";
import { cn } from "../utils/cn";

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const unreadCount = useSelector(selectUnreadCount);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const iconMap = {
    LayoutDashboard,
    FolderKanban,
    Users,
    Calendar,
    Clock,
    FileText,
    Building2,
    Specialties: Stethoscope,
    Stethoscope,
    UserCheck,
    BarChart3,
    FileSpreadsheet,
    Shield,
    ShieldAlert,
    Bell,
    Settings
  };

  const currentRole = user?.role || ROLES.SUPER_ADMIN;

  const handleRoleSwitch = (newRole) => {
    dispatch(setRole(newRole));
    setRoleDropdownOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  // Filter navigation items by active user role
  const filteredCategories = DASHBOARD_NAV_ITEMS.map((cat) => ({
    ...cat,
    items: cat.items.filter((item) => item.roles.includes(currentRole))
  })).filter((cat) => cat.items.length > 0);

  const renderNavItems = () => (
    <div className="space-y-6">
      {filteredCategories.map((cat) => (
        <div key={cat.category} className="space-y-1">
          <span className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            {cat.category}
          </span>
          <div className="space-y-0.5 pt-1">
            {cat.items.map((item) => {
              const IconComponent = iconMap[item.icon] || LayoutDashboard;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/dashboard"}
                  onClick={() => setMobileNavOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary-700 text-white font-semibold shadow-xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    )
                  }
                >
                  <div className="flex items-center gap-2.5">
                    <IconComponent className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </div>
                  {item.path === "/notifications" && unreadCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex bg-slate-50 text-slate-900 font-sans w-full overflow-x-hidden">
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0">
        <div className="h-16 px-5 border-b border-slate-200 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary-700 text-white flex items-center justify-center font-black text-xs whitespace-nowrap leading-none shrink-0 select-none">
              TMG
            </div>
            <div>
              <span className="font-bold text-slate-900 text-sm tracking-tight block">TMG Operations</span>
              <span className="text-[10px] text-slate-400 block font-medium">Healthcare Coordination</span>
            </div>
          </Link>
          <Link to="/" target="_blank" className="text-slate-400 hover:text-slate-700 p-1" title="View Public Portal">
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">{renderNavItems()}</div>

        {/* User Card in Sidebar */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <Avatar name={user?.name || "Staff"} size="md" status="online" />
            <div className="truncate flex-1">
              <p className="text-xs font-semibold text-slate-900 truncate">{user?.name || "Staff"}</p>
              <p className="text-[10px] text-slate-500 truncate">{currentRole}</p>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-rose-600 p-1" title="Sign Out">
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-hidden">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 px-2.5 sm:px-6 flex items-center justify-between gap-2 sm:gap-4 sticky top-0 z-30 w-full">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Open Navigation"
            >
              <Menu className="w-5 h-5" />
            </button>

            <span className="hidden sm:inline-block text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              TMG Clinical Workspace
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {/* RBAC Role Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1 sm:gap-1.5 px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-[11px] sm:text-xs font-semibold hover:bg-teal-100 transition cursor-pointer"
              >
                <span className="text-[10px] sm:text-[11px] text-teal-700 font-normal">Role:</span>
                <span className="truncate max-w-[85px] sm:max-w-none">{currentRole}</span>
                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50 text-xs">
                  <div className="px-3 py-1.5 font-bold text-slate-400 text-[10px] uppercase">
                    Simulate Role (RBAC)
                  </div>
                  {Object.values(ROLES).map((r) => (
                    <button
                      key={r}
                      onClick={() => handleRoleSwitch(r)}
                      className={cn(
                        "w-full text-left px-3 py-2 hover:bg-slate-50 transition flex items-center justify-between",
                        currentRole === r ? "font-bold text-primary-700 bg-primary-50/50" : "text-slate-700"
                      )}
                    >
                      <span>{r}</span>
                      {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-primary-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Notification Bell Icon */}
            <Link
              to="/notifications"
              className="relative p-1.5 sm:p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
              title="Notifications"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-600 ring-2 ring-white" />
              )}
            </Link>

            <Avatar name={user?.name || "User"} size="sm" />
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="flex-1 p-2.5 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto min-w-0">
          <Outlet />
        </main>
      </div>

      {/* Mobile Slide-out Navigation Drawer */}
      <Drawer
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        title="TMG Operations"
        subtitle="Healthcare Navigation Workspace"
        position="left"
        maxWidth="max-w-xs"
      >
        {renderNavItems()}
      </Drawer>
    </div>
  );
}
