import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Grid,
  Stack,
  TextField,
} from "@mui/material";
import {
  Calendar,
  Unlock,
  PlusSquare,
  Maximize2,
  StopCircle,
  Sun,
  Plus,
  X,
  Trash,
  Save,
} from "react-feather";
import TaskContext from "../states/context";

export default function NewTaskEditor({ value, parentEditor, removeItem }) {
  //STATES
  const [newTask, setNewTask] = React.useState(value || "");
  const [showEditor, setShowEditor] = React.useState(false);
  const [tasks, setTasks] = React.useContext(TaskContext);

  const inputRef = React.useRef(null);

  //FUNCTIONS
  const addNewTask = () => {
    if (newTask && !value) {
      setTasks([...tasks, newTask]);
      setNewTask("");
      setShowEditor(false);
    } else if (newTask && value) {
      const itemIndex = tasks.indexOf(value);
      const updatedTasks = [...tasks];
      updatedTasks[itemIndex] = newTask;
      setTasks(updatedTasks);
      parentEditor(false);
    } else if (!newTask && value) {
      parentEditor(false);
    } else {
      setShowEditor(false);
    }
  };

  const cancelTaskCreation = () => {
    setNewTask("");
    setShowEditor(false);
    if (value && parentEditor) {
      parentEditor(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      addNewTask();
    }
  };

  const handleNewTask = (event) => {
    setNewTask(event.target.value);
  };

  const handleShowEditor = () => {
    setShowEditor(true);
  };

  React.useEffect(() => {
    if (value) {
      setShowEditor(true);
      inputRef.current.focus();
    }
  }, [value]);

  return (
    <Box
      sx={{
        boxShadow: showEditor
          ? "rgba(149, 157, 165, 0.2) 0px 8px 24px"
          : "none",
      }}
      paddingX={2.3}
      paddingY={1.5}
    >
      <TextField
        variant="standard"
        className="full_width"
        onKeyUp={(event) => handleKeyPress(event)}
        value={newTask}
        onChange={(event) => handleNewTask(event)}
        inputRef={inputRef}
        onClick={handleShowEditor}
        placeholder="Type to add a new task"
        id="input-with-icon-adornment"
        InputProps={{
          startAdornment: value ? (
            <Checkbox
              checked={false}
              onChange={() => removeItem(tasks.indexOf(value))}
            />
          ) : (
            <PlusSquare
              color="#3498db"
              style={{ marginRight: "10px" }}
              size={28}
            />
          ),
          endAdornment: (
            <Avatar
              variant="circle"
              alt="avatar-image"
              src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
              sx={{
                width: 27,
                height: 27,
                cursor: !newTask ? "normal" : "pointer",
                display: showEditor ? "flex" : "none",
              }}
            />
          ),
          disableUnderline: true,
        }}
      />
      <Grid
        container
        spacing={2}
        flexDirection="row"
        justifyContent="space-between"
        mt={3}
        sx={{ display: showEditor ? "flex" : "none" }}
      >
        <Grid item>
          <Stack flexDirection="row" gap={0.8} flexWrap="wrap">
            <Button
              variant="outlined"
              disabled={!newTask}
              size="small"
              sx={{ marginRight: "15px" }}
            >
              {<Maximize2 size={20} />}
              <span className="hiden_on_md">Open</span>
            </Button>
            <Button variant="outlined" disabled={!newTask} size="small">
              {<Calendar size={20} />}
              <span className="hiden_on_md">Today</span>
            </Button>
            <Button variant="outlined" disabled={!newTask} size="small">
              {<Unlock size={20} />}
              <span className="hiden_on_md">Public</span>
            </Button>
            <Button variant="outlined" disabled={!newTask} size="small">
              {<Sun size={20} />}
              <span className="hiden_on_md">Normal</span>
            </Button>
            <Button variant="outlined" disabled={!newTask} size="small">
              {<StopCircle size={25} />}
              <span className="hiden_on_md">Estimation</span>
            </Button>
            <Button
              variant="outlined"
              className="hiden_on_lg"
              disabled={!newTask}
              size="small"
              onClick={cancelTaskCreation}
            >
              {<Trash size={25} />}
            </Button>
          </Stack>
        </Grid>
        <Grid item>
          <Stack flexDirection="row" gap={0.8} paddingY={0}>
            <Button
              variant="contained"
              className="hiden_on_md"
              size="small"
              color="secondary"
              onClick={cancelTaskCreation}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="hiden_on_md"
              size="small"
              onClick={addNewTask}
            >
              {newTask && !value ? "Add" : newTask && value ? "Save" : "Ok"}
            </Button>
            <Button
              variant="contained"
              className="hiden_on_lg"
              size="small"
              onClick={addNewTask}
            >
              {newTask && !value ? (
                <Plus size={25} />
              ) : newTask && value ? (
                <Save size={25} />
              ) : (
                <X size={25} />
              )}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
