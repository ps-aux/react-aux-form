import React from 'react'

const hasChildren = ch => ch && ch.props && ch.props.children

export const mapChildrenRecursively = (predicate, props,
                                       map, {onMatch}) => {
    if (!props ||
        !props.children)
        return

    return React.Children.map(props.children,
        c => {
            if (!c) // Where to we get null from ? TODO find out
                return c

            // Fields cannot have children
            if (predicate(c)) {
                onMatch(c)
                return React.cloneElement(c, map(c))
            }

            if (hasChildren(c)) {
                // Clone all parents with mappedChildren
                return React.cloneElement(c, {
                    children: mapChildrenRecursively(
                        predicate, c.props,
                        map, {onMatch})
                })
            }

            return c
        })
}