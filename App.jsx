"use strict";
import React from "react";
class ManualSort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [
        {
          data: "",
          dataArr: [],
          showButtons: false,
          buttonA: "",
          buttonB: "",
          i: 1,
          hi: 1,
          lo: 0
        }
      ]
    };

    this.updateState = this.updateState.bind(this);
    this.sortSetup = this.sortSetup.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  addToHistory(stateChanges) {
    const history = this.state.history;
    const current = history[history.length - 1];

    for (const prop in stateChanges) {
      current[prop] = stateChanges[prop];
    }

    this.setState({ history: history.concat([current]) });
  }

  updateState(e) {
    this.addToHistory({ data: e.target.value });
  }

  sortSetup(e) {
    const history = this.state.history;
    const current = history[history.length - 1];
    let newMid = Math.floor((current.hi + current.lo) / 2);
    const tempDataArr = current.data.split("\n");

    this.addToHistory({
      dataArr: tempDataArr,
      buttonA: tempDataArr[newMid],
      buttonB: tempDataArr[current.i],
      showButtons: true
    });
  }

  sortData(e) {
    const history = this.state.history;
    const current = history[history.length - 1];
    let mid = Math.floor((current.hi + current.lo) / 2);

    if (current.i < current.dataArr.length) {
      // perform the next step of the binary search
      switch (e.target.value) {
        case current.buttonA:
          current.lo = mid + 1;
          break;

        case current.buttonB:
          current.hi = mid - 1;
          break;
      }

      switch (true) {
        case current.lo > current.hi:
          // The binary search is done, insert A[i] at A[lo]
          let tmpItem = current.dataArr[current.i];
          let tmpArr = current.dataArr;
          tmpArr.splice(current.i, 1);
          tmpArr.splice(current.lo, 0, tmpItem);

          this.addToHistory({
            dataArr: tmpArr,
            data: tmpArr.join("\n")
          });
        // drop through to the next case

        case current.i === current.hi && current.i === current.lo:
          // A[i] is in the correct place, so move to the next element
          current.i++;
          current.hi = current.i;
          current.lo = 0;
          break;
      }

      if (current.i < current.dataArr.length) {
        // set button text up for next comparison
        let newMid = Math.floor((current.hi + current.lo) / 2);
        this.addToHistory({
          buttonA: current.dataArr[newMid],
          buttonB: current.dataArr[current.i]
        });
      } else {
        // sort is done, hide buttons and reset state
        this.addToHistory({
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
    const history = this.state.history;
    const current = history[history.length - 1];

    return (
      <SortBox
        {...current}
        onChange={this.updateState}
        onClick={this.sortData}
        onStart={this.sortSetup}
      />
    );
  }
}

function SortBox(props) {
  return (
    <div>
      <h1>Enter your list below</h1>
      <textarea
        rows="10"
        cols="50"
        value={props.data}
        onChange={props.onChange}
      />
      <hr />
      <table>
        <tbody>
          <tr>
            <td>data:</td>
            <td>{props.data}</td>
          </tr>
          <tr>
            <td>dataArr:</td>
            <td>{props.dataArr}</td>
          </tr>
          <tr>
            <td>i:</td>
            <td>{props.i}</td>
          </tr>
          <tr>
            <td>hi:</td>
            <td>{props.hi}</td>
          </tr>
          <tr>
            <td>mid:</td>
            <td>{Math.floor((props.hi + props.lo) / 2)}</td>
          </tr>
          <tr>
            <td>lo:</td>
            <td>{props.lo}</td>
          </tr>
        </tbody>
      </table>

      <hr />
      {props.showButtons ? (
        <div>
          <input type="button" value={props.buttonA} onClick={props.onClick} />
          <br />
          <input type="button" value={props.buttonB} onClick={props.onClick} />
        </div>
      ) : (
        <input type="button" value="sort" onClick={props.onStart} />
      )}
    </div>
  );
}

export default ManualSort;
