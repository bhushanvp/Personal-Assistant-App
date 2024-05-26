const initial_user = {
    name: "",
    phone_number: "",
    email_address: "",
    gemini_api_key: "AIzaSyDo8nMdlV16ludz_g3X-N1d2HVq72F2tzs"
}

const userReducer = (user = initial_user, action) => {
    switch (action.type) {
        case "SET_user":
            return {
                ...user,
                ...action.user
            }
        default:
            return user
    }
}

export default userReducer