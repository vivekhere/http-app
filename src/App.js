import React, { Component } from "react";
import axios from "axios"; // import axios
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };

  // the right place to call the server and get some data is in the
  // componentDidMount() lifecycle hook
  async componentDidMount() {
    // pending > resolved (success) OR rejected (failure )
    const { data: posts } = await axios.get(
      "http://jsonplaceholder.typicode.com/posts"
    ); // sends an http request and gets some data
    this.setState({ posts }); // update the state
  }

  handleAdd = () => {
    console.log("Add");
  };

  handleUpdate = (post) => {
    console.log("Update", post);
  };

  handleDelete = (post) => {
    console.log("Delete", post);
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => this.handleUpdate(post)}
                  >
                    Update
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;

// axios.get(url)
// This method returns a promise.
// A promise is an object that holds the result of an asynchronous operation.
// An asynchronous operation is an operation that is going to complete in the future.
// We can await the promise and get the actual result (response object).
// Whenever we use await in a function we need to add "async" keyword.
