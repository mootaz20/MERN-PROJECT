import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, styled, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdCloudUpload } from "react-icons/md";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const AddPost = ({open,onClose}) => {
  const [categories, setcategories] = useState([]);
  const [title, settitle] = useState('');
  const [description, setdescription] = useState('');
  const [image, setimage] = useState('');
  const [category, setcategory] = useState('');

  useEffect(()=>{
    axios
      .get("http://localhost:3000/category", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        setcategories(res.data.data.categories);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const handleCategoryChange = (e)=> {
    const findCategory = categories.find(el => el.name === e.target.value);
    console.log(findCategory._id);
    setcategory(findCategory._id);
  }
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData();
          formData.append('img',image);
          axios
            .post("http://localhost:3000/upload-image", formData)
            .then((res) => {
              console.log(res.data);
              const data = {
                title: title,
                description: description,
                category_id : category,
                image : res.data.data
              };
              axios
                .post("http://localhost:3000/post", data, {
                  headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
                })
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log(err);
            });

          onClose();
        },
      }}>
      <DialogTitle fontWeight={'bold'} fontSize={'30px'}>ADD Post :</DialogTitle>
      <DialogContent>
        <TextField
          required
          id="Title"
          name="Title"
          label="Title"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => settitle(e.target.value)}
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
          onChange={(e) => setdescription(e.target.value)}
        />
        <FormControl sx={{ marginTop: "15px" }}>
          <FormLabel
            id="demo-row-radio-buttons-group-label"
            sx={{ fontWeight: "bold" }}>
            Category :
          </FormLabel>
          <RadioGroup
            row
            onChange={handleCategoryChange}
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group">
              {categories?.map((element) => {
                return (
                  <FormControlLabel
                    key={element._id}
                    value={element.name}
                    control={<Radio />}
                    label={element.name}
                  />
                )
              })}
          </RadioGroup>
        </FormControl>
        <Button
        sx={{
            display : 'flex',
            width : '50%',
            height : '50px',
            marginTop : '10px'
        }}
          component="label"
          variant="outlined"
          tabIndex={-1}
          startIcon={<MdCloudUpload />}>
          Upload files
          <VisuallyHiddenInput
            type="file"
            onChange={(event) => setimage(event.target.files[0])}
            multiple
          />
        </Button>
      </DialogContent>
      <DialogActions>
        <Button sx={{fontWeight : 'bold'}} onClick={onClose}>Cancel</Button>
        <Button sx={{fontWeight : 'bold'}} type="submit">ADD</Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddPost