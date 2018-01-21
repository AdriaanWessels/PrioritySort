"use strict";
import React from "react";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "a\nb\nh\nc\ng\nd\ne\nf",
      buttonA: "",
      buttonB: "",
      i: 1,
      hi: 1,
      lo: 0
    };
    this.updateState = this.updateState.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  updateState(e) {
    this.setState({ data: e.target.value });
  }

  sortData(e) {
    let dataArr = this.state.data.split("\n");
    let mid = Math.floor((this.state.hi + this.state.lo) / 2);

    if (this.state.i < dataArr.length) {
      // perform the next step of the binary search
      switch (e.target.value) {
        case this.state.buttonA:
          this.state.lo = mid + 1;
          break;

        case this.state.buttonB:
          this.state.hi = mid - 1;
          break;
      }

      if (this.state.lo > this.state.hi) {
        // if the binary search is done insert A[i] in the correct place
        let tmpItem = dataArr[this.state.i];
        dataArr.splice(this.state.i, 1);
        dataArr.splice(this.state.lo, 0, tmpItem);
        this.setState({
          data: dataArr.join("\n")
        });
        // move to the next element
        this.state.i++;
        this.state.hi = this.state.i;
        this.state.lo = 0;
      }

      if (this.state.i < dataArr.length) {
        // update the button text
        let newMid = Math.floor((this.state.hi + this.state.lo) / 2);
        console.log("newMid:" + newMid);
        this.setState({
          buttonA: dataArr[newMid],
          buttonB: dataArr[this.state.i]
        });
      } else {
        // data is sorted
        this.setState({
          buttonA: "",
          buttonB: ""
        });
      }
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
