import React, { Component } from "react";
import Grades from "./Grades";

class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: []
    };

    this.getTags = this.getTags.bind(this);
  }

  getTags(tags, id) {
    this.setState({ tags: tags }, () => this.props.action(tags, id));
  }

  render() {
    return (
      <div>
        {this.props.array.map((item, key) => {
          const avg =
            item.grades.reduce((sum, curr) => sum + Number(curr), 0) /
            item.grades.length;

          return (
            <div class="cards">
              <div class="image">
                <img src={item.pic} alt="pic" /> <br />
              </div>

              <div class="details">
                <strong key={key}>
                  {item.firstName} {item.lastName}
                </strong>
                <p>
                  Email: {item.email} <br />
                  Company: {item.company} <br />
                  Skill: {item.skill} <br />
                  Average: {avg}%
                </p>
              </div>

              <Grades
                key={key}
                id={item.id}
                grades={item.grades}
                action={this.getTags}
              />
            </div>
          );
        })}
      </div>
    );
  }
}

export default Details;
