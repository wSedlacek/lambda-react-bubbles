import React from 'react';

import { makeStyles, FormGroup, Button } from '@material-ui/core';

import { User } from '../../../models/User';
import { Input } from '../../reusable/input/input.component';

const useStyles = makeStyles(() => ({
  root: {
    width: '50%',
    minWidth: 500,
    padding: 10,
  },
  button: {
    marginTop: 40,
    marginBottom: 20,
    marginRight: 'auto',
    marginLeft: 'auto',
  },
  link: {
    color: 'white',
    margin: 10,
    marginRight: 'auto',
    marginLeft: 'auto',
    textDecoration: 'none',
  },
}));

type LoginFormProps = {
  onSubmit: (user: User) => void;
};

const LoginForm: React.FunctionComponent<LoginFormProps> = ({ onSubmit }) => {
  const classes = useStyles({});
  const [user, setUser] = React.useState<User>({
    username: 'Lambda School',
    password: 'i<3Lambd4',
  });

  const handleChange = (key: string) => {
    return (value: string) => {
      setUser({
        ...user,
        [key]: value,
      });
    };
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(user);
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup className={classes.root}>
        <Input
          elevation={8}
          leadingIcon='account_circle'
          placeholder='Username'
          type='username'
          value={user.username}
          onChange={handleChange('username')}
          ariaLabel='username'
        />
        <Input
          elevation={8}
          leadingIcon='lock'
          placeholder='Password'
          type='password'
          value={user.password}
          onChange={handleChange('password')}
          ariaLabel='password'
        />
        <Button className={classes.button} color='primary' variant='contained' type='submit'>
          Login
        </Button>
      </FormGroup>
    </form>
  );
};

export { LoginForm };
