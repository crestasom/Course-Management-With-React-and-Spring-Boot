
export const setMsg = (msg, msgType) => {
    const alert = {
        msg, msgType
    }
    localStorage.setItem("alert", JSON.stringify(alert))
}
export const getMsg = () => {
    if (localStorage.getItem("alert")) {
        const alert = JSON.parse(localStorage.getItem("alert"))
        localStorage.removeItem("alert")
        return alert
    }
    return null
}

