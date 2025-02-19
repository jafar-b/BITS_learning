import { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Box, CircularProgress, Button } from "@mui/material";
import "./App.css";

type Post = {
  userId: number | null;
  id: number | null;
  title: string;
  body: string;
};
function App() {
  const [post, setPost] = useState<Post | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [postError, setPostError] = useState<boolean>(false);
  const [newPostId, setNewPostId] = useState<number | null>(null); //used for setting the id received from axios post request  //used further to display the ID in the UI

  //for new post
  const [newPost, SetNewPost] = useState<Post>({
    id: null,
    userId: null,
    title: "",
    body: "",
  });

  useEffect(() => {
    if (id !== null) {
      setLoading(true);
    }
    const fetch = setTimeout(() => {
      handleFetchPost();
    }, 2000);
    return () => {
      clearTimeout(fetch);
    };
  }, [id]);

  const handleFetchPost = async () => {
    if (id === null || id === null) return;
    setPost(null);
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${id}`
      );
      setPost(await res.data);
    } catch (error) {
      setPostError(true);
      console.log(error);
    } finally {
      setLoading(false); // Stop loading after fetching           //thought in todays session
    }
  };

  const handleNewPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://jsonplaceholder.typicode.com/posts`,
        JSON.stringify(newPost),
        { headers: { "Content-Type": "application/json" } }
      );
      setNewPostId(await res.data.id);
      console.log(await res.data);
    } catch (err) {
      console.log("error in post request", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    SetNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2>Fetch Post using ID</h2>
        <div>
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            width={400}
            marginBottom={2}
          >
            <TextField
              label="Fetch post using ID"
              variant="outlined"
              value={id ?? ""}
              onChange={(e) => {
                setId(Number(e.target.value));
                setPostError(false);
              }}
              fullWidth
            />
          </Box>

          {!postError ? (
            loading ? (
              <CircularProgress />
            ) : (
              post && (
                <>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={1}
                    padding={2}
                    border={1}
                    alignItems={"flex-start"}
                    borderRadius={2}
                    width="90%"
                  >
                    <div>
                      <strong>Title:</strong> {post.title}
                    </div>
                    <div>
                      <strong>User ID:</strong> {post.userId}
                    </div>
                    <div>
                      <strong>Post ID:</strong> {post.id}
                    </div>
                    <div>
                      <strong>Body:</strong> {post.body}
                    </div>
                  </Box>
                </>
              )
            )
          ) : (
            <h1>Post not found</h1>
          )}
        </div>
        <div>
          <Box
            display="flex"
            flexDirection="column"
            marginTop={5}
            gap={2}
            width={400}
            component="form"
            onSubmit={handleNewPost}
          >
            <h2>Add a new Post</h2>
            <TextField
              label="User ID"
              variant="outlined"
              name="userId"
              value={newPost?.userId || ""}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              label="Title"
              variant="outlined"
              name="title"
              value={newPost?.title || ""}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Body"
              variant="outlined"
              name="body"
              value={newPost?.body || ""}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
            />
            <Button type="submit" variant="contained" color="primary">
              Add Post
            </Button>

            {newPostId && ( //displaying component only when newPostId is recieved
              <>
                <Box
                  display="flex"
                  flexDirection="column"
                  gap={1}
                  padding={2}
                  border={1}
                  alignItems={"flex-start"}
                  borderRadius={2}
                  width="90%"
                >
                  <h3>Post Added</h3>
                  <div>
                    <strong>Title:</strong> {newPost.title}
                  </div>
                  <div>
                    <strong>User ID:</strong> {newPost.userId}
                  </div>
                  <div>
                    <strong>Post ID:</strong> {newPostId}
                  </div>
                  <div>
                    <strong>Body:</strong> {newPost.body}
                  </div>
                </Box>
              </>
            )}
          </Box>
        </div>
      </div>
    </>
  );
}

export default App;
