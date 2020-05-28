import React, { useRef, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Button, Input,TextField, Select, MenuItem, Grid } from '@material-ui/core';
import Editor from '@monaco-editor/react';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4),
    height: "100%"
  },
  fullHeight: {
    height: "100%"
  }
}));

const ComponentBuilder = () => {
  const [isEditorReady, setIsEditorReady] = useState(false);

  const classes = useStyles();
  const valueGetter = useRef();

  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];


  function handleEditorDidMount(_valueGetter) {
    setIsEditorReady(true);
    valueGetter.current = _valueGetter;
  }

  function handleShowValue() {
    alert(valueGetter.current());
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={2} className={classes.fullHeight}>
        <Grid item xs={12}>
          <Button variant="contained" color="primary" onClick={handleShowValue} disabled={!isEditorReady}>
            Save
          </Button>
        </Grid>
        <Grid item xs={6}>
          <TextField id="outlined-basic" label="Script Name" variant="outlined" fullWidth />
        </Grid>
        <Grid item xs={6}>

        </Grid>
        <Grid className={classes.fullHeight} item xs={12}>
          <Editor
            language="javascript"
            theme="vs-light"
            editorDidMount={handleEditorDidMount}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default ComponentBuilder;
