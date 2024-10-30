import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EditPost = ({ open, onClose, id }) => {
  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState([]);
  const [description, setDescription] = useState("");
  const [category, setcategory] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      axios
        .get(`http://localhost:3000/post/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          setTitle(res?.data.data.post.title);
          setDescription(res?.data.data.post.description);
        })
        .catch((err) => console.log(err));

      axios
        .get("http://localhost:3000/category", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          console.log(res.data.data.categories);
          setCategories(res.data.data.categories);
        })
        .catch((err) => console.log(err));
    }
  }, [open, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title,
      category_id: category,
      description,
    };
    console.log(data);
    axios
      .patch(`http://localhost:3000/post/${id}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        alert("Post updated");
        navigate("/home");
      })
      .catch((err) => {
        alert(err.response.data.msg);
        console.log(err)
      });
      onClose();
  };

  const handleCategory = (e) => {
    console.log(e.target.value);
    setcategory(e.target.value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
      }}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          id="title"
          name="title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          required
          margin="dense"
          id="description"
          name="description"
          label="Description"
          type="text"
          fullWidth
          variant="standard"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormControl sx={{ marginTop: "15px" }}>
          <FormLabel sx={{ fontWeight: "bold" }}>Category:</FormLabel>
          <RadioGroup
            row
            onChange={handleCategory}
            name="category">
            {categories?.map((element) => (
              <FormControlLabel
                key={element._id}
                value={element._id}
                control={<Radio />}
                label={element.name}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Edit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPost;
