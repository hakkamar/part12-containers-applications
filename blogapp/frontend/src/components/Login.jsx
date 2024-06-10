import { useState } from "react";
import { useDispatch } from "react-redux";
import { haeJaAsetaUser } from "../reducers/userReducer";

import { Form, Button, Input, Lista } from "../tyylit";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();

    dispatch(haeJaAsetaUser({ username, password }));

    setUsername("");
    setPassword("");
  };

  const Home = () => (
    <p>
      Tervetuloa sivuille. Liiku valikossa olevilla valinnoilla. Vain
      kirjautunut käyttäjä voi lisätä blogeja. Kuka vaan voi kommentoida
      blogeja.
    </p>
  );

  return (
    <Lista>
      <Home />

      <Form onSubmit={handleLogin}>
        <label>
          Username:
          <Input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <Input
            type="password"
            value={password}
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <Button id="login-button" type="submit">
          Login
        </Button>
      </Form>
    </Lista>
  );
};

export default Login;
