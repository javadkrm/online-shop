
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import './Login.scss'

import {
    loginSchema,
    type LoginFormValues
} from "../../../features/auth/schemas/loginSchema"

import {
    findRegisteredUser,
    saveAuthUser
} from "../../../features/auth/services/authStorage"

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

        // Admin account
        if (
            email === "mjkarimi@gmail.com" &&
            password === "mj123"
        ) {
            user = {
                id: "1",
                name: "Mj",
                email,
                role: "admin" as const,
                image: "https://example.com/mj-avatar.jpg"
            }
        }

        // Default user account
        else if (
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

        // Registered users
        else {
            const registeredUser = findRegisteredUser(email)

            if (registeredUser) {
                // Temporary mock password verification
                // We will improve this in the next backend phase.
                const registeredPassword = localStorage.getItem(
                    `user_password_${registeredUser.id}`
                )

                if (registeredPassword === password) {
                    user = registeredUser
                }
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

                <div>
                    <label htmlFor="email">Email</label>

                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            onChange: () => clearErrors("root.server")
                        })}
                    />

                    {errors.email && (
                        <p>{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password">Password</label>

                    <input
                        id="password"
                        type="password"
                        {...register("password", {
                            onChange: () => clearErrors("root.server")
                        })}
                    />

                    {errors.password && (
                        <p>{errors.password.message}</p>
                    )}
                </div>

                {errors.root?.server && (
                    <p>{errors.root.server.message}</p>
                )}

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
