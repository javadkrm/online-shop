
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import './Register.scss'

import {
    registerSchema,
    type RegisterFormValues
} from "../../../features/auth/schemas/registerSchema"

import {
    isEmailRegistered,
    saveRegisteredUser,
    saveAuthUser
} from "../../../features/auth/services/authStorage"

import { useAppDispatch } from "../../../app/hooks"
import { login } from "../../../features/auth/authSlice"

function Register() {
    const {
        register,
        handleSubmit,
        setError,
        formState: {
            errors,
            isSubmitting
        }
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    })

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const onSubmit = async (data: RegisterFormValues) => {
        const email = data.email.trim().toLowerCase()

        // Check duplicate email
        if (
            email === "mjkarimi@gmail.com" ||
            email === "user@example.com" ||
            isEmailRegistered(email)
        ) {
            setError("email", {
                type: "manual",
                message: "This email is already registered."
            })

            return
        }

        // Create new user
        const newUser = {
            id: crypto.randomUUID(),
            name: `${data.firstName} ${data.lastName}`,
            email,
            role: "user" as const
        }

        // Save registered user
        saveRegisteredUser(newUser)
        localStorage.setItem(
            `user_password_${newUser.id}`,
            data.password
        )

        // Login automatically
        saveAuthUser(newUser)
        dispatch(login(newUser))

        // Navigate to homepage
        navigate("/")
    }

    return (
        <section className="register-page">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>

                <div>
                    <label htmlFor="firstName">
                        First Name
                    </label>

                    <input
                        id="firstName"
                        {...register("firstName")}
                    />

                    {errors.firstName && (
                        <p>{errors.firstName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="lastName">
                        Last Name
                    </label>

                    <input
                        id="lastName"
                        {...register("lastName")}
                    />

                    {errors.lastName && (
                        <p>{errors.lastName.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        {...register("email")}
                    />

                    {errors.email && (
                        <p>{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                    />

                    {errors.password && (
                        <p>{errors.password.message}</p>
                    )}
                </div>

                <div>
                    <label htmlFor="confirmPassword">
                        Confirm Password
                    </label>

                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                    />

                    {errors.confirmPassword && (
                        <p>{errors.confirmPassword.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Registering..." : "Register"}
                </button>

            </form>
        </section>
    )
}

export default Register
