
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../app/store";
import { removeToast } from "../../../features/feedback/feedbackSlice";
import Toast from "./Toast";
import { useCallback } from "react";

const ToastContainer = () => {
    const dispatch = useDispatch<AppDispatch>();

    const toasts = useSelector(
        (state: RootState) => state.feedback.toasts
    );

    const handleClose = useCallback(
        (id: string) => {
            dispatch(removeToast(id));
        },
        [dispatch]
    );

    return (
        <div
            className="app-toast-container"
        >
            {toasts.map(toast => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onClose={handleClose}
                />
            ))}
        </div>
    );
};

export default ToastContainer;
