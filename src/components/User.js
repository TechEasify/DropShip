import React, { useEffect, useState } from 'react';
import { Menu, MenuItem } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { getProfileUser } from '../routes/helper';
import { ActionList, Button, ButtonGroup, InlineStack, Popover } from '@shopify/polaris';
import { ChevronDownIcon } from '@shopify/polaris-icons';

export default function User() {
  const [user, setUser] = useState([]);
  const history = useHistory();
  const [active, setActive] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const toggleActive = (id) => () => {
    setActive((activeId) => (activeId !== id ? id : null));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    getProfileUser()
      .then((res) => {
        setUser(res);
        // console.log(user);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <li className="pf-d-inline-block">
        <ul
          className="nav"
          id="dashboard__user-dropdown-account-menu"
          style={{ width: '100%' }}
        >
          <li className="dropdown">
            <a
              className="dropdown-toggle header__link pf-d-md-flex pf-flex-column pf-flex-md-row pf-align-items-center"
              data-toggle="dropdown"
              style={{ marginTop: 10 }}
            >
              <button
                onClick={handleClick}
                style={{ border: 'none' }}
                type="button"
              >
                <i className="header__link__icon pf-i pf-i-account pf-i-24 pf-mr-auto pf-mr-sm-4" />
                <span className="header__link__text dashboard__account-menu-text">
                  {user.name !== undefined && user.name.split(' ')[0]}
                </span>
              </button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <a
                    style={{ textDecoration: 'none', color: '#000' }}
                    href="#"
                  >
                    Home page
                  </a>
                </MenuItem>
                <MenuItem onClick={() => history.push('/auth/logout')}>
                  Logout
                </MenuItem>
              </Menu>
            </a>
          </li>
        </ul>
      </li>

      {/* <li className='pf-d-inline-block'>
        <div style={{ height: '100px' }}>
          <InlineStack gap="500">
            <ButtonGroup variant="segmented">
              <Button variant="primary">Save</Button>

              <Popover
                active={active === 'popover1'}
                preferredAlignment="right"
                activator={
                  <Button
                    variant="primary"
                    onClick={toggleActive('popover1')}
                    icon={ChevronDownIcon}
                    accessibilityLabel="Other save actions"
                  />
                }
                autofocusTarget="first-node"
                onClose={toggleActive('popover1')}
              >
                <ActionList
                  actionRole="menuitem"
                  items={[{ content: 'Save as draft' }]}
                />
              </Popover>
            </ButtonGroup>
          </InlineStack>
        </div>
      </li> */}

    </>
  );
}
