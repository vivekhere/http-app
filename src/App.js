import React, { Component } from "react";
import axios from "axios";
import "./App.css";

const apiEndpoint = "http://jsonplaceholder.typicode.com/posts";

class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    // pending > resolved (success) OR rejected (failure)
    const { data: posts } = await axios.get(apiEndpoint);
    this.setState({ posts });
  }

  handleAdd = async () => {
    const obj = { title: "a", body: "b" };
    const { data: post } = await axios.post(apiEndpoint, obj);

    // add the newly created post to posts
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleUpdate = async (post) => {
    post.title = "UPDATED";
    await axios.put(apiEndpoint + "/" + post.id, post);

    // to update
    const posts = [...this.state.posts];
    const index = posts.indexOf(post);
    posts[index] = { ...post };
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    const originalPosts = this.state.posts;

    // remove post from table / UI
    const posts = this.state.posts.filter((p) => p.id !== post.id);
    this.setState({ posts });

    try {
      await axios.delete("s" + apiEndpoint + "/" + post.id); // delete post from server
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        // expected
        alert("This post has already been deleted.");
      else {
        // unexpected
        // Log the error (for now just log it in the console)
        console.log("Logging the error", ex);
        alert("An unexpected error occurred.");
      }

      // Whether we have an expected or unexpected we should revert the UI to
      // it's previous state.
      this.setState({ posts: originalPosts });
    }
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

// Expected vs UnExpected Errors

// Expected - errors that our api endpoints predict and return.
// example - 404: not found, 400: bad request (invalid data)
// All these error are in the 400 range. In http protocol these are referred as
// CLIENT ERRORS. Errors that happen because client did something wrong.
// - Display a specific message to the user.

// Unexpected errors - these errors should not happen under normal circumstances.
// example - network down, server down, db down, bug
// - Log them: so in future we can look at our log and find the errors that should
// not have happened.
// - Display a generic and friendly error message to the user.
// example - An unexpected error occurred.

// How can we identify that the exception (ex) we get in the catch block is
// expected or unexpected error ?
// The expection (ex) object has 2 properties - request and response.
// The ex.response is set if we successfully get a response from the server.
// If the network is down or the server crashes we won't get a response so this
// property will be null.
// The ex.request will be set if we can successfully submit a request to the server.
// Otherwise it will be null.
