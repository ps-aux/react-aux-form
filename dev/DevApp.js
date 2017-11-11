import React from 'react'
import { asField, Form } from 'src'

const IncrementingInput = asField(({onChange, value}) =>
    <div onClick={() => onChange(value + 1)}
         style={{cursor: 'pointer'}}>
        Click count: {value}
    </div>)
const TextInput = asField(({value, onChange}) =>
    <input value={value}
           onChange={e => onChange(e.target.value)}/>)

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

    onErrors = (errors, values) => {
        this.setState({errors, values})
    }

    render = () => {
        const {values, errors} = this.state
        return <div>
            <Form values={values}
                  validator={validate}
                  onError={this.onErrors}
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
                        <label>{name}</label>:
                        <span>{value}</span>
                    </div>
                )}
            </div>}
            <p>
                <h2> rules</h2>
                len(name) > 3
            </p>
        </div>

    }
}

export default DevApp