import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../../features/ui/uiSlice";
import { updateProfile } from "../../../features/auth/authSlice";
import { storageService } from "../../../services/storageService";
import PageHeader from "../../../components/common/PageHeader";
import { Card } from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Select from "../../../components/ui/Select";
import Avatar from "../../../components/ui/Avatar";
import { User, Bell, Shield, Globe, Save } from "lucide-react";

const SETTINGS_STORAGE_KEY = "tmg_user_settings";

export default function SettingsPage() {
  const user = useSelector((state) => state.auth.user);
  const currentLanguage = useSelector((state) => state.ui.language);
  const dispatch = useDispatch();

  const [savedSettings] = useState(() =>
    storageService.get(SETTINGS_STORAGE_KEY, {
      name: user?.name || "Thura Aung",
      email: user?.email || "thura.aung@tmghealthcare.com",
      phone: user?.phone || "+66 82 491 5821",
      language: currentLanguage || "en",
      notifyCases: true,
      notifyAppointments: true
    })
  );

  const [name, setName] = useState(savedSettings.name);
  const [email, setEmail] = useState(savedSettings.email);
  const [phone, setPhone] = useState(savedSettings.phone);
  const [prefLanguage, setPrefLanguage] = useState(savedSettings.language);
  const [notifyCases, setNotifyCases] = useState(savedSettings.notifyCases);
  const [notifyAppointments, setNotifyAppointments] = useState(savedSettings.notifyAppointments);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    const newSettings = {
      name,
      email,
      phone,
      language: prefLanguage,
      notifyCases,
      notifyAppointments
    };
    storageService.set(SETTINGS_STORAGE_KEY, newSettings);
    dispatch(updateProfile({ name, email, phone }));
    dispatch(setLanguage(prefLanguage));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <PageHeader
        title="Account &amp; System Settings"
        subtitle="Manage coordinator profile, language preferences, notification routing, and security flags"
        breadcrumbs={[{ label: "Settings" }]}
      />

      {savedSuccess && (
        <div className="p-3.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
          ✓ Configuration settings saved successfully.
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Settings */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <User className="w-5 h-5 text-primary-700" />
            <h4 className="font-semibold text-slate-900 text-sm">Coordinator Profile</h4>
          </div>

          <div className="flex items-center gap-4">
            <Avatar name={name} size="lg" />
            <div>
              <p className="font-bold text-slate-900 text-sm">{name}</p>
              <p className="text-xs text-slate-500">Role: {user?.role || "Staff"}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <Input
              label="Display Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              label="Work Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              label="Contact Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <Select
              label="Platform Interface Language"
              value={prefLanguage}
              onChange={(e) => setPrefLanguage(e.target.value)}
              options={[
                { value: "en", label: "English (Default)" },
                { value: "my", label: "မြန်မာစာ (Myanmar Noto Sans)" }
              ]}
            />
          </div>
        </Card>

        {/* Notifications Routing */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Bell className="w-5 h-5 text-primary-700" />
            <h4 className="font-semibold text-slate-900 text-sm">Notification Alert Preferences</h4>
          </div>

          <div className="space-y-3 text-xs">
            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 block">New Case Assignment Alerts</span>
                <span className="text-slate-500">Receive in-app popovers when a new case is routed to your queue</span>
              </div>
              <input
                type="checkbox"
                checked={notifyCases}
                onChange={(e) => setNotifyCases(e.target.checked)}
                className="w-4 h-4 rounded text-primary-700"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
              <div>
                <span className="font-semibold text-slate-900 block">Appointment Confirmations</span>
                <span className="text-slate-500">Notify when Thai partner hospitals confirm appointment slots</span>
              </div>
              <input
                type="checkbox"
                checked={notifyAppointments}
                onChange={(e) => setNotifyAppointments(e.target.checked)}
                className="w-4 h-4 rounded text-primary-700"
              />
            </label>
          </div>
        </Card>

        {/* Security Simulation */}
        <Card className="p-6 space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Shield className="w-5 h-5 text-teal-700" />
            <h4 className="font-semibold text-slate-900 text-sm">Security &amp; Session Management</h4>
          </div>

          <p className="text-xs text-slate-600 leading-relaxed">
            Multi-factor authentication (MFA) is enforced on all staff accounts via TOTP authenticator. Password changes require administrative validation.
          </p>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" variant="primary" size="md" icon={Save} iconPosition="left">
            Save Preferences
          </Button>
        </div>
      </form>
    </div>
  );
}
