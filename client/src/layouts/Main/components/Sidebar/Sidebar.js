import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {Divider, Drawer, List, ListItem} from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import IncidentIcon from '@material-ui/icons/Warning';
import AgentIcon from '@material-ui/icons/HeadsetMic'
import CatalogIcon from '@material-ui/icons/ShoppingCart';
import ChangeIcon from '@material-ui/icons/DeviceHub';
import KnowledgeIcon from '@material-ui/icons/MenuBook';
import CMDBIcon from '@material-ui/icons/Extension';
import SettingsIcon from '@material-ui/icons/Settings';
import ProblemIcon from '@material-ui/icons/Error';
import BuilderIcon from '@material-ui/icons/Code';
import * as Components from '../../../../components';

import { Profile, SidebarNav } from './components';

const useStyles = makeStyles(theme => ({
  moduleDrawer: {
    width: 40,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  drawer: {
    marginLeft: 40,
    width: 200,
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

  const [modules, setModules] = useState([]);

  fetch('/api/rest/system_module').then(res => res.json())
    .then(
      (result) => {
        setModules(result);
      }
    );

  const pages = [
    {
      title: 'Home',
      href: '/Dashboard',
      icon: <HomeIcon />
    },
    {
      title: 'Catalog',
      href: '/ProductList',
      icon: <CatalogIcon />
    },
    {
      title: 'Agent',
      href: '/UserList',
      icon: <AgentIcon />
    },
    {
      title: 'Incident',
      href: '/UserList',
      icon: <IncidentIcon />
    },
    {
      title: 'Problem',
      href: '/SignIn',
      icon: <ProblemIcon />
    },
    {
      title: 'Change',
      href: '/Typography',
      icon: <ChangeIcon />
    },
    {
      title: 'Knowledge',
      href: '/Icons',
      icon: <KnowledgeIcon />
    },
    {
      title: 'CMDB',
      href: '/Account',
      icon: <CMDBIcon />
    },
    {
      title: 'Component Builder',
      href: '/ComponentBuilder',
      icon: <BuilderIcon />
    },
    {
      title: 'Settings',
      href: '/Settings',
      icon: <SettingsIcon />
    }
  ];

  return (
    <span>
    <Drawer
      anchor="left"
      classes={{ paper: classes.moduleDrawer }}
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        {...rest}
        className={clsx(classes.root, className)}
      >
         <List
           {...rest}
           className={clsx(classes.root, className)}
         >
          {modules.map(module => (
            <ListItem
              className={classes.item}
              disableGutters
              key={module.name}
            >
              <Components.MaterialIcon icon={module.icon}/>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
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
      </span>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
  variant: PropTypes.string.isRequired
};

export default Sidebar;
