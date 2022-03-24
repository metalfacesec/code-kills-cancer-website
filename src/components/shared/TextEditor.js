import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';

class TextEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 100
		}

		this.handleResize = this.handleResize.bind(this);
	}

	handleResize() {
		this.setState({
			height: document.getElementById('code-mirror-parent').clientHeight - 1
		});
	}

	componentDidMount() {
		window.addEventListener('resize', this.handleResize);

		this.setState({
			height: document.getElementById('code-mirror-parent').clientHeight - 1
		});
	}
	
	render() {
		return (
			<div style={{height: 'calc(100% - 1px)', width: 'calc(100% - 1px)', 'border-left': '1px solid black', 'border-bottom': '1px solid black'}}>
				<CodeMirror
					value="console.log('hello world!');"
					height="100%"
					maxHeight={this.state.height + 'px'}
					theme={oneDark}
					extensions={[javascript({ jsx: true })]}
					onChange={(value, viewUpdate) => {
						console.log('value:', value);
					}}
				/>
			</div>
		);
	}
}

export default TextEditor;