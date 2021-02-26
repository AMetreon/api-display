import React, { Component } from "react"
import "./styles.css"
import { TextField } from "@material-ui/core"
import Details from "./Details"

const styles = {
  textField: {
    marginBottom: "10px",
    marginTop: "0px"
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      nameInput: "",
      isClicked: true,
      tagInput: "",
      tags: []
    }
    this.setTags = this.setTags.bind(this)
  }

  async componentDidMount() {
    const url = "https://api.hatchways.io/assessment/students"
    const response = await fetch(url)
    const data = await response.json()
    this.setState({ data: JSON.parse(JSON.stringify(data.students)) })
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  setTags = (tags = [], id) => {
    this.setState(prevState => ({
      tags: prevState.data.map(element =>
        element.id === id ? Object.assign(element, { tags: tags }) : element
      )
    }))
  }

  filteredArray = () => {
    const { data, nameInput, tags } = this.state

    let filteredNames = data.filter(item => {
      return (
        item.firstName.toLowerCase().includes(nameInput) ||
        item.lastName.toLowerCase().includes(nameInput)
      )
    })

    /*
      item.tags.includes... will be undefined where item.tags is not defined.
      item.tags is only defined when you insert a tag at a student.
      The other students will have undefined tags.
      Therefore, I think to resolve your probelm
      you should initialize a blank tags[] for each student.
    */
    let filteredTags = tags.filter(item => {
      return "" //item.tags.includes(tagInput);
    })
    return filteredTags.length === 0 ? filteredNames : filteredTags
  }

  render() {
    return (
      <div>
        <TextField
          name="nameInput"
          id="name-input"
          type="text"
          placeholder="Search by name"
          style={styles.textField}
          fullWidth="true"
          onChange={this.handleOnChange.bind(this)}
          autoComplete="off"
        />

        <TextField
          name="tagInput"
          id="tag-input"
          type="text"
          placeholder="Search by tags"
          fullWidth="true"
          onChange={this.handleOnChange.bind(this)}
          autoComplete="off"
        />

        <Details array={this.filteredArray()} action={this.setTags} />
      </div>
    )
  }
}

export default App
