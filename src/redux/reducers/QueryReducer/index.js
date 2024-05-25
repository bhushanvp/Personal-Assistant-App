const initial_state = {
    queryRunning: false,
    micActive: false,
    editingQuery: true,
    editedQuery: ""
}

const queryReducer = (query = initial_state, action) => {
    switch (action.type) {
        case "SET_query":
            return {
                ...query,
                ...action.query
            }
        default:
            return query
    }
}

export default queryReducer