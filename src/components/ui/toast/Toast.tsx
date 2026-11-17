
import type { Toast as ToastType } from "../../../features/feedback/types";
import { useEffect } from "react";
import "./Toast.css";

interface Props {
    toast: ToastType;
    onClose: (id: string) => void;
}

const Toast = ({ toast, onClose }: Props) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(toast.id);
        }, 4000);

        return () => clearTimeout(timer);
    }, [toast.id, onClose]);
    
    const presentation = {
        success: { label: "موفق", icon: "success" },
        error: { label: "خطا", icon: "error" },
        warning: { label: "هشدار", icon: "warning" },
        info: { label: "اطلاع‌رسانی", icon: "info" },
    };

    const currentPresentation = presentation[toast.type];

    return (
        <div
            className={`app-toast app-toast--${toast.type}`}
            role={toast.type === "error" ? "alert" : "status"}
            aria-live={toast.type === "error" ? "assertive" : "polite"}
            aria-atomic="true"
        >
            <span className="app-toast-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {currentPresentation.icon === "success" && <path d="m5 12 4 4L19 6" />}
                    {currentPresentation.icon === "error" && <path d="m18 6-12 12M6 6l12 12" />}
                    {currentPresentation.icon === "warning" && (
                        <>
                            <path d="M10.3 3.9 2.5 17.4A1.8 1.8 0 0 0 4 20h16a1.8 1.8 0 0 0 1.5-2.6L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                            <path d="M12 9v4m0 3h.01" />
                        </>
                    )}
                    {currentPresentation.icon === "info" && (
                        <>
                            <circle cx="12" cy="12" r="9" />
                            <path d="M12 11v5m0-8h.01" />
                        </>
                    )}
                </svg>
            </span>

            <div className="app-toast-content">
                <strong className="app-toast-title fw-bolder fs-5">{currentPresentation.label}</strong>
                <p className="app-toast-message fw-bold">{toast.message}</p>
            </div>

            <button
                type="button"
                className="app-toast-close"
                aria-label="بستن پیام"
                onClick={() => onClose(toast.id)}
            >
                <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
                    <path d="m5 5 10 10M15 5 5 15" />
                </svg>
            </button>
        </div>
    );
};

export default Toast;
