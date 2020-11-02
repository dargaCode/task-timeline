import React from "react";
import { action } from "@storybook/addon-actions";
import TaskDetailsForm from "./TaskDetailsForm";

export default {
  title: "TaskDetailsForm",
  component: TaskDetailsForm
};

export const Basic = (): JSX.Element => (
  <TaskDetailsForm
    onSubmit={(event: React.FormEvent): void => {
      event.preventDefault();

      action("onSubmit");
    }}
  />
);
