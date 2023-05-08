import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle login form submission here
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  return (
    <Container style={{ height: "90vh" }} maxWidth="xs">
      <Box mt={5} mb={3}>
        <Typography variant="h4" align="center">
          Login
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          onChange={(e) => handleEmailChange(e)}
          value={email}
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
        <Box mt={2}>
          <Button
            onClick={() => {
              if (email === "admin") {
                navigate("/admin/dashboard");
              } else {
                navigate("/dashboard");
              }
            }}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Login;
