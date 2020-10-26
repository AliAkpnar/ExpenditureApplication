import React, { Component } from "react";
import AppNav from "./AppNav";
import DatePicker from "react-datepicker";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import {
  Button,
  FormGroup,
  Form,
  Container,
  Label,
  Input,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import Moment from "react-moment";

class Expenditures extends Component {
  emptyItem = {
    id: "105",
    expenditureDate: new Date(),
    descript: "",
    location: "",
    category: { id: 1, name: "Travel" },
  };

  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      isLoading: true,
      Expenditures: [],
      Categories: [],
      item: this.emptyItem,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();

    const item = this.state.item;

    await fetch(`/v1/expenditures`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });

    console.log(this.state);
    this.props.history.push("/expenditures");
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let item = { ...this.state.item };

    item[name] = value;
    this.setState(item);
    console.log(this.state.item);
  }

  handleDateChange(date) {
    let item = { ...this.state.item };
    item.expenditureDate = date;
    this.setState({ item });
  }

  async remove(id) {
    await fetch(`/v1/expenditures/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then(() => {
      let updatedExpenditures = [...this.state.Expenditures].filter(
        (i) => i.id !== id
      );
      this.setState({ Expenditures: updatedExpenditures });
    });
  }

  async componentDidMount() {
    const response = await fetch("/v1/categories");
    const body = await response.json();

    this.setState({ Categories: body, isLoading: false });

    const responseExp = await fetch("/v1/expenditures");
    const bodyExp = await responseExp.json();

    this.setState({ Expenditures: bodyExp, isLoading: false });
  }

  render() {
    const title = <h3>Add Expenditure</h3>;
    const { Categories } = this.state;
    const { Expenditures, isLoading } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    let optionList = Categories.map((category) => (
      <option value={category.id} key={category.id}>
        {category.name}
      </option>
    ));

    let rows = Expenditures.map((expenditure) => (
      <tr key={expenditure.id}>
        <td>{expenditure.descript}</td>
        <td>{expenditure.location}</td>
        <td>
          <Moment date={expenditure.expenditureDate} format="YYYY/MM/DD" />
        </td>
        <td>{expenditure.category.name}</td>
        <td>
          <Button
            size="sm"
            color="danger"
            onClick={() => this.remove(expenditure.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    ));

    return (
      <div>
        <AppNav />

        <Container>
          {title}
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input
                type="text"
                name="title"
                id="title"
                onChange={this.handleChange}
                autoComplete="name"
              />
            </FormGroup>

            <FormGroup>
              <Label for="category">Category</Label>
              {"         "}
              <select> {optionList} </select>
            </FormGroup>

            <FormGroup>
              <Label for="expenditureDate">Expenditure Date</Label>
              <DatePicker
                selected={this.state.item.expenditureDate}
                onChange={this.handleDateChange}
              />
            </FormGroup>

            <div className="row">
              <FormGroup className="col-md-4 mb-3">
                <Label for="location">Location</Label>
                <Input
                  type="text"
                  name="location"
                  id="location"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </div>

            <FormGroup>
              <Button color="primary" type="submit">
                Save
              </Button>{" "}
              <Button color="secondary" tag={Link} to="/">
                Cancel
              </Button>
            </FormGroup>
          </Form>
        </Container>

        {""}
        <Container>
          <h3>Expenditure List</h3>
          <Table className="mt-4">
            <thead>
              <tr>
                <th width="30%">Description</th>
                <th width="25%">Location</th>
                <th> Date </th>
                <th> Category </th>
                <th width="10%">Action</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default Expenditures;
