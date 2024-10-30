import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Collapse,
  Container,
  FormControl,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { FaComments } from "react-icons/fa6";
import { BiEdit, BiSend, BiShow } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import EditPost from "../../EditPost/EditPost";
import { useState } from "react";

const HomePosts = ({ posts }) => {
  const [text, settext] = useState('')
  const navigate = useNavigate();
  const [id, setid] = useState("");
  const [open, setOpen] = useState(false);
  const [expandedCardId, setExpandedCardId] = useState(null);

  const handleExpandClick = (postId) => {
    setExpandedCardId((prev) => (prev === postId ? null : postId));
  };  

  const handleDeleteButton = (id) => {
    if (window.confirm("Are you sure ?")) {
      axios
        .delete(`http://localhost:3000/post/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => console.log(res.data))
        .catch((err) => {
          console.log(err.response.data.msg);
          alert(err.response.data.msg);
        });
    }
  };
  const handleEditClick = (id) => {
    setid(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmitComment = (id) => {
    const data = {
      text,
      post_id : id
    }
    console.log(data);
    axios
    .post(`http://localhost:3000/comment`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
        }
        })
        .then((res) => console.log(res.data))
        .catch((err) => {
          console.log(err.response.data.msg);
          alert(err.response.data.msg);
        })
  }


  return (
    <Box minHeight={"100vh"}>
      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
          paddingTop: "20px",
          marginBottom: "50px",
          height: "100%",
        }}>
        {posts.length === 0 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}>
            <Typography
              sx={{
                fontSize: "60px",
                color: "#333",
              }}>
              No posts found
            </Typography>
          </Box>
        )}
        {posts.length !== 0 &&
          posts?.map((post) => {
            const isExpanded = expandedCardId === post._id;
            return (
              <Card key={post?._id} variant="outlined" sx={{ width: "100%" }}>
                <CardHeader
                  sx={{
                    backgroundColor: "#f0f0f0",
                  }}
                  avatar={
                    <Avatar
                      src={`http://localhost:3000/${post?.user_id?.image}`}
                      sx={{ bgcolor: "red" }}
                      aria-label="recipe">
                      R
                    </Avatar>
                  }
                  title={post?.user_id?.name}
                  subheader={new Date(
                    post?.user_id?.createdAt
                  ).toLocaleTimeString()}
                />
                <CardMedia
                  component="img"
                  height="194"
                  image={`http://localhost:3000/${post?.image}`}
                  alt="Paella dish"
                />
                <CardContent>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    variant="body2"
                    sx={{}}>
                    {post?.title}
                  </Typography>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    variant="body2"
                    sx={{}}>
                    {post?.description}
                  </Typography>
                  <Typography
                    fontWeight={"bold"}
                    fontSize={"20px"}
                    variant="body2"
                    sx={{}}>
                    Category: {post?.category_id?.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <IconButton>
                    <FaComments
                      expand={isExpanded}
                      onClick={() => handleExpandClick(post._id)}
                      aria-expanded={isExpanded}
                      aria-label="show more"
                    />
                  </IconButton>
                  <IconButton onClick={() => navigate(`/post/${post?._id}`)}>
                    <BiShow />
                  </IconButton>
                  <IconButton onClick={() => handleEditClick(post?._id)}>
                    <BiEdit />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteButton(post?._id)}>
                    <MdDelete />
                  </IconButton>
                </CardActions>
                <Collapse
                  sx={{ borderTop: "3px solid black" }}
                  in={isExpanded}
                  timeout="auto"
                  unmountOnExit>
                  <Box
                    sx={{
                      margin: 1,
                      padding: 1,
                    }}>
                    {post?.comments?.map((comment) => (
                      <Box
                        sx={{
                          borderBottom: "1px solid rgba(0, 0, 0, 0.3)",
                          marginBottom: 2
                        }}
                        key={comment._id}>
                        <Typography>
                          {new Date(comment?.createdAt).toLocaleTimeString()}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{ mt: 1 }}
                          fontWeight={"bold"}>
                          {comment.text}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  <FormControl
                    sx={{ marginBottom: 7, padding: 2, width: "100%" }}
                    onSubmit={(e) => handleSubmitComment(e, post?._id)}>
                    <TextField
                      sx={{
                        flex: 1,
                      }}
                      variant="outlined"
                      size="small"
                      onChange={(e) => settext(e.target.value)}
                      placeholder="Write a comment..."
                    />
                    <Button
                      onClick={() => handleSubmitComment(post._id)}
                      type="submit"
                      size="small"
                      variant="outlined"
                      sx={{
                        color: "#000",
                        border: "1px solid #000",
                        marginTop: 3,
                      }}
                      startIcon={<BiSend />}>
                      Send
                    </Button>
                  </FormControl>
                </Collapse>
              </Card>
            );
          })}
      </Container>
      <EditPost open={open} onClose={handleClose} id={id} />
    </Box>
  );
};

export default HomePosts;
