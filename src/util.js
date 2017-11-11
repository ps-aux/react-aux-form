import React from 'react'

const hasChildren = ch => ch && ch.props && ch.props.children

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