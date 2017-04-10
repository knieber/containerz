import * as React from 'react';
import Modal from './shared/modal';

export default class NewContainerDialog extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imageName: '',
			isValid: false,
		};
		this.runImage = this.runImage.bind(this);
		this.onImageNameChange = this.onImageNameChange.bind(this);
	}

	onImageNameChange(e) {
		const name = e.target.value;
		this.setState({
			imageName: name,
			isValid: name.length > 0,
		});
	}

	runImage() {
		if (this.state.isValid && this.props.onRunImage) {
			this.props.onRunImage(this.state.imageName);
		}
		return this.state.isValid;
	}

	render() {
		const inputClass = ({
			'form-group': true,
			'has-error': !this.state.isValid,
		});

		return (
			<Modal
				id="newContainerModal"
				buttonText="Run"
				title="Create a new container"
				onButtonClicked={this.runImage}
			>
				<form className="form-horizontal">
					<div className={inputClass}>
						<label htmlFor="imageName" className="col-sm-3 control-label">Image name</label>
						<div className="col-sm-9">
							<input
								type="text"
								className="form-control"
								onChange={this.onImageNameChange}
								id="imageName"
								placeholder="e.g docker-whale"
							/>
						</div>
					</div>
				</form>
			</Modal>
		);
	}
}
