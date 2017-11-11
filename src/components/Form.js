import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mapChildrenRecursively } from 'src/util'

const stateFromProps = props => {
    const {values, errors} = props
    return {values, errors}
}

const isField = c => c.type && c.type._form_field === true

class Form extends Component {

    constructor (props) {
        super(props)
        this.state = stateFromProps(props)
    }

    setFields (props) {
        this.fields = getInputNames(props)
    }

    componentWillReceiveProps (props) {
        this.setState({...stateFromProps(props)})
    }

    valChanged = (name, val) => {
        const values = {...this.state.values, [name]: val}
        this.setState({values})
    }

    validateValues = values => {
        const {validator} = this.props
        if (!validator)
            return
        return validator(values)
    }

    onSubmit = e => {
        e.preventDefault()

        const {onSubmit, onError} = this.props
        const {values} = this.state
        const errors = this.validateValues(values)

        this.setState({errors})

        if (errors && Object.keys(errors).length > 0) {
            // TODO remove
            console.debug('Form has errors:', errors)
            if (onError)
                onError(errors, values)
            return
        }
        onSubmit(values)
    }

    render () {
        const {children, className, style} = this.props
        const _children = this.children(children)

        return <form onSubmit={this.onSubmit}
                     className={className}
                     style={style}>
            {_children}
        </form>
    }

    children (children) {
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

        const {values, errors} = this.state
        const value = values[name]
        const error = errors && errors[name]

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
    onSubmit: PropTypes.func.isRequired,
    onError: PropTypes.func,
    validator: PropTypes.func
}

export default Form
