import { useState } from 'react'

export const NOT_NULL = (value) => value !== ''
export const MAIL_VALID = (value) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
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

    const [valid, setValid] = useState(false)

    return {
        value,
        onChange: e => {
            let value = e.target.value;

            if (config.valuePatch) {

                if (! typeof config.valuePatch === 'function') {
                    console.error('[inputHooks] valuePatch should be a function')
                } else {
                    value = config.valuePatch(value)
                }
            }

            if (config.validation) {

                if (typeof config.validation !== 'function') {

                    console.error(`InputHooks validation function should be a function`)
                } else {

                    setValid(config.validation(value))
                }
            }

            if (config.localStorage) {
                localStorage.setItem(config.localStorage, value)
            }
            if (config.sessionStorage) {
                sessionStorage.setItem(config.sessionStorage, value)
            }

            setValue(value)
        },
        dataValid: valid
    }
}