import * as React from 'react';
import ContainerListItem from './containerListItem.jsx';

export default function ContainerList ({
    title,
    containers
}) {
    function containerRow(group, i) {
        return(
            <div className="row" key={i} style={{marginTop: "20px"}}>
                {group.map(c => <ContainerListItem key={c.name} {...c} />)}
            </div>
        );
    }

    function containerGroups() {
        // Reducing the containers gives us the ability to add rows
        // no matter the list size
        return containers.reduce((groups, container, i) => {
            if (i%4 === 0) {
                groups.push([]);
            }
            groups[groups.length - 1].push(container);
            return groups;
        }, []).map((group, i) => {
            return containerRow(group, i);
        });
    }
    return (
        <div>
            <h3>{title}</h3>
            <p>{ containers.length === 0 ? "No containers to display" : "" }</p>
            { containerGroups() }
        </div>
    )
}