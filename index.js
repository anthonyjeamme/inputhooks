import { useState } from 'react'

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

            if (config.localStorage) {
                localStorage.setItem(config.localStorage, value)
            }
            if (config.sessionStorage) {
                sessionStorage.setItem(config.sessionStorage, value)
            }

            setValue(value)
        }
    }
}