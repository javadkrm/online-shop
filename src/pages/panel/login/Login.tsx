
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import './Login.scss';

import {
    loginSchema,
    type LoginFormValues
} from "../../../features/auth/schemas/loginSchema";

import { loginApi } from "../../../features/auth/services/authApi";
import { saveAuthUser } from "../../../features/auth/services/authStorage";

import { useAppDispatch } from "../../../app/hooks";
import { login } from "../../../features/auth/authSlice";

function Login() {
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        formState: { errors, isSubmitting }
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        mode: "onChange"
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onSubmit = async (data: LoginFormValues) => {
        try {
            const response = await loginApi({
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
                    : "Login failed."
            });
        }
    };

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

                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Loading..." : "Login"}
                </button>
            </form>
        </section>
    );
}

export default Login;
