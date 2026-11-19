import { Navigate, Outlet } from "react-router-dom"
import { useAppSelector } from "../../app/hooks"
import type { User } from "../../features/auth/types/authTypes"

interface ProtectedRouteProps {
    allowedRoles?: User['role'][]
}

function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
    const { isAuthenticated, user } = useAppSelector(
        state => state.auth
    )

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />
    }

    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}

export default ProtectedRoute