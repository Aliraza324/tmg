import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../../features/auth/authSlice";
import { userService } from "../../../services/userService";
import PageHeader from "../../../components/common/PageHeader";
import DataTable from "../../../components/tables/DataTable";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";
import Modal from "../../../components/ui/Modal";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import UserForm from "../../../components/forms/UserForm";
import { ROLES } from "../../../constants/roles";
import { Shield, ShieldAlert, Plus, Edit2, UserX, UserCheck, Lock } from "lucide-react";

export default function UsersPage() {
  const currentRole = useSelector(selectUserRole);
  const isSuperAdmin = currentRole === ROLES.SUPER_ADMIN;

  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [deactivateUser, setDeactivateUser] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadUsers = () => {
    setIsLoading(true);
    userService.getUsers().then((data) => {
      setUsers(data);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleCreateSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      await userService.createUser(formData);
      setCreateModalOpen(false);
      loadUsers();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditSubmit = async (formData) => {
    if (!editUser) return;
    setIsSubmitting(true);
    try {
      await userService.updateUser(editUser.id, formData);
      setEditUser(null);
      loadUsers();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleConfirmToggleStatus = async () => {
    if (!deactivateUser) return;
    await userService.toggleUserStatus(deactivateUser.id);
    setDeactivateUser(null);
    loadUsers();
  };

  const getRoleBadgeVariant = (role) => {
    switch (role) {
      case ROLES.SUPER_ADMIN:
        return "rose";
      case ROLES.ADMIN:
        return "amber";
      default:
        return "teal";
    }
  };

  if (!isSuperAdmin) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Access Restricted"
          subtitle="User & Role Administration is restricted to Super Admin personnel"
          breadcrumbs={[{ label: "Users" }]}
        />
        <div className="bg-white border border-rose-200 rounded-xl p-8 text-center max-w-lg mx-auto shadow-sm">
          <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">Super Admin Role Required</h3>
          <p className="text-xs text-slate-500 mb-4">
            Your current role simulation is <strong>{currentRole}</strong>. Use the header role switcher to select <strong>Super Admin</strong> to manage system accounts.
          </p>
        </div>
      </div>
    );
  }

  const columns = [
    {
      key: "name",
      label: "Staff Name & Email",
      render: (row) => (
        <div>
          <span className="font-semibold text-slate-900 block text-xs">{row.name}</span>
          <span className="font-mono text-[11px] text-slate-500">{row.email}</span>
        </div>
      )
    },
    {
      key: "role",
      label: "System Role",
      render: (row) => (
        <Badge variant={getRoleBadgeVariant(row.role)} size="sm">
          {row.role}
        </Badge>
      )
    },
    {
      key: "status",
      label: "Status",
      render: (row) => (
        <Badge variant={row.status === "Active" ? "emerald" : "slate"} size="sm">
          {row.status}
        </Badge>
      )
    },
    {
      key: "createdAt",
      label: "Created Date",
      render: (row) => <span className="text-xs text-slate-500">{row.createdAt}</span>
    },
    {
      key: "actions",
      label: "Actions",
      align: "right",
      render: (row) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            variant="secondary"
            size="sm"
            icon={Edit2}
            onClick={() => setEditUser(row)}
          >
            Edit
          </Button>
          <Button
            variant={row.status === "Active" ? "danger" : "secondary"}
            size="sm"
            onClick={() => setDeactivateUser(row)}
          >
            {row.status === "Active" ? "Deactivate" : "Activate"}
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="User & Role Administration"
        subtitle="Frontend role simulation for Super Admin, Operations Admin, and Patient Coordinators"
        breadcrumbs={[{ label: "Users" }]}
        actions={
          <Button variant="primary" size="md" icon={Plus} onClick={() => setCreateModalOpen(true)}>
            Add User Account
          </Button>
        }
      />

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-2.5 text-xs text-amber-800">
        <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600 mt-0.5" />
        <div>
          <span className="font-semibold block">Frontend Role Simulation Environment</span>
          <span>Accounts managed here are stored in frontend local state for demonstration of multi-tier authorization. No real authentication credentials or passwords are exchanged.</span>
        </div>
      </div>

      <DataTable columns={columns} data={users} isLoading={isLoading} />

      {/* Add User Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Create System User Account"
        description="Provision a new staff account with simulated role permissions."
      >
        <UserForm
          onSubmit={handleCreateSubmit}
          onCancel={() => setCreateModalOpen(false)}
          isSubmitting={isSubmitting}
        />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={Boolean(editUser)}
        onClose={() => setEditUser(null)}
        title="Edit User Account"
        description="Update staff profile details, assigned role, or account status."
      >
        {editUser && (
          <UserForm
            initialValues={editUser}
            onSubmit={handleEditSubmit}
            onCancel={() => setEditUser(null)}
            isSubmitting={isSubmitting}
          />
        )}
      </Modal>

      {/* Confirmation Dialog for Status Change */}
      <ConfirmDialog
        isOpen={Boolean(deactivateUser)}
        title={deactivateUser?.status === "Active" ? "Deactivate User Account" : "Activate User Account"}
        message={`Are you sure you want to ${
          deactivateUser?.status === "Active" ? "deactivate" : "activate"
        } access for ${deactivateUser?.name} (${deactivateUser?.email})?`}
        confirmLabel={deactivateUser?.status === "Active" ? "Confirm Deactivation" : "Confirm Activation"}
        variant={deactivateUser?.status === "Active" ? "danger" : "primary"}
        onConfirm={handleConfirmToggleStatus}
        onClose={() => setDeactivateUser(null)}
      />
    </div>
  );
}
