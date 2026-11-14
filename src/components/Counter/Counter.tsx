import useCounter from "../../hooks/useCounter"
import Button from "../Button"
function Counter() {

    const { count, increment, decrement, reset } = useCounter(10)

    return (
        <>
            <h2>{count}</h2>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>

            <Button
                title="Reset"
                type="submit"
                disabled={false}
                className="primary"
                id="submit-btn"
                onClick={reset}
            />
        </>
    )

}

export default Counter