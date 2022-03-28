import React from 'react';
import TextEditor from './TextEditor';

import '../../css/GameBoard.css';

class GameBoard extends React.Component {
	constructor(props) {
		super(props);

        this.iframe = null;
        this.html = '<html>\n\t<head>\n\t\t<title>HTML 101</title>\n\t</head>\n\t<body>\n\t\t<p>test</p>\n\t</body>\n</html>';
        this.css = 'body {\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}';

        this.cssUpdated = this.cssUpdated.bind(this);
        this.htmlUpdated = this.htmlUpdated.bind(this);
	}

    componentDidMount() {
        this.iframe = document.getElementById('code-results');
        
        this.cssUpdated(this.css);
        this.htmlUpdated(this.html);
    }

    stripHtmlToBody(html) {
        var bodyHtml = /<body.*?>([\s\S]*)<\/body>/.exec(html)[1];
        return bodyHtml;
    }

    clearIframeBody() {
        if (typeof this.iframe === 'undefined' || this.iframe === null) {
            return;
        }

        this.iframe.contentWindow.document.querySelector('body').innerHTML = '';
    }

    updateIframeBody(bodyHtml) {
        let new_elem = this.iframe.contentWindow.document.createElement('div');
        new_elem.innerHTML = bodyHtml;
        this.iframe.contentWindow.document.querySelector('body').appendChild(new_elem);
    }

    htmlUpdated(value) {
        this.html = value;

        if (typeof this.iframe === 'undefined' || this.iframe === null) {
            return;
        }

        this.clearIframeBody();
        this.updateIframeBody(this.stripHtmlToBody(this.html));
    }

    cssUpdated(value) {
        this.css = value;

        if (typeof this.iframe === 'undefined' || this.iframe === null) {
            return;
        }
        
        let new_elem = this.iframe.contentWindow.document.createElement('style');
        new_elem.innerHTML = this.css;

        this.iframe.contentWindow.document.querySelector('head').appendChild(new_elem);
    }
    
	// handleResize() {
	// 	this.setState({
	// 		height: document.getElementById('code-mirror-parent').clientHeight - 1
	// 	});
	// }

	// componentDidMount() {
	// 	window.addEventListener('resize', this.handleResize);

	// 	this.setState({
	// 		height: document.getElementById('code-mirror-parent').clientHeight - 1
	// 	});
	// }
	
	render() {
		return (
			<div className='app-container'>
                <div className='main-col'>
                    <div id="rendered-html"></div>
                    <iframe id='code-results' frameBorder='0'>Browser not compatible.</iframe>
                </div>
                <div className='main-col'>
                    <div id="code-mirror-parent" className='main-row'>
                        <TextEditor type="html" initialValue={this.html} onValueUpdate={this.htmlUpdated} />
                    </div>
                    <div className='main-row'>
                        <TextEditor type="css" initialValue={this.css} onValueUpdate={this.cssUpdated} />
                    </div>
                </div>
		    </div>
		);
	}
}

export default GameBoard;