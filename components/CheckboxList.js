import * as React from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import NewTaskEditor from "./NewTaskEditor";
import TaskContext from "../states/context";

export default function CheckboxList() {
  //STATES
  const [checked, setChecked] = React.useState(null);
  const [active, setActive] = React.useState(null);
  const [showEditor, setShowEditor] = React.useState(false);
  const [parent] = useAutoAnimate();
  const [tasks, setTasks] = React.useContext(TaskContext);

  //FUNCTIONS
  const handleToggle = (index) => () => {
    setChecked(index);
    const missingTasks = [];
    tasks.forEach((element, i) => {
      if (i !== index) {
        missingTasks.push(element);
      }
    });

    //Fake api interaction
    setTimeout(() => {
      setTasks(missingTasks);
      setShowEditor(false);
      setChecked(null);
    }, 500);
  };

  const handleItemSelected = (index) => {
    setActive(index);
    setShowEditor(!showEditor);
  };

  return (
    <List ref={parent}>
      {tasks.map((value, i) => {
        const labelId = `checkbox-list-label-${value}`;
        return (
          <ListItem key={i} disablePadding>
            {showEditor && active === i ? (
              <NewTaskEditor
                {...{ value }}
                removeItem={handleToggle(i)}
                parentEditor={setShowEditor}
              />
            ) : (
              <ListItemButton role={undefined} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={checked === i}
                    tabIndex={-1}
                    onChange={handleToggle(i)}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={value}
                  onClick={() => handleItemSelected(i)}
                />
              </ListItemButton>
            )}
          </ListItem>
        );
      })}
    </List>
  );
}
