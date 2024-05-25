export async function requestSendEmailPermission(user) {
    try {
        if (user.email != "" && user.password != "") {
            return true;
        }
        return false;
    } catch (err) {
        console.warn(err);
        return false;
    }
}

export async function requestReadEmailPermission(user) {
    try {
        if (user.email != "" && user.password != "") {
            return true;
        }
        return false;
    } catch (err) {
        console.warn(err);
        return false;
    }
}