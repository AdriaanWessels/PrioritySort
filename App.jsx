import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "Initial data...",
      buttonA: "testA",
      buttonB: "testB",
      i: 1,
      j: 1
    };
    this.updateState = this.updateState.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  updateState(e) {
    this.setState({ data: e.target.value });
  }

  sortData(e) {
    let dataArr = this.state.data.split("\n");

    this.setState({
      buttonA: "clickA",
      buttonB: "clickB",
      data: dataArr
    });
  }

  render() {
    return (
      <div>
        <h1>Enter your list below</h1>
        <textarea
          rows="10"
          cols="50"
          value={this.state.data}
          onChange={this.updateState}
        />
        <hr />
        <input type="button" value="sort" onClick={this.sortData} />
        <hr />
        <input type="button" value={this.state.buttonA} />
        <br />
        <input type="button" value={this.state.buttonB} />
        <h4>{this.state.data}</h4>
      </div>
    );
  }
}
export default App;
