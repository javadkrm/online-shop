import type { ButtonHTMLAttributes } from "react"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {

    title : string
}

function Button ({title, ...rest}: ButtonProps) {

    return (
        <button {...rest}>
            {title}
        </button>
    )
}

export default Button