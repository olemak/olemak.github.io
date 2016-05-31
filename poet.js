'use strict';

var AlltidPoesi = React.createClass({
	displayName: 'AlltidPoesi',

	getInitialState: function getInitialState() {
		return {
			programIds: [{ id: 'MYNT15001116', title: 'Skam' }, { id: 'DVFJ65001412', title: 'Dialektriket' }, { id: 'MSUB19001210', title: 'Krem Nasjonal' }, { id: 'KOID28002214', title: 'Månens hemmeligheter' }],
			currentProgrammeId: 'MYNT15001116',
			subtitles: [],
			poem: [],
			title: '',
			description: ''
		};
	},

	rawHTML: function rawHTML(text) {
		return { __html: text };
	},

	componentWillMount: function componentWillMount() {
		this.getSubtitles();
	},

	getSubtitles: function getSubtitles(programId) {
		var programID = typeof programId !== 'undefined' ? programId : this.state.currentProgrammeId;
		var parser = undefined;
		var result = undefined;
		var connection = new XMLHttpRequest();
		connection.open('GET', 'http://v8.psapi.nrk.no/programs/' + programID + '/subtitles/tt', true);
		connection.send();
		connection.onreadystatechange = (function () {
			if (connection.readyState == 4 && connection.status == 200) {
				if (window.DOMParser) {
					parser = new DOMParser();
					result = parser.parseFromString(connection.responseText, 'text/xml');
				} else {
					// Internet Explorer
					result = new ActiveXObject('Microsoft.XMLDOM');
					result.async = false;
					result.loadXML(connection.responseText);
				};

				var allTextLines = result.getElementsByTagName('p');
				var exportText = [];
				for (var i = 0; i <= allTextLines.length; i++) {
					var processingParagraph = allTextLines[i];
					if (typeof processingParagraph !== 'undefined') {
						processingParagraph = processingParagraph.innerHTML.replace(/\<[^)]*\>/, ' ').replace(/\([^)]*\)/, ' '); // removes tags, removes parenthesis
						exportText.push(processingParagraph);
					}
				}
				this.setState({ subtitles: exportText });
			}
			this.getProgrammeData();
		}).bind(this);
	},

	getProgrammeData: function getProgrammeData() {
		var programmeData = undefined;
		var infoConnection = new XMLHttpRequest();
		infoConnection.open('GET', 'http://v8.psapi.nrk.no/mediaelement/' + this.state.currentProgrammeId, true);
		infoConnection.send();
		infoConnection.onreadystatechange = (function () {
			if (infoConnection.readyState == 4 && infoConnection.status == 200) {
				programmeData = JSON.parse(infoConnection.responseText);
				this.setState({ title: programmeData.title });
				var programmeDescription = programmeData.description;
				programmeDescription = programmeDescription.split('.')[0] + '.';
				this.setState({ description: programmeDescription });
			}
			this.writePoem();
		}).bind(this);
	},

	writePoem: function writePoem() {
		var newPoem = [];
		var savedLine = '';

		// Random poem length, from 4 to 10 paragraphs:
		var poemLength = Math.floor(Math.random() * 7 + 4);

		for (var i = 0; i < poemLength; i++) {
			// Pick a random paragraph from all the subtitles:
			var randomParagraphNumber = Math.floor(Math.random() * this.state.subtitles.length) + 1;
			var newLine = this.state.subtitles[randomParagraphNumber];
			newLine = i === 0 ? newLine.split('<')[0] : newLine;

			// strip out punctuation, poetry-like:
			if (typeof newLine !== 'undefined') newLine = newLine.replace(/[—\/#!$%\^&\*;:{}=\-_`~()]/g, ' ').replace(/[\.|,]$/, '');
			if (newLine.length < 15 && i > 0) savedLine = newLine;
			newLine = savedLine + ' ' + newLine;
			newPoem.push(newLine);
			if (newLine.length > 30) savedLine = '';
		}
		this.setState({ poem: newPoem });
	},

	selectSource: function selectSource(event) {
		this.setState({ currentProgrammeId: event.target.value });
		this.getSubtitles(event.target.value);
	},

	render: function render() {
		var poemLines = this.state.poem;
		var programmes = this.state.programIds;
		var headline = poemLines.shift();
		return React.createElement(
			'div',
			{ id: 'wrapper' },
			React.createElement(
				'div',
				{ className: 'topmenu' },
				React.createElement(
					'div',
					{ className: 'controls' },
					React.createElement(
						'div',
						{ className: 'rewritePoem', onClick: this.writePoem },
						'↻'
					),
					React.createElement(
						'select',
						{ name: 'programmePicker', onChange: this.selectSource },
						programmes.map(function (programme, i) {
							return React.createElement(
								'option',
								{ value: programme.id, key: i },
								programme.title
							);
						})
					)
				)
			),
			React.createElement(
				'div',
				{ id: 'poemBody' },
				React.createElement('h2', { dangerouslySetInnerHTML: this.rawHTML(headline) }),
				poemLines.map(function (line, i) {
					return React.createElement(PoemLine, { data: line, key: i });
				})
			)
		);
	}
});

var PoemLine = React.createClass({
	displayName: 'PoemLine',

	render: function render() {
		return React.createElement(
			'h4',
			null,
			this.props.data
		);
	}
});

var ProgrammePicker = React.createClass({
	displayName: 'ProgrammePicker',

	rawHTML: function rawHTML(text) {
		return { __html: text };
	},

	render: function render() {
		return React.createElement(
			'p',
			null,
			'Fra ',
			React.createElement(
				'em',
				null,
				this.rawHTML(this.props.programmeTitle)
			),
			this.rawHTML(this.props.programmeDescription)
		);
	}
});

React.render(React.createElement(AlltidPoesi, null), document.getElementById('poem'));
