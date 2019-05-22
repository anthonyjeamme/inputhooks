import { useState } from 'react'

export const NOT_NULL = (value) => value !== ''
export const MAIL_VALID = (value) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
}

export const allValid = (inputHooks) => {

    for (let i = 0; i < Object.keys(inputHooks).length; i++) {
        const inputHook = inputHooks[Object.keys(inputHooks)[i]]
        if (!inputHook.valid) return false
    }
    return true
}

export default (defaultValue = null, config = {}) => {

    const [value, setValue] = useState(
        config.localStorage ?
            localStorage.getItem(config.localStorage) ?
                localStorage.getItem(config.localStorage)
                : defaultValue
            :
            config.sessionStorage ?
                sessionStorage.getItem(config.sessionStorage) ?
                    sessionStorage.getItem(config.sessionStorage)
                    : defaultValue
                : defaultValue
    )

    if (config.validation && typeof config.validation !== 'function') {
        console.error(`InputHooks validation function should be a function`)
        config.validation = null
    }

    if (config.inputPatch && typeof config.inputPatch !== 'function') {
        console.error('[inputHooks] inputPatch should be a function')
        config.inputPatch = null
    }

    const [valid, setValid] = useState(config.validation && typeof config.validation === 'function' ? config.validation(defaultValue) : true)

    return {
        value,
        onChange: e => {
            let value = e.target.value;

            if (config.inputPatch) {
                value = config.inputPatch(value)
            }

            if (config.validation) {
                setValid(config.validation(value))
            }

            if (config.localStorage) {
                localStorage.setItem(config.localStorage, value)
            }
            if (config.sessionStorage) {
                sessionStorage.setItem(config.sessionStorage, value)
            }

            setValue(value)
        },
        valid
    }
}