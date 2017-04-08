import * as React from 'react';

export default function DialogTrigger({
    id,
    buttonText
}) {
    const href = `#${id}`
    return (
        <a className="btn btn-primary" data-toggle="modal" href={ href }>{ buttonText }</a>
    )
}