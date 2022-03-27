import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { html } from '@codemirror/lang-html';

class HtmlTextEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 100,
            html: '<html>\n\t<head>\n\t\t<title>HTML 101</title>\n\t</head>\n\t<body>\n\t\t<p>test</p>\n\t</body>\n</html>',
		}

		this.event = new CustomEvent('html_updated');

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
        let iframe = document.getElementById('code-results');
        if (iframe !== null) {
            iframe.contentWindow.document.open();
            iframe.contentWindow.document.write(this.state.html);
            iframe.contentWindow.document.close();

			window.dispatchEvent(this.event);
        }

		return (
			<div style={{height: 'calc(100% - 1px)', width: 'calc(100% - 1px)', 'border-left': '1px solid black', 'border-bottom': '1px solid black'}}>
				<CodeMirror
					value={this.state.html}
					height="100%"
					maxHeight={this.state.height + 'px'}
					theme={oneDark}
					extensions={[html()]}
					onChange={(value, viewUpdate) => {
						console.log('value:', value);
					}}
				/>
			</div>
		);
	}
}

export default HtmlTextEditor;