"use strict";
import React from "react";

// check on resorting a sorted list
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      //data: "a\nb\nh\nc", //\ng\nd\ne\nf",
      //data: "a\nb\nh\nc\ng\nd\ne\nf",
      data: "3\n2\n1",
      dataArr: [],
      showButtons: false,
      buttonA: "",
      buttonB: "",
      i: 1,
      hi: 1,
      lo: 0
    };
    this.updateState = this.updateState.bind(this);
    this.setButtonValues = this.setButtonValues.bind(this);
    this.sortSetup = this.sortSetup.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  updateState(e) {
    this.setState({ data: e.target.value });
  }

  setButtonValues(e) {
    // update the button text
    let newMid = Math.floor((this.state.hi + this.state.lo) / 2);
    this.setState({
      buttonA: this.state.dataArr[newMid],
      buttonB: this.state.dataArr[this.state.i]
    });
  }

  sortSetup(e) {
    this.state.dataArr = this.state.data.split("\n");
    this.setButtonValues();
    this.setState({
      showButtons: true
    });
  }

  sortData(e) {
    let mid = Math.floor((this.state.hi + this.state.lo) / 2);

    if (this.state.i < this.state.dataArr.length) {
      // perform the next step of the binary search
      switch (e.target.value) {
        case this.state.buttonA:
          this.state.lo = mid + 1;
          break;

        case this.state.buttonB:
          this.state.hi = mid - 1;
          break;
      }

      switch (true) {
        case this.state.lo > this.state.hi:
          // The binary search is done, insert A[i] at A[lo]
          let tmpItem = this.state.dataArr[this.state.i];
          let tmpArr = this.state.dataArr;
          tmpArr.splice(this.state.i, 1);
          tmpArr.splice(this.state.lo, 0, tmpItem);

          this.setState({
            dataArr: tmpArr,
            data: tmpArr.join("\n")
          });
        // fall through to next case

        case this.state.i === this.state.hi && this.state.i === this.state.lo:
          // A[i] is in the correct place, so move to the next element
          this.state.i++;
          this.state.hi = this.state.i;
          this.state.lo = 0;
      }

      if (this.state.i < this.state.dataArr.length) {
        // set button text up for next comparison
        this.setButtonValues();
      } else {
        // sort is done, hide buttons
        this.setState({
          dataArr: [],
          showButtons: false,
          buttonA: "",
          buttonB: "",
          i: 1,
          hi: 1,
          lo: 0
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
        <table>
          <tbody>
            <tr>
              <td>data:</td>
              <td>{this.state.data}</td>
            </tr>
            <tr>
              <td>dataArr:</td>
              <td>{this.state.dataArr}</td>
            </tr>
            <tr>
              <td>i:</td>
              <td>{this.state.i}</td>
            </tr>
            <tr>
              <td>hi:</td>
              <td>{this.state.hi}</td>
            </tr>
            <tr>
              <td>mid:</td>
              <td>{Math.floor((this.state.hi + this.state.lo) / 2)}</td>
            </tr>
            <tr>
              <td>lo:</td>
              <td>{this.state.lo}</td>
            </tr>
          </tbody>
        </table>

        <hr />
        {this.state.showButtons ? (
          <div>
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
          </div>
        ) : (
          <input type="button" value="sort" onClick={this.sortSetup} />
        )}
      </div>
    );
  }
}
export default App;
