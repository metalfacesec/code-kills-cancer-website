import './App.css';

import TextEditor from './components/shared/TextEditor';

function App() {
	return (
		<div className='app-container'>
			<div className='main-col'>
				
			</div>
			<div className='main-col'>
				<div id="code-mirror-parent" className='main-row'>
					<TextEditor />
				</div>
				<div className='main-row'></div>
			</div>
		</div>
	);
}

export default App;