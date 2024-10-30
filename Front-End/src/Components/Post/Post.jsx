import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaComments } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";

const Post = () => {
    const [post, setpost] = useState({});
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3000/post/${id}`,{
            headers : {
                Authorization : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => {
            console.log(response.data);
            setpost(response.data.data.post);
            })
            .catch(error => {
                console.error(error);
            })
    },[])
    return (
      <Box
        height={"100vh"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle, rgba(43,43,43,1) 0%, rgba(0,0,0,1) 96%)",
        }}>
        <Card key={post?._id} variant="outlined" sx={{ width: "50%" }}>
          <CardHeader
            sx={{
              backgroundColor: "#f0f0f0",
            }}
            action={
              <IconButton aria-label="back" onClick={() => navigate("/home")}>
                <FaArrowLeft />
              </IconButton>
            }
            avatar={
              <Avatar
                src={`http://localhost:3000/${post?.user_id?.image}`}
                sx={{ bgcolor: "red" }}
                aria-label="recipe">
                R
              </Avatar>
            }
            title={post?.user_id?.name}
            subheader={new Date(post?.user_id?.createdAt).toLocaleTimeString()}
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
        </Card>
      </Box>
    );
}

export default Post