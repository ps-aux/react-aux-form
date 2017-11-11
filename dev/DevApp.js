import React from 'react'
import {asField, Form} from 'src'

const IncrementingInput = asField(({onChange, value}) =>
    <div onClick={() => onChange(value + 1)}
         style={{cursor: 'pointer'}}>
        Click count: {value}
    </div>)

const TextInput = asField(({value, onChange, error}) =>
    <div>
        <input value={value}
               onChange={e => onChange(e.target.value)}/>
        {error && error}
    </div>)

const validate = vals => {
    const {name} = vals
    const errors = {}
    if (!name) {
        errors.name = 'Missing name'
        return errors
    }
    if (name.length < 3) {
        errors.name = 'Name must be at least 3 chars long'
        return errors
    }
    return errors
}

class DevApp extends React.Component {

    state = {
        values: {
            clicks: 0,
            name: 'Peter'
        }
    }

    submit = values => {
        this.setState({values, errors: null})
    }

    submitFailed = () => {
        console.log('cannot submit you have errors', this.state.errors)
        this.setState({showErrors: true})
    }

    valuesChanged = values => {
        const errors = validate(values)
        this.setState({values, errors, showErrors: false})
    }

    render = () => {
        const {values, errors, showErrors} = this.state
        const hasError = errors && Object.keys(errors).length
        const style = {
            color: hasError && showErrors ? 'red' : 'black'
        }
        return <div style={style}>
            <Form values={values}
                  errors={errors}
                  onChange={this.valuesChanged}
                  showErrors={showErrors}
                  failableSubmit={true}
                  onSubmitFailed={this.submitFailed}
                  onSubmit={this.submit}>

                <h2>This is a Form</h2>
                <IncrementingInput name="clicks"/>
                <TextInput name="name"/>
                <br/>
                <button type="submit">Submit</button>
            </Form>
            <h2>Values</h2>
            <pre> {JSON.stringify(values)} </pre>
            {errors &&
            <div>
                <h2>All errors</h2>
                {Object.entries(errors).map(([name, value]) =>
                    <div key={name}>
                        <strong>{name}</strong> <span>{value}</span>
                    </div>
                )}
            </div>}
        </div>

    }
}

export default DevApp