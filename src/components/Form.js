import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {mapChildrenRecursively} from 'src/util'

const isField = c => c.type && c.type._form_field === true

class Form extends Component {

    valChanged = (name, val) =>
        this.props.onChange({...this.props.values, [name]: val})

    onSubmit = e => {
        e.preventDefault()

        const {onSubmit, onSubmitFailed, failableSubmit} = this.props
        const {values, errors} = this.props

        if (errors && Object.keys(errors).length > 0) {
            if (failableSubmit)
                onSubmitFailed(errors, values)
            return
        }
        onSubmit(values)
    }

    render() {
        const {children, className, style} = this.props
        const _children = this.children(children)

        return <form onSubmit={this.onSubmit}
                     className={className}
                     style={style}>
            {_children}
        </form>
    }

    children(children) {
        const names = []
        const validateName = c => {
            const {name} = c.props
            if (names.includes(name))
                throw new Error(`Field with name '${name}' already present in Form`)
            names.push(name)
        }
        return mapChildrenRecursively(isField, {children},
            this.enhancedInput, {onMatch: validateName})
    }

    enhancedInput = field => {
        const name = field.props.name
        if (!name)
            throw new Error(`Missing 'name' prop`)

        const {values, errors, showErrors} = this.props
        const value = values[name]
        const error = showErrors !== false
            && errors && errors[name]

        return React.cloneElement(field, {
            onChange: val => {
                this.valChanged(name, val)

                // Trigger also original listener
                const {onChange} = field.props
                if (onChange)
                    onChange(val)
            },
            value,
            error
        })
    }
}

Form.propTypes = {
    values: PropTypes.object.isRequired,
    errors: PropTypes.object,
    failableSubmit: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
    onSubmitFailed: PropTypes.func
}

export default Form
