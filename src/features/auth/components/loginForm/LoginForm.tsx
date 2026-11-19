
import { useReducer, type ChangeEvent, type FormEvent } from "react"
import { useNavigate } from "react-router-dom"

import { login } from "../../authSlice"
import { useAppDispatch } from "../../../../app/hooks"

interface FormState {
    email: string
    password: string
}

type FormAction = {
    type: "CHANGE_FIELD"
    field: keyof FormState
    value: string
} | {
    type: "RESET"
}

const initialState: FormState = {
    email: "",
    password: ""
}

function formReducer(
    state: FormState,
    action: FormAction
): FormState {
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

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatchForm({
            type: "CHANGE_FIELD",
            field: e.target.name as keyof FormState,
            value: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const email = form.email.trim().toLowerCase()
        const password = form.password

        // Mock authentication
        let user = null

        if (
            email === "admin@example.com" &&
            password === "admin123"
        ) {
            user = {
                id: "1",
                name: "Admin",
                email,
                role: "admin" as const
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
            alert("Invalid email or password")
            return
        }

        dispatch(login(user))

        dispatchForm({ type: "RESET" })

        navigate("/")
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
            />

            <button type="submit">
                Login
            </button>

            <button
                type="button"
                onClick={() => dispatchForm({ type: "RESET" })}
            >
                Reset
            </button>
        </form>
    )
}

export default Login
