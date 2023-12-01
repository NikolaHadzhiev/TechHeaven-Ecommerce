import { LockOutlined } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Container,
  Paper,
  Avatar,
  Typography,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import apiRequests from "../../app/api/requests";
import { toast } from "react-toastify";
import "./Register.scss";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors, isValid },
  } = useForm({ mode: "onTouched" });

  function handleApiErrors(errors: any) {
    if (errors) {
      errors.forEach((error: string) => {
        if (error.includes("Password")) {
          setError("password", { message: error });
        } else if (error.includes("Email")) {
          setError("email", { message: error });
        } else if (error.includes("Username")) {
          setError("username", { message: error });
        }
      });
    }
  }

  return (
    <Container
      component={Paper}
      maxWidth="sm"
      className="registerContainerStyle"
    >
      <Avatar className="registerAvatarStyle">
        <LockOutlined />
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit((data) =>
          apiRequests.Account.register(data)
            .then(() => {
              toast.success("Registration successful - you can now login");
              navigate("/login");
            })
            .catch((error) => handleApiErrors(error))
        )}
        noValidate
        className="registerFormStyle"
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          {...register("username", { required: "Username is required" })}
          error={!!errors.username}
          helperText={errors?.username?.message as string}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/,
              message: "Not a valid email address",
            },
          })}
          error={!!errors.email}
          helperText={errors?.email?.message as string}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{6,}$/,
              message: "Password must be at least 6 characters, at least one digit, at least one uppercase, at least one symbol",
            },
          })}
          error={!!errors.password}
          helperText={errors?.password?.message as string}
        />
        <LoadingButton 
          disabled={!isValid}
          loading={isSubmitting} 
          type="submit" 
          fullWidth 
          variant="contained" 
          className="registerLoadingButtonStyle"
        >
          Register
        </LoadingButton>
        <Grid container>
          <Grid item>
            <Link to="/login" style={{ textDecoration: 'none', color: "rgb(156, 39, 176)"}}>
              {"Already have an account? Sign In"}
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default RegisterPage;
