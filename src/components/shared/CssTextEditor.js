import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { css } from '@codemirror/lang-css';

class HtmlTextEditor extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			height: 100,
            css: 'body {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}',
		}

		this.handleResize = this.handleResize.bind(this);
	}

	handleResize() {
		this.setState({
			height: document.getElementById('code-mirror-parent').clientHeight - 1
		});
	}

	componentDidMount() {
		const css = this.state.css;

		window.addEventListener('resize', this.handleResize);

		window.addEventListener('html_updated', function (e) {
			let iframe = document.getElementById('code-results');
			if (iframe !== null) {
				let new_elem = iframe.contentWindow.document.createElement('style');
				new_elem.innerHTML = css;

				iframe.contentWindow.document.querySelector('head').appendChild(new_elem);
			}
		});

		this.setState({
			height: document.getElementById('code-mirror-parent').clientHeight - 1
		});
	}
	
	render() {
		return (
			<div style={{height: 'calc(100% - 1px)', width: 'calc(100% - 1px)', 'border-left': '1px solid black', 'border-bottom': '1px solid black'}}>
				<CodeMirror
					value={this.state.css}
					height="100%"
					maxHeight={this.state.height + 'px'}
					theme={oneDark}
					extensions={[css()]}
					onChange={(value, viewUpdate) => {
						this.state.css = value;

						let iframe = document.getElementById('code-results');
						if (iframe !== null) {
							let style = iframe.contentWindow.document.querySelector('style');
							if (style !== null) {
								iframe.contentWindow.document.querySelector('head').removeChild(style);
							}
							// iframe.contentWindow.document.querySelector('style').innerHTML = '';

							let new_elem = iframe.contentWindow.document.createElement('style');
							new_elem.innerHTML = this.state.css;

							iframe.contentWindow.document.querySelector('head').appendChild(new_elem);
						}
					}}
				/>
			</div>
		);
	}
}

export default HtmlTextEditor;