import React from "react";
import { action } from "@storybook/addon-actions";
import TaskDetailsForm from "./TaskDetailsForm";

export default {
  title: "TaskDetailsForm",
  component: TaskDetailsForm
};

export const Basic = (): JSX.Element => (
  <TaskDetailsForm
    onSubmit={event => {
      event.preventDefault();

      action("onSubmit");
    }}
  />
);
