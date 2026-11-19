import "./Login.scss"
import { useReducer, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../../features/auth/authSlice"
import { useAppDispatch } from "../../../app/hooks"
import { saveAuthUser } from "../../../features/auth/services/authStorage"

interface FormState {
    email: string
    password: string
}

type FormAction =
    | {
          type: "CHANGE_FIELD"
          field: keyof FormState
          value: string
      }
    | {
          type: "RESET"
      }

const initialState: FormState = {
    email: "",
    password: ""
}

function formReducer(state: FormState, action: FormAction): FormState {
    switch (action.type) {
        case "CHANGE_FIELD":
            return {
                ...state,
                [action.field]: action.value
            }

        case "RESET":
            return initialState

        default:
            return state
    }
}

function Login() {
    const [form, dispatchForm] = useReducer(formReducer, initialState)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError(null)
        }

        dispatchForm({
            type: "CHANGE_FIELD",
            field: e.target.name as keyof FormState,
            value: e.target.value
        })
    }

    const handleReset = () => {
        setError(null)
        dispatchForm({ type: "RESET" })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)

        const email = form.email.trim().toLowerCase()
        const password = form.password

        // Mock authentication
        let user = null

        if (email === "mjkarimi@gmail.com" && password === "mj123") {
            user = {
                id: "1",
                name: "Mj",
                email,
                role: "admin" as const,
                image: "https://example.com/mj-avatar.jpg"
            }
        } else if (email === "user@example.com" && password === "user123") {
            user = {
                id: "2",
                name: "Normal User",
                email,
                role: "user" as const
            }
        }

        if (!user) {
            setError("The email address or password you entered is incorrect.")
            setIsSubmitting(false)
            return
        }

        saveAuthUser(user)
        dispatch(login(user))
        dispatchForm({ type: "RESET" })
        setIsSubmitting(false)
        navigate("/")
    }

    return (
        <section
            className="login-page"
            aria-labelledby="login-title"
            dir="ltr"
            lang="en"
        >
            <form className="login-card" onSubmit={handleSubmit} noValidate>
                <div className="login-header">
                    <span className="login-eyebrow">Admin portal</span>
                    <h1 id="login-title">Sign in to your account</h1>
                    <p>Enter your account details to continue.</p>
                </div>

                {error && (
                    <div className="login-error" role="alert">
                        {error}
                    </div>
                )}

                <div className="login-field">
                    <label htmlFor="login-email">Email address</label>
                    <input
                        id="login-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        value={form.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="login-field">
                    <label htmlFor="login-password">Password</label>
                    <input
                        id="login-password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        required
                    />
                </div>

                <div className="login-actions">
                    <button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Signing in..." : "Sign in"}
                    </button>

                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={isSubmitting}
                    >
                        Clear
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Login