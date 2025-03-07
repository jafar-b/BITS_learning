import { useState } from "react";
import { Table, Card, Button } from "antd";
import { Post } from "./models/Post";
import { Comment } from "./models/Comment";
import { usePostStore } from "./store/PostStore";
import { useCommentStore } from "./store/CommentStore";
import { Link } from "react-router-dom";
import BackButton from "./components/BackButton";

const BlogManagement = () => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const posts = usePostStore((state) => state.posts);
  const comments = useCommentStore((state) => state.comments);

  const postColumns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Post) => (
        <a onClick={() => setSelectedPost(record)}>View Post</a>
      ),
    },
  ];

  const commentColumns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Comment", dataIndex: "body", key: "body" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: Comment) => (
        <a onClick={() => setSelectedComment(record)}>View Details</a>
      ),
    },
  ];
  return (
    <div
      style={{ padding: 20, width: "100%", height: "90%", overflow: "auto" }}
    >
      <BackButton />
      <h2 style={{ marginTop: 10 }}>Blog Management</h2>
      {!selectedPost ? (
        <>
          <h3>All Posts</h3>
          <Table
            columns={postColumns}
            pagination={{ pageSize: 6 }}
            dataSource={posts}
            rowKey="id"
          />
        </>
      ) : (
        <>
          <h3>Selected Post</h3>
          <Card title={selectedPost.title} style={{ marginBottom: 20 }}>
            <p>Body: {selectedPost.body}</p>
            <p>User ID: {selectedPost.userId}</p>
            <p>Total comments for the post: {selectedPost.comment_count}</p>
            <p>
              Link for the post:{" "}
              <Link to={selectedPost.link}>{selectedPost.link}</Link>
            </p>
            <Button onClick={() => setSelectedPost(null)}>Back to Posts</Button>
          </Card>
          <h3>Comments for the post</h3>
          <Table
            columns={commentColumns}
            dataSource={comments.filter((c) => c.postId === selectedPost.id)} //Comment_count and the comments rendered in the UI DONT match up because of API, no fault in the code
            rowKey="id"
          />
        </>
      )}

      {selectedComment && (
        <>
          <h3>Comment details</h3>
          <Card title="Comment Details" style={{ marginTop: 20 }}>
            <p>
              <strong>Author:</strong> {selectedComment.name}
            </p>
            <p>
              <strong>Comment:</strong> {selectedComment.body}
            </p>
            <Button onClick={() => setSelectedComment(null)}>Close</Button>
          </Card>
        </>
      )}
    </div>
  );
};

export default BlogManagement;
