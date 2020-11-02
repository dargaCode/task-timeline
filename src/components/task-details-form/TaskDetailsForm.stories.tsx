import React from "react";
import TaskDetailsForm from "./TaskDetailsForm";

export default {
  title: "TaskDetailsForm",
  component: TaskDetailsForm
};

export const Basic = (): JSX.Element => (
  <TaskDetailsForm
    onSubmit={event => {
      event.preventDefault();

      console.log(event.target);
    }}
  />
);
