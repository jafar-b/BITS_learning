import { useEffect, useState } from "react";
import axios from "axios";
import {
  TextField,
  Box,
  CircularProgress,
} from "@mui/material";

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



  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width={400}
        marginBottom={2}
      >
        <TextField
          label="Enter post ID"
          variant="outlined"
          value={id ?? null}
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
            {/* <button style={{marginTop:"10px"}} onClick={handleEdit}>Edit Post</button> */}
            </>
          )
        )
      ) : (
        <h1>Post not found</h1>
      )}



    </>
  );
}

export default App;
