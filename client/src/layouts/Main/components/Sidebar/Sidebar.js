import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, Drawer } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import IncidentIcon from '@material-ui/icons/Warning';
import AgentIcon from '@material-ui/icons/HeadsetMic'
import CatalogIcon from '@material-ui/icons/ShoppingCart';
import ChangeIcon from '@material-ui/icons/DeviceHub';
import KnowledgeIcon from '@material-ui/icons/MenuBook';
import CMDBIcon from '@material-ui/icons/Extension';
import SettingsIcon from '@material-ui/icons/Settings';
import ProblemIcon from '@material-ui/icons/Error';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
}));

const Sidebar = props => {
  const { open, variant, onClose, className, ...rest } = props;

  const classes = useStyles();

  const pages = [
    {
      title: 'Home',
      href: '/dashboard',
      icon: <HomeIcon />
    },
    {
      title: 'Catalog',
      href: '/products',
      icon: <CatalogIcon />
    },
    {
      title: 'Agent',
      href: '/users',
      icon: <AgentIcon />
    },
    {
      title: 'Incident',
      href: '/users',
      icon: <IncidentIcon />
    },
    {
      title: 'Problem',
      href: '/sign-in',
      icon: <ProblemIcon />
    },
    {
      title: 'Change',
      href: '/typography',
      icon: <ChangeIcon />
    },
    {
      title: 'Knowledge',
      href: '/icons',
      icon: <KnowledgeIcon />
    },
    {
      title: 'CMDB',
      href: '/account',
      icon: <CMDBIcon />
    },
    {
      title: 'Settings',
      href: '/settings',
      icon: <SettingsIcon />
    }
  ];

  return (
    <Drawer
      anchor="left"
      classes={{ paper: classes.drawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
        <Profile />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
          pages={pages}
        />
      </div>
    </Drawer>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
