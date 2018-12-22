class Preview extends React.Component{
  constructor(props){
    super(props);
    this.marktext = this.marktext.bind(this);
  }
  
  marktext(txt){
    return marked(txt);
  }
  
  render(){
    return(
      <div className="col-md-6">
        <h4 className="light">Preview</h4>
        <div id="preview" className="info" dangerouslySetInnerHTML={{__html: this.marktext(this.props.mark)}}></div>
      </div>
    )
  }
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rawtext: '# Sample Markdown Heading\n\n## Edit or replace this\n-----------\n\n### Another deeper heading\n\nParagraphs are separated by a blank line.\n\nLeave 2 spaces at the end of a line to do a  line break\n\nText attributes *italic*, **bold**,\n`monospace`, ~~strikethrough~~ .\n\nUnordered list:\n\n  * apples\n  * oranges\n  * pears\n\nNumbered list:\n\n  1. apples\n  2. oranges\n  3. pears\n\n---\n\n> Quote block.\n`<p> this is code</p>`\n\n``` This too ```\n\n<pre><code>Another to pass</pre></code>\n#### Created by:\n[Jay Karlsven](https://jpkarlsven.com \"Jay Karlsven\'s Website\")\n![view](../image.png)'
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({ rawtext: value});
  }

  render() {
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col text-center">
            <h1 className="light">Markdown Preview</h1>
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-md-6">
            <h4 className="light">Markdown</h4>
            <textarea id="editor" className="info" value={this.state.rawtext} onChange={this.handleChange}/>
          </div>
          <Preview mark={this.state.rawtext} />
        </div>
      </div>
    )
  }
};

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
