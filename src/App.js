import './App.css';

import HtmlTextEditor from './components/shared/HtmlTextEditor';

function App() {
	return (
		<div className='app-container'>
			<div className='main-col'>
				<iframe id="code-results"></iframe>
			</div>
			<div className='main-col'>
				<div id="code-mirror-parent" className='main-row'>
					<HtmlTextEditor />
				</div>
				<div className='main-row'></div>
			</div>
		</div>
	);
}

export default App;