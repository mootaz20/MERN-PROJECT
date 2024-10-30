import { Box, Button, IconButton, InputAdornment, styled, TextField, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { MdCloudUpload, MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { CiCalendarDate } from "react-icons/ci";

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

const SignUp = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [age, setAge] = useState(0);
    const [file, setFile] = useState('');
    const navigate = useNavigate();
    const [passwordVisibility, setPasswordVisibility] = useState(false);
  
    const handleSignUp = () => {
      const formData = new FormData();
      console.log(file);
      formData.append("img", file);
      axios
        .post("http://localhost:3000/upload-image", formData)
        .then((res) => {
          console.log(res.data);
          const data = {
            name: name,
            email: email,
            password: password,
            age: age,
            image: res.data.data,
          };
          axios
            .post("http://localhost:3000/register", data)
            .then((res) => {
              console.log(res.data.data.token);
              localStorage.setItem("token", res.data.data.token);
              navigate("/home", {
                replace: true,
              });
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
        });
      // const data = {
      //   name: name,
      //   email: email,
      //   password: password,
      //   age: age,
      // };
      // axios
      //   .post("http://localhost:3000/register", data)
      //   .then((res) => {
      //     console.log(res.data.data.token);
      //     localStorage.setItem("token", res.data.data.token);
      //     navigate("/home", {
      //       replace: true,
      //     });
      //   })
      //   .catch((err) => console.log(err));
    };
  
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          background:
            "radial-gradient(circle, rgba(43,43,43,1) 0%, rgba(0,0,0,1) 96%)",
        }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            p: 2,
            boxShadow: "0px 0px 15px 0px rgba(143,143,143,0.88)",
            borderRadius: "15px",
            width: "40%",
          }}>
          <Typography
            color="white"
            fontWeight={"bold"}
            fontSize={"35px"}
            mb={"10px"}>
            SIGN UP
          </Typography>
          <TextField
            sx={{
              width: "100%",
              mb: 4,
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "transparent",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CgProfile size={"25px"} color="white" />
                </InputAdornment>
              ),
            }}
            type="text"
            id="name-field"
            label="Name"
            variant="outlined"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            sx={{
              width: "100%",
              mb: 4,
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "transparent",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdEmail size={"25px"} color="white" />
                </InputAdornment>
              ),
            }}
            type="email"
            id="email-field"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            sx={{
              width: "100%",
              mb: 4,
              "& .MuiOutlinedInput-root": {
                color: "white",
                backgroundColor: "transparent",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CiCalendarDate size={"25px"} color="white" />
                </InputAdornment>
              ),
            }}
            type="number"
            id="age-field"
            label="Age"
            variant="outlined"
            onChange={(e) => setAge(e.target.value)}
          />

          <TextField
            sx={{
              width: "100%",
              mb: 2,
              "& .MuiOutlinedInput-root": {
                color: "white",
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
              "& .MuiInputLabel-root": {
                color: "white",
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "white",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MdLock size={"25px"} color="white" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setPasswordVisibility(!passwordVisibility)}>
                    {passwordVisibility ? (
                      <MdVisibilityOff size={"25px"} color="white" />
                    ) : (
                      <MdVisibility size={"25px"} color="white" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            type={`${passwordVisibility ? "text" : "password"}`}
            id="password-field"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            sx={{
              display: "flex",
              width: "100%",
              height: "30px",
              marginBottom: "10px",
              borderColor : 'white',
              color: 'white',
              ":hover": {
                backgroundColor : "transparent"
              }
            }}
            component="label"
            variant="outlined"
            tabIndex={-1}
            startIcon={<MdCloudUpload />}>
            Upload files
            <VisuallyHiddenInput
              type="file"
              onChange={(event) => setFile(event.target.files[0])}
              multiple
            />
          </Button>
          <Button
            sx={{
              color: "white",
              borderColor: "white",
              "&:hover": {
                borderColor: "white",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              },
            }}
            size="large"
            variant="outlined"
            type="submit"
            onClick={handleSignUp}>
            SIGN UP
          </Button>
          <Typography
            color="white"
            fontWeight={"bold"}
            mt={"10px"}
            fontSize={"15px"}>
            Already have an account?
            <Button
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => navigate("Login")}
              size="large">
              LOGIN
            </Button>
          </Typography>
        </Box>
      </Box>
    );
}

export default SignUp