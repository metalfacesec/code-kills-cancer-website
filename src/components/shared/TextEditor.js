import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';

class TextEditor extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render() {
		return (
			<div>
				<CodeMirror
					value="console.log('hello world!');"
					height="200px"
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