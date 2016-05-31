var AlltidPoesi = React.createClass({
	getInitialState: function(){
		return (
			{
				programIds: [{id: 'MYNT15001116', title: 'Skam'}, {id: 'DVFJ65001412', title: 'Dialektriket'}, {id: 'MSUB19001210', title: 'Krem Nasjonal'}, {id: 'KOID28002214', title: 'Månens hemmeligheter'}],
				currentProgrammeId: 'MYNT15001116',
				subtitles: [],
				poem: [],
				title: '',
				description: '',
			}
		)
	},

	rawHTML: function(text) {
    	return {__html: text };
  	},


  	componentWillMount: function(){
  		this.getSubtitles();
	},

	getSubtitles: function(programId) {
	let programID = (typeof programId !== 'undefined' ? programId : this.state.currentProgrammeId); 
	let parser;
	let result;
	let connection = new XMLHttpRequest();
 	    connection.open("GET", `http://v8.psapi.nrk.no/programs/${programID}/subtitles/tt`, true);
	    connection.send();
	    connection.onreadystatechange = function() {
			if (connection.readyState==4 && connection.status==200) {
	      		if (window.DOMParser) {
				    parser = new DOMParser();
				    result = parser.parseFromString(connection.responseText, "text/xml");
				} else {		// Internet Explorer
				  	result = new ActiveXObject("Microsoft.XMLDOM");
				    result.async = false;
				    result.loadXML(connection.responseText);
				};

				let allTextLines = result.getElementsByTagName("p");
				let exportText = [];
				for (let i = 0; i <= allTextLines.length; i++) {
					let processingParagraph = allTextLines[i];
					if (typeof processingParagraph !== 'undefined') {
						processingParagraph = processingParagraph.innerHTML.replace( /\<[^)]*\>/ , " ").replace( /\([^)]*\)/ , " "); // removes tags, removes parenthesis
						exportText.push(processingParagraph);
					}
				}
				this.setState({subtitles: exportText});
			}
			this.getProgrammeData();
		}.bind(this);
	},

	getProgrammeData: function() {
	let programmeData;
	let infoConnection = new XMLHttpRequest();
 	    infoConnection.open("GET", `http://v8.psapi.nrk.no/mediaelement/${this.state.currentProgrammeId}`, true);
	    infoConnection.send();
	    infoConnection.onreadystatechange = function() {
			if (infoConnection.readyState==4 && infoConnection.status==200) {
				programmeData = JSON.parse(infoConnection.responseText);
				this.setState({title: programmeData.title});
				let programmeDescription = programmeData.description;
					programmeDescription = programmeDescription.split('.')[0] + '.';
				this.setState({description: programmeDescription});
			}
		this.writePoem();
		}.bind(this);
	},

	writePoem: function() {
		let newPoem = [];
		let savedLine = '';

		// Random poem length, from 4 to 10 paragraphs:
		let poemLength = (Math.floor((Math.random() * 7) + 4)); 

		for (let i=0; i < poemLength; i++) {
			// Pick a random paragraph from all the subtitles:
			let randomParagraphNumber = (Math.floor(Math.random() * this.state.subtitles.length) +1 );
			let newLine = this.state.subtitles[randomParagraphNumber];
				newLine = (i === 0 ? newLine.split('<')[0] : newLine);

			// strip out punctuation, poetry-like:
			if (typeof newLine !== 'undefined') newLine = newLine.replace( /[—\/#!$%\^&\*;:{}=\-_`~()]/g , " ").replace(/[\.|,]$/, '');
			if (newLine.length < 15 && i > 0) savedLine = newLine;
			newLine = savedLine + ' ' + newLine; 
			newPoem.push(newLine);				
			if (newLine.length > 30) savedLine = '';
		}
		this.setState({poem:newPoem});
	},

	selectSource: function(event) {
		this.setState({currentProgrammeId: event.target.value});
		this.getSubtitles(event.target.value);
	},

	render: function() {
		let poemLines 	= this.state.poem;
		let programmes	= this.state.programIds;
		let headline 	= poemLines.shift();
		return(
			<div id="wrapper">
				<div className="topmenu">
					<div className="controls">
						<div className="rewritePoem" onClick={this.writePoem} >&#8635;</div>
						<select name="programmePicker" onChange={this.selectSource}>
							{programmes.map(function(programme, i) {
								return <option value={programme.id} key={i}>{programme.title}</option>
							})}
						</select>
					</div>
				</div>
				
				<div id="poemBody">
					<h2 dangerouslySetInnerHTML={this.rawHTML(headline)} />
						{poemLines.map(function(line, i) {
							return <PoemLine data={line} key={i} />;
						})}
				</div>
			</div>

		);
	}
});


var PoemLine = React.createClass({
	render: function () {
		return <h4>{this.props.data}</h4>
	} 
});

var ProgrammePicker = React.createClass({

	rawHTML: function(text) {
    	return {__html: text };
  	},

	render: function() {
		return (
			<p>Fra&nbsp;
				<em>{this.rawHTML(this.props.programmeTitle)}</em>
				{this.rawHTML(this.props.programmeDescription)}
			</p>
		)
	}
})



React.render(<AlltidPoesi />,document.getElementById('poem'));
