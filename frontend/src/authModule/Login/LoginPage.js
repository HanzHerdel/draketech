import TextField from "../../components/formBasics/TextFieldFormsy.js";
import Button from "@material-ui/core/Button";
import Formsy from "formsy-react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

import { useState } from "react";
import { createUser, logingUser } from "../store/actions.js";
import { useDispatch } from "react-redux";

const LoginPage = () => {
  const [formLogin, setformLogin] = useState({ username: "", password: "" });
  const [FormValid, setFormValid] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setformLogin((formLogin) => {
      return { ...formLogin, [e.target.name]: e.target.value };
    });
  };

  const handleCreateUser = () => {
    dispatch(createUser(formLogin));
  };

  const handleLoginUser = () => {
    dispatch(logingUser(formLogin));
  };
  const userNameProps = {
    name: "username",
    label: "Username",
    sm: 8,
    md: 8,
    onChange: handleChange,
    value: formLogin.username,
    required: true,
    validations: {
      matchRegexp: /^([a-zA-ZÀ-ÿ0-9-][a-zA-ZÀ-ÿ0-9-,.\s]*[a-zA-ZÀ-ÿ0-9.])$/,
    },
    validationErrors: {
      matchRegexp: "Not valid input.",
      isDefaultRequiredValue: "Required field.",
    },
    inputProps: {
      maxLength: 200,
    },
  };
  const passwordProps = {
    name: "password",
    label: "Password",
    sm: 8,
    md: 8,
    onChange: handleChange,
    value: formLogin.password,
    required: true,
    validations: {
      matchRegexp: /^([a-zA-ZÀ-ÿ0-9-][a-zA-ZÀ-ÿ0-9-,.\s]*[a-zA-ZÀ-ÿ0-9.])$/,
    },
    validationErrors: {
      matchRegexp: "Not valid input.",
      isDefaultRequiredValue: "Required field.",
    },
    inputProps: {
      maxLength: 200,
    },
    type: "password",
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "beige",
        position: "absolute",
      }}
    >
      <Paper
        style={{
          borderRadius: 8,
          margin: "48px auto 0",
          padding: 24,
          maxWidth: 320,
        }}
        elevation={1}
      >
        <Formsy
          onValid={() => setFormValid(true)}
          onInvalid={() => setFormValid(false)}
        >
          <Grid
            spacing={3}
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <TextField {...userNameProps} />
            <TextField {...passwordProps} />
            <Grid item>
              <Button
                disabled={!FormValid}
                onClick={handleLoginUser}
                variant="contained"
                color="primary"
              >
                Log in
              </Button>
            </Grid>
            <Grid item>
              <Button
                disabled={!FormValid}
                onClick={handleCreateUser}
                color="primary"
              >
                Create user
              </Button>
            </Grid>
          </Grid>
        </Formsy>
      </Paper>
    </div>
  );
};
export default LoginPage;
