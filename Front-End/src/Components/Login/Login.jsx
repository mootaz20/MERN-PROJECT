import { Box, Button, IconButton, InputAdornment, TextField, Typography} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdEmail, MdLock, MdVisibility, MdVisibilityOff } from "react-icons/md";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [passwordVisibility, setPasswordVisibility] = useState(false)
  
    const handleSubmit = () => {
      const data = {
        email: email,
        password: password
      }
      axios.post('http://localhost:3000/login',data)
      .then(res => {
        console.log(res.data.data.token);
        localStorage.setItem('token',res.data.data.token);
        navigate('/home',{
            replace : true
        })
      });
      console.log('Login submitted', { email, password });
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
            LOGIN
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
                  <MdEmail size={"25px"} color="white" />
                </InputAdornment>
              ),
            }}
            type="email"
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={(e) => setEmail(e.target.value)}
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
            id="outlined-basic"
            label="Password"
            variant="outlined"
            onChange={(e) => setPassword(e.target.value)}
          />
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
            onClick={handleSubmit}>
            LOGIN
          </Button>
          <Typography
            color="white"
            fontWeight={"bold"}
            mt={"10px"}
            fontSize={"15px"}>
            Dont Have An Account ?
            <Button
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  borderColor: "white",
                  backgroundColor: "transparent",
                },
              }}
              onClick={() => navigate("SignUp")}
              size="large">
              SIGN UP
            </Button>
          </Typography>
        </Box>
      </Box>
    );
}

export default Login