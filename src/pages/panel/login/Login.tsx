
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import './Login.scss'

import {
    loginSchema,
    type LoginFormValues
} from "../../../features/auth/schemas/loginSchema"

import { saveAuthUser } from "../../../features/auth/services/authStorage"
import { useAppDispatch } from "../../../app/hooks"
import { login } from "../../../features/auth/authSlice"

function Login() {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data: LoginFormValues) => {
        const email = data.email.trim().toLowerCase()
        const password = data.password

        let user = null

        // Mock Authentication
        if (email === "mjkarimi@gmail.com" && password === "mj123") {
            user = {
                id: "1",
                name: "Mj",
                email,
                role: "admin" as const,
                image: "https://example.com/mj-avatar.jpg"
            }
        } else if (
            email === "user@example.com" &&
            password === "user123"
        ) {
            user = {
                id: "2",
                name: "Normal User",
                email,
                role: "user" as const
            }
        }

        if (!user) {
            setError("root.server", {
                type: "manual",
                message: "Email or password is incorrect."
            })
            return
        }

        saveAuthUser(user)
        dispatch(login(user))

        navigate("/")
    }

    return (
        <section className="login-page">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                {/* Email */}
                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register("email", {
                            onChange: () => clearErrors("root.server")
                        })}
                    />

                    {errors.email && (
                        <p className="error-message">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password */}
                <div>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register("password", {
                            onChange: () => clearErrors("root.server")
                        })}
                    />

                    {errors.password && (
                        <p className="error-message">
                            {errors.password.message}
                        </p>
                    )}
                </div>

                {/* General Error */}
                {errors.root?.server && (
                    <p className="error-message">
                        {errors.root.server.message}
                    </p>
                )}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Loading..." : "Login"}
                </button>

            </form>
        </section>
    )
}

export default Login
