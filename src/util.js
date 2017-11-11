import React from 'react'

const hasChildren = ch => ch && ch.props && ch.props.children

const isCollection = children => children.forEach

export const findChildren = (predicate, node) => {

    if (!hasChildren(node))
        return []

    const childrenProp = node.props.children
    // children can be a single object
    const children = isCollection(childrenProp) ? childrenProp : [childrenProp]

    return children.reduce((acc, c) => {
        if (predicate(c)) {
            acc.push(c)
            return acc
        } else {
            return acc.concat(findChildren(predicate, c))
        }
    }, [])
}

export const mapChildrenRecursively = (predicate, props, clone, {onMatch}) => {
    if (!props ||
        !props.children ||
        !props.children.length)
        return

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

            return clone(c)
        })
}