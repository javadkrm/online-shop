
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import './Register.scss'

import {
    registerSchema,
    type RegisterFormValues
} from "../../../features/auth/schemas/registerSchema";

import { registerApi } from "../../../features/auth/services/authApi";
import { saveAuthUser } from "../../../features/auth/services/authStorage";

import { useAppDispatch } from "../../../app/hooks";
import { login } from "../../../features/auth/authSlice";

function Register() {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        mode: "onChange"
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const response = await registerApi({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password
            });

            saveAuthUser(response.user);
            dispatch(login(response.user));

            navigate("/");
        } catch (error) {
            setError("root.server", {
                type: "server",
                message: error instanceof Error
                    ? error.message
                    : "Registration failed."
            });
        }
    };

    return (
        <section className="register-page">
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div>
                    <label htmlFor="firstName">First Name</label>
                    <input id="firstName" {...register("firstName")} />
                    {errors.firstName && <p>{errors.firstName.message}</p>}
                </div>

                <div>
                    <label htmlFor="lastName">Last Name</label>
                    <input id="lastName" {...register("lastName")} />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>

                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        {...register("email", {
                            onChange: () => clearErrors("root.server")
                        })}
                    />
                    {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <div>
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                        id="confirmPassword"
                        type="password"
                        {...register("confirmPassword")}
                    />
                    {errors.confirmPassword && (
                        <p>{errors.confirmPassword.message}</p>
                    )}
                </div>

                {errors.root?.server && (
                    <p>{errors.root.server.message}</p>
                )}

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Registering..." : "Register"}
                </button>
            </form>
        </section>
    );
}

export default Register;
