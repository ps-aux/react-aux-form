import React from 'react'

const asField = InputComponent => {
    if (!InputComponent)
        throw new Error('Component not specified')

    const FormField = (props) =>
        <InputComponent {...props}/>

    FormField._form_field = true

    return FormField
}

export default asField
