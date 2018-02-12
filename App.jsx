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
      ],
      index: 0
    };

    this.rewind = this.rewind.bind(this);
    this.fastForward = this.fastForward.bind(this);
    this.updateState = this.updateState.bind(this);
    this.sortSetup = this.sortSetup.bind(this);
    this.sortData = this.sortData.bind(this);
  }

  addToHistory(stateChanges) {
    let history = this.state.history;
    let current = Object.assign({}, history[this.state.index]); //create a copy
    console.log("In addToHistory dataArr=" + current.dataArr);
    // check that stateChanges is not empty
    if (Object.keys(stateChanges).length !== 0) {
      for (const prop in stateChanges) {
        current[prop] = stateChanges[prop];
      }

      if (this.state.index < history.length - 1) {
        history = history.slice(0, this.state.index);
      }

      this.setState({
        history: history.concat([current]),
        index: this.state.index + 1
      });
    }
  }

  rewind(e) {
    const i = this.state.index;

    if (i > 0) {
      this.setState({ index: i - 1 });
    }
  }

  fastForward(e) {
    const i = this.state.index;

    if (i < this.state.history.length - 1) {
      this.setState({ index: i + 1 });
    }
  }

  updateState(e) {
    console.log("In updateState data=" + e.target.value);
    this.addToHistory({ data: e.target.value });
  }

  sortSetup(e) {
    const history = this.state.history;
    const current = history[this.state.index];
    let newMid = Math.floor((current.hi + current.lo) / 2);
    const tempDataArr = current.data.split("\n");

    console.log("In sortSetup");

    this.addToHistory({
      dataArr: tempDataArr,
      buttonA: tempDataArr[newMid],
      buttonB: tempDataArr[current.i],
      showButtons: true
    });
  }

  sortData(e) {
    const history = this.state.history;
    const current = history[this.state.index];
    let mid = Math.floor((current.hi + current.lo) / 2);
    let stateTmp = {};

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

          stateTmp.dataArr = tmpArr;
          stateTmp.data = tmpArr.join("\n");
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
        stateTmp.buttonA = current.dataArr[newMid];
        stateTmp.buttonB = current.dataArr[current.i];
      } else {
        // sort is done, hide buttons and reset state
        stateTmp.dataArr = [];
        stateTmp.showButtons = false;
        stateTmp.buttonA = "";
        stateTmp.buttonB = "";
        stateTmp.i = 1;
        stateTmp.hi = 1;
        stateTmp.lo = 0;
      }
    }

    console.log("In sortData");

    this.addToHistory(stateTmp);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.index];

    return (
      <div>
        <SortBox
          {...current}
          onChange={this.updateState}
          onClick={this.sortData}
          onStart={this.sortSetup}
        />
        <hr />
        index={this.state.index} <br />
        <input type="button" value="<<" onClick={this.rewind} />
        <input type="button" value=">>" onClick={this.fastForward} />
      </div>
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
