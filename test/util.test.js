import { findChildren } from '../src/util.js'

const parent = children => ({
    props: {
        children
    }
})

const noPropsNode = () => {}

const node = props => ({props})

const matchingNode = () => node({a: true})

const noChildrenPropNode = () => node()

const predicate = n => n.props && n.props.a

it('Single matching immediate child', () => {
    const children = matchingNode()

    expect(findChildren(predicate, parent(children)))
        .toHaveLength(1)
})

it('Multiple matching immediate child', () => {
    const children = [
        node(), node(),
        matchingNode(), matchingNode()
    ]

    expect(findChildren(predicate, parent(children)))
        .toHaveLength(2)
})

it('Matching grandchildren', () => {
    const children = parent([
        node(), node(),
        matchingNode(), matchingNode()
    ])

    expect(findChildren(predicate, parent(children)))
        .toHaveLength(2)
})

it('Matching children on multiple levels', () => {
    const children = parent([
        parent([matchingNode()]),
        matchingNode()]
    )

    expect(findChildren(predicate, parent(children)))
        .toHaveLength(2)
})

it('No props node', () => {
    expect(findChildren(noPropsNode()))
        .toHaveLength(0)
})

it('No children prop node', () => {
    expect(findChildren(noChildrenPropNode()))
        .toHaveLength(0)
})
