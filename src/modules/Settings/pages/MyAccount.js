/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect } from 'react';
import {
  
  FormControl,
  Select,
  Button,
  FormHelperText,
  NativeSelect,
} from '@mui/material';
import {makeStyles} from '@mui/styles';
import { Email, Password } from '../../../components';
import { UserProfile, UserPutProfile } from '../actions';
import { Users } from './Users';
import { Security } from './Security';

const EmailTab = (props) => (
  <div className="col-md-12">
    <Email Cancel={props.Cancel} />
  </div>
);
const PasswordTab = (props) => (
  <div className="col-md-12">
    <Password Cancel={props.Cancel} />
  </div>
);
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    Width: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export function MyAccount() {
  const [user, setUser] = useState([]);
  const classes = useStyles();
  const [isFull, setIsFull] = useState(false);
  const [state, setState] = useState({
    name: '',
    gender: '',
  });
  const handleChange = (event) => {
    const { name } = event.target;
    const { value } = event.target;
    setState({
      ...state,
      [name]: value,
    });
    console.log(state);
  };

  const [clickedEmail, setClickedEmail] = useState(false);
  const [clickedPassword, setClickedPassword] = useState(false);

  useEffect(() => {
    UserProfile()
      .then((res) => {
        setUser(res);
        console.log(res);
        localStorage.setItem('user', JSON.stringify(res));
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.gender === '') {
      setState({ ...state, gender: user.gender });
    }
    // console.log(state);
    UserPutProfile(state)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location.reload(false);
  };
  useEffect(() => {
    setIsFull(state.gender !== '' && state.name !== '');
  }, [state.gender, state.name]);
  return (
    <>
      <div className="container-fluid dashboard__container clearfix">
        <div>
          <div className="store-settings container__wrapper">
            <h2 className="pf-h2 pf-my-40">Settings: My Account</h2>
            <Security />
            {!clickedEmail && !clickedPassword && (
              <>
                <form
                  autoComplete="off"
                  className="form-horizontal defaults-main-form"
                  onSubmit={handleSubmit}
                >
                  <h5 className="pf-my-0 page-title"> Personal Information</h5>
                  <hr />
                  <div className="row">
                    <div className="col-md-12 margin-bottom-50">
                      <div className="form-group">
                        <label className="col-sm-4 control-label">
                          Full name:
                        </label>
                        <div className="col-sm-5">
                          <input
                            id="username"
                            placeholder={user.name}
                            onChange={(e) => {
                              setState({ ...state, name: e.target.value });
                            }}
                            type="text"
                            name="name"
                            className="inspectletIgnore"
                            required
                            aria-required="true"
                            aria-invalid="false"
                          />
                        </div>
                      </div>
                      <div className="col-md-12 margin-bottom-50">
                        <div className="form-group">
                          <label className="col-sm-4 control-label">
                            Gender:
                          </label>
                          <div className="col-sm-5">
                            <FormControl className={classes.formControl}>
                              <Select
                                native
                                style={{ width: 200 }}
                                onChange={handleChange}
                                inputProps={{
                                  name: 'gender',
                                  id: 'age-native-simple',
                                }}
                                defaultValue={user.gender}
                              >
                                <option value={`${user.gender}`}>
                                  Current : {user.gender === null && 'None'}
                                  {user.gender === 'men' && 'Male'}
                                  {user.gender === 'women' && 'Female'}
                                  {user.gender === 'other' && 'Other'}
                                </option>
                                <option value="men">Male</option>
                                <option value="women">Female</option>
                                <option value="other">Other</option>
                              </Select>
                            </FormControl>
                          </div>
                        </div>
                      </div>
                      <div className="form-group change-email-block">
                        <label className="col-sm-4 control-label">Email:</label>
                        <div className="col-sm-5">
                          <input
                            type="text"
                            disabled="disabled"
                            placeholder="Email"
                            name="email"
                            className="disabled form-control inspectletIgnore"
                            aria-required="false"
                            aria-invalid="false"
                          />
                        </div>
                        <div className="col-sm-1 pf-pt-8">
                          <a
                            href="#"
                            className="margin-left-10"
                            onClick={() => setClickedEmail(true)}
                            style={{ fontSize: 14 }}
                          >
                            Change
                          </a>
                        </div>
                      </div>
                      <input type="number" name="blank" className="pf-d-none" />
                      <div className="form-group field-customer-password_old">
                        <label className="col-sm-4 control-label">
                          Password:
                        </label>
                        <div className="col-sm-5">
                          <input
                            type="password"
                            defaultValue="********"
                            disabled="disabled"
                            name="password"
                            className="form-control"
                          />
                          <div className="help-block" />
                        </div>
                        <div className="col-sm-1" style={{ paddingTop: 8 }}>
                          <a
                            href="#"
                            className="margin-left-10"
                            onClick={() => setClickedPassword(true)}
                            style={{ fontSize: 14 }}
                          >
                            Change
                          </a>
                        </div>
                      </div>
                      <div className="form-group pf-mb-0">
                        <div
                          className={`col-md-8 offset-sm-4 margin-top-20 ${
                            isFull && 'hidden'
                          }`}
                        />

                        <div
                          className={`col-md-8 offset-sm-4 margin-top-20 ${
                            !isFull && 'hidden'
                          }`}
                        >
                          <input
                            type="submit"
                            className="pf-btn pf-btn-primary"
                            defaultValue="Save changes"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </>
            )}
            {clickedEmail && <EmailTab Cancel={() => setClickedEmail(false)} />}
            {clickedPassword && (
              <PasswordTab Cancel={() => setClickedPassword(false)} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
