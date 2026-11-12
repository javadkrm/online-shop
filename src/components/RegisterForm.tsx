import { useReducer } from "react"


interface FormState {
    name: string
    email: string
    password: string
}

type FormAction =
    | {
        type: "CHANGE_FIELD";
        field: keyof FormState;
        value: string;
    }
    | {
        type: "RESET";
    }
    | {
        type: "SET_FORM";
        payload: FormState;
    };

const initialState: FormState = {
    name: '',
    email: '',
    password: ''
}

function RegisterForm() {

    function formReducer(
        state: FormState,
        action: FormAction
    ): FormState {
        switch (action.type) {
            case "CHANGE_FIELD":
                return {
                    ...state,
                    [action.field]: action.value
                };

            case "RESET":
                return initialState;

            case "SET_FORM":
                return action.payload;

            default:
                return state;
        }
    }

    const [form, dispatch] = useReducer(formReducer, initialState)

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        dispatch({
            type: "CHANGE_FIELD",
            field: e.target.name as keyof FormState,
            value: e.target.value
        });
    };

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        console.log(form);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
            />

            <input
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
            />

            <input
                name="password"
                type="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />

            <button type="submit">Register</button>

            <button
                type="button"
                onClick={() => dispatch({ type: "RESET" })}
            >
                Reset
            </button>
        </form>
    )

}

export default RegisterForm