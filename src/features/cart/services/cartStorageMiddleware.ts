import type { Middleware } from "@reduxjs/toolkit"

const cartStorageMiddleware: Middleware = store => next => action => {
    const result = next(action)
    const cart = store.getState().cart
    localStorage.setItem("cart", JSON.stringify(cart))
    return result
}

export default cartStorageMiddleware