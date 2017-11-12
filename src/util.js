import React from 'react'

const hasChildren = ch => ch && ch.props && ch.props.children

export const mapChildrenRecursively = (predicate, props,
                                       map, {onMatch}) => {
    if (!props ||
        !props.children)
        return

    const {children} = props
    // Is single node
    if (props.length === undefined)
        return React.cloneElement(children, map(children))

    console.log('children', children)
    return React.Children.map(props.children,
        c => {
            if (!c) // Where to we get null from ? TODO find out
                return c

            if (hasChildren(c)) {
                // assert predicate(ch) === false
                // Clone all parents with mappedChildren
                return React.cloneElement(c, {
                    children: mapChildrenRecursively(
                        predicate, c.props,
                        clone, {onMatch})
                })
            }

            if (!predicate(c))
                return c

            onMatch(c)

            return React.cloneElement(c, map(c))
        })
}