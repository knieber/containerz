import * as React from 'react';
import ContainerList from './containerList.jsx';
import NewContainerDialog from './newContainerModal.jsx';
import DialogTrigger from './dialogTrigger.jsx';
import * as _ from 'lodash';
import * as io from 'socket.io-client';

let socket = io.connect();

export default class AppComponent extends React.Component {

    constructor() {
        super()
        this.state = {
            containers: [],
            stoppedContainers: []
        }
    }

    componentDidMount() {
        socket.on('containers.list', (containers) => {
            const partitioned = _.partition(containers, (c) => c.State == "running");
            this.setState({
                containers: partitioned[0].map(this.mapContainer),
                stoppedContainers: partitioned[1].map(this.mapContainer)
            });
        });

        socket.on('image.error', (args) => {
            alert(args.message.json.message);
        });
        socket.emit('containers.list');
    }

    mapContainer(container) {
        return {
            id: container.Id,
            name: container.Names[0].substring(1),
            state: container.State,
            status: `${container.State} (${container.Status})`,
            image: container.Image
        }
    }

    onRunImage(name) {
        socket.emit('image.run', { name: name });
    }

    render() {
        return (
             <div className="container">
                <h1 className="page-header">Docker Dashboard</h1>
                <DialogTrigger id="newContainerModal" buttonText="New container" />
                <ContainerList title="Running" containers={this.state.containers} />
                <ContainerList title="Stopped containers" containers={this.state.stoppedContainers} />

                <NewContainerDialog id="newContainerModal" onRunImage={this.onRunImage.bind(this)} />
            </div>
        )
    }
}