import * as React from 'react';
import * as io from 'socket.io-client';

const socket = io.connect();

export default function ContainerListItem({
	id,
	name,
	image,
	state,
	status,
}) {
	function isRunning() {
		return state === 'running';
	}

	function onActionButtonClick() {
		socket.emit(
			isRunning() ? 'container.stop' : 'container.up',
			{ id },
		);
	}

	const panelClass = isRunning() ? 'success' : 'default';
	const classes = ('panel', `panel-${panelClass}`);
	const buttonText = isRunning() ? 'Stop' : 'Start';

	return (
		<div className="col-sm-3">
			<div className={classes}>
				<div className="panel-heading">{ name }</div>
				<div className="panel-body">
					Status: {status}<br />
					Image: {image}
				</div>
				<div className="panel-footer">
					<button
						onClick={onActionButtonClick}
						className="btn btn-default"
					>
						{buttonText}
					</button>
				</div>
			</div>
		</div>
	);
}
