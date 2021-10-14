const logger = store => next => action => {
    console.group(action.type)
        console.log("🚀 The action: ", action)
        const returnVlaue = next(action)
        console.log("🚀 The new state: ", store.getState())
    console.groupEnd()
    return returnVlaue
}

export default logger