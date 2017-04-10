import * as React from 'react';
import ContainerListItem from './containerListItem';

export default function ContainerList({
	title,
	containers,
}) {
	function containerRow(row, i) {
		return (
			<div className="row" key={i} style={{ marginTop: '20px' }}>
				{row.map(c => <ContainerListItem key={c.name} {...c} />)}
			</div>
		);
	}

	function containerRows() {
		return containers.reduce((rows, container, i) => {
			if (i % 4 === 0) {
				rows.push([]);
			}
			rows[rows.length - 1].push(container);
			return rows;
		}, []).map((row, i) => containerRow(row, i));
	}

	return (
		<div>
			<h3>{title}</h3>
			<p>{ containers.length === 0 ? 'No containers to display' : '' }</p>
			{ containerRows() }
		</div>
	);
}
