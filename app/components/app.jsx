import * as React from 'react';
import * as io from 'socket.io-client';
import ContainerList from './containerList';
import NewContainerModal from './newContainerModal';
import partition from '../utils/utils';

const socket = io.connect();

export default class AppComponent extends React.Component {
	static onRunImage(name) {
		socket.emit('image.run', { name });
	}

	static mapContainer(container) {
		return {
			id: container.Id,
			name: container.Names[0].substring(1),
			state: container.State,
			status: `${container.State} (${container.Status})`,
			image: container.Image,
		};
	}

	constructor() {
		super();
		this.state = {
			containers: [],
			stoppedContainers: [],
		};
		this.onRunImage = AppComponent.onRunImage.bind(this);
		this.mapContainer = AppComponent.mapContainer.bind(this);
	}

	componentDidMount() {
		socket.on('containers.list', (containers) => {
			const containersList = partition(containers, (a, c) => {
				(c.State === 'running' ? a[0] : a[1]).push(c);
				return a;
			});
			this.setState({
				containers: containersList[0].map(this.mapContainer),
				stoppedContainers: containersList[1].map(this.mapContainer),
			});
		});

		socket.on('image.error', (args) => {
			console.log(args.message.json.message);
		});
		socket.emit('containers.list');
	}

	render() {
		return (
			<div className="container">
				<h1 id="tooltip" className="page-header">Docker Dashboard</h1>
				<a
					className="btn btn-primary"
					data-toggle="modal"
					href="#newContainerModal"
				>
					New container
				</a>
				<ContainerList title="Running" containers={this.state.containers} />
				<ContainerList title="Stopped containers" containers={this.state.stoppedContainers} />
				<NewContainerModal id="newContainerModal" onRunImage={this.onRunImage} />
			</div>
		);
	}
}
