import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeToast } from "../../features/ui/uiSlice";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export default function ToastContainer() {
  const toasts = useSelector((state) => state.ui.toasts);
  const dispatch = useDispatch();

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onDismiss={() => dispatch(removeToast(toast.id))}
        />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-600 shrink-0" />
  };

  const borders = {
    success: "border-emerald-200 bg-emerald-50/90 text-emerald-950",
    error: "border-rose-200 bg-rose-50/90 text-rose-950",
    info: "border-sky-200 bg-sky-50/90 text-sky-950"
  };

  return (
    <div
      className={`pointer-events-auto flex items-start gap-3 p-4 rounded-lg border shadow-md transition-all ${borders[toast.type] || borders.info}`}
      role="alert"
    >
      {icons[toast.type] || icons.info}
      <div className="flex-1 text-sm">
        {toast.title && <h5 className="font-semibold">{toast.title}</h5>}
        {toast.message && <p className="text-xs mt-0.5 opacity-90">{toast.message}</p>}
      </div>
      <button
        onClick={onDismiss}
        className="text-slate-400 hover:text-slate-700 transition p-0.5 rounded"
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
