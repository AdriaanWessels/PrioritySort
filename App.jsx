"use strict";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "c\na\nb",
      dataArr: [],
      buttonA: "",
      buttonB: "",
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
    console.log(dataArr);
    console.log("value = " + e.target.value);
    console.log("start: i:" + this.state.i + "   j:" + this.state.j);
    // perform the next step of the insertion sort
    if (e.target.value !== "sort") {
      if (this.state.j > 0 && e.target.value === this.state.buttonA) {
        // swap dataArr[j] and dataArr[j-1]
        console.log("swap " + this.state.j + " and " + (this.state.j - 1));
        console.log("swap:  i:" + this.state.i + "   j:" + this.state.j);

        let swapTmp = dataArr[this.state.j];
        dataArr[this.state.j] = dataArr[this.state.j - 1];
        dataArr[this.state.j - 1] = swapTmp;

        console.log(dataArr);

        // update the data in the textarea
        let newData = dataArr.join("\n");
        this.setState({
          data: newData
        });

        this.state.j--;
      } else {
        this.state.i++;
        this.state.j = this.state.i;
        console.log("adv:   i:" + this.state.i + "   j:" + this.state.j);
      }
    }

    console.log("end:   i:" + this.state.i + "   j:" + this.state.j);

    console.log(this.state.i + "<" + dataArr.length);

    if (this.state.i < dataArr.length) {
      this.setState({
        buttonA: dataArr[this.state.j - 1],
        buttonB: dataArr[this.state.j]
      });
    } else {
      this.setState({
        buttonA: "",
        buttonB: ""
      });
    }
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
        <input
          type="button"
          value={this.state.buttonA}
          onClick={this.sortData}
        />
        <br />
        <input
          type="button"
          value={this.state.buttonB}
          onClick={this.sortData}
        />
        <h4>{this.state.data}</h4>
      </div>
    );
  }
}
export default App;
