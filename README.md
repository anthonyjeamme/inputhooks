# Getting started

Simplify your inputs in React with inputhooks

    npm i --save inputhooks

Just import the lib

    import useInput from 'inputhooks'

And build your forms easily

    const nameInputHook = useInput('John Doe')

    render(){

        return(
            <>
                <input {...nameInputHook}/>
            </>
        )
    }

Access to the value with :

    nameInputHook.value

## Config

You can auto load/save your hook in localstorage with :

    const nameInputHook = useInput('John Doe',{
        localStorage:'data-name'
    })

and sessionstorage with :

    const nameInputHook = useInput('John Doe',{
        sessionStorage:'data-name'
    })

You can also handle user input with :

    const nameInputHook = useInput('John Doe', {
        valuePatch: value => value.toLowerCase()
    })
