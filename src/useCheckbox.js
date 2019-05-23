import { useState } from 'react'

/*
 *
 */
export const useCheckbox = (defaultValue = null, config = {}) => {

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
        valid: true,
        for:
            (current) => ({
                onClick: () => {
                    setValue(current)

                    if (config.localStorage) {
                        localStorage.setItem(config.localStorage, current)
                    }
                    if (config.sessionStorage) {
                        sessionStorage.setItem(config.sessionStorage, current)
                    }
                },
                checked: current === value,
                value: current
            })
    }
}