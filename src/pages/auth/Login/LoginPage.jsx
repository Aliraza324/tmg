import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, setRole } from "../../../features/auth/authSlice";
import { ROLES } from "../../../constants/roles";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import { ShieldCheck, ArrowRight, Lock, UserCheck } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedRole, setSelectedRole] = useState(ROLES.SUPER_ADMIN);
  const [email, setEmail] = useState("thura.aung@tmghealthcare.com");
  const [isLoading, setIsLoading] = useState(false);

  const roleOptions = [
    { value: ROLES.SUPER_ADMIN, label: "Super Admin (Full System Access & Audit Logs)" },
    { value: ROLES.ADMIN, label: "Admin (Operations, Network & Analytics)" },
    { value: ROLES.COORDINATOR, label: "Coordinator (Assigned Cases, Appointments & Notes)" }
  ];

  const handleRoleChange = (role) => {
    setSelectedRole(role);
    if (role === ROLES.SUPER_ADMIN) setEmail("admin.director@tmghealthcare.com");
    else if (role === ROLES.ADMIN) setEmail("operations.lead@tmghealthcare.com");
    else setEmail("thura.aung@tmghealthcare.com");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      dispatch(
        login({
          id: "user-active",
          name:
            selectedRole === ROLES.COORDINATOR
              ? "Thura Aung"
              : selectedRole === ROLES.ADMIN
              ? "Daw Khin Myat (Admin)"
              : "Executive Director",
          email,
          role: selectedRole,
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
        })
      );
      setIsLoading(false);
      navigate("/dashboard");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-flex w-12 h-12 rounded-xl bg-primary-700 text-white items-center justify-center font-bold text-xl shadow-sm mb-3">
          TMG
        </div>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Staff &amp; Coordinator Portal</h2>
        <p className="text-xs text-slate-500 mt-1">
          Thailand Medical Guidance Platform — Clinical Operations
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-md rounded-xl border border-slate-200 sm:px-10 space-y-6">
          <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-start gap-2">
            <UserCheck className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
            <div>
              <strong className="block font-semibold">Frontend Prototype RBAC Mode:</strong>
              Select any role below to evaluate role-tailored dashboards and permission barriers.
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <Select
              label="Simulate Staff Role"
              options={roleOptions}
              value={selectedRole}
              onChange={(e) => handleRoleChange(e.target.value)}
            />

            <Input
              label="Staff Email Address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Input
              label="Password"
              type="password"
              defaultValue="••••••••••••"
              required
            />

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full mt-2"
              isLoading={isLoading}
              icon={ArrowRight}
              iconPosition="right"
            >
              Sign In to Dashboard
            </Button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center">
            <Link to="/" className="text-xs font-semibold text-primary-700 hover:text-primary-800">
              ← Return to Public Patient Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
