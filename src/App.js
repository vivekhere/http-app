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
    // clone the posts array
    const posts = [...this.state.posts];
    // get the index of post in the posts array
    const index = posts.indexOf(post);
    // go to that index and create a new object and spread post argument
    posts[index] = { ...post };
    this.setState({ posts });
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

// axios.put() -> to update all properties.
// first arg - url endpoint, second arg data to be sent to the server.
// When using the put method we should send the entire post object.
// example: axios.put(apiEndpoint + '/' + post.id, post)

// axios.patch() -> to update one or more properties.
// first arg - url endpoint, second arg data to be sent to the server.
// When using the patch method we don't have the sent the entire post object.
// We can send only one or more properties that we want to update.
// example: axios.put(apiEndpoint + '/' + post.id, { title: post.title })
