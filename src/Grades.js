import React, { Component } from "react"
import AddIcon from "@material-ui/icons/Add"
import RemoveIcon from "@material-ui/icons/Remove"
import { Collapse, TextField } from "@material-ui/core"
import Tags from "./Tags"

class Grades extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isClicked: true,
      value: "",
      tags: []
    }
  }

  handleOnClick = e => {
    this.setState({ isClicked: this.state.isClicked ? false : true })
  }

  handleOnChange = e => {
    this.setState({ value: e.target.value })
  }

  handleKeyPress = e => {
    if (e.keyCode === 13) {
      this.setState(
        {
          tags: [...this.state.tags, this.state.value],
          value: ""
        },
        () => {
          this.props.action(this.state.tags, this.props.id)
        }
      )
    }
  }

  render() {
    const { tags, isClicked } = this.state
    return (
      <div>
        {isClicked ? (
          <AddIcon
            id="expand-btn" //please note that changing id to class destroy's material-ui
            color="disabled"
            fontSize="large"
            onClick={() => this.handleOnClick(this.props.id)}
          />
        ) : (
          <RemoveIcon
            id="expand-btn" //please note that changing id to class destroy's material-ui
            color="disabled"
            fontSize="large"
            onClick={() => this.handleOnClick(this.props.id)}
          />
        )}

        <Collapse in={!this.state.isClicked}>
          {this.props.grades.map((grade, key) => (
            <div class="tests">
              <p>
                Test {key + 1}:{" "}
                <span className="grade" key={key}>
                  {grade} %
                </span>
              </p>
            </div>
          ))}

          <Tags tags={tags} />

          <br />

          <TextField
            id={this.props.id}
            type="text"
            placeholder="Add a tag"
            value={this.state.value}
            onChange={this.handleOnChange.bind(this)}
            onKeyDown={this.handleKeyPress}
            autoComplete="off"
          />
        </Collapse>
      </div>
    )
  }
}

export default Grades
