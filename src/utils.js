/*
 *
 */
export const allValid = (inputHooks) => {

    for (let i = 0; i < Object.keys(inputHooks).length; i++) {
        const inputHook = inputHooks[Object.keys(inputHooks)[i]]
        if (!inputHook.valid) return false
    }
    return true
}