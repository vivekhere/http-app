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
      await axios.delete(apiEndpoint + "/" + post.id); // delete post from server
    } catch (ex) {
      alert("Something failed while deleting a post!");
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

// Optimistic vs Pessimistic updates

// Pessimistic update
// We have implemented all the 'CRUD' operations there is a small issue in our
// previous implementation. Note that when we click on the delete button it takes
// about a second or half a second until the post is removed from the table.
// We have the same issue when adding a post or updating a post. There is a delay
// until we see the result.
// The reason is our previous implementation we are calling the server first and
// then updating the view or the UI.
// With this implementation when an error occurs while calling the server the
// rest of the function will not be executed. This is what we call a pessimistic
// update. So, we are not sure if a call to the server is going to succeed or fail.

// Pessimistic update
// We can assume most of the time the call to the server succeeds. So, instead of
// calling the server first which is going to take some time we gonna go ahead
// and update the UI and then call the server.
// If this call fails revert the UI back to the previous state. In React this is
// easy because we never update the state directly so we can always have a
// reference to the previous state.
