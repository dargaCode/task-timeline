import React from "react";
import styles from "./TaskDetailsForm.module.scss";

// todo delete me
function getNotes(): JSX.Element {
  return (
    <div className={styles.notes}>
      {/* eslint-disable-next-line spellcheck/spell-checker */}
      {/* eslint-disable-next-line react/jsx-no-comment-textnodes */}
      <h3>// TODO</h3>
      <ol>
        <li>`Add Task` button, show/hide form</li>
        <li>Modal wrapper</li>
        <li>Better flow for deleting tasks</li>
        <li>Task tooltip (name, edit, delete)</li>
        <li>Modifying tasks (reuse form/modal)</li>
        <li>Convert scrolling to pagination</li>
        <li>Add zoom</li>
      </ol>
    </div>
  );
}

interface Props {
  onSubmit: (event: React.FormEvent) => void;
  minInputDate?: string;
  maxInputDate?: string;
}

interface State {
  [name: string]: string;
}

export default class TaskDetailsForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      name: "New Task",
      startDate: "2018-01-01",
      endDate: "2018-01-01"
    };
  }

  handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    const target = event.target as HTMLInputElement;

    this.setState({ [target.id]: target.value });
  };

  handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const { onSubmit } = this.props;

    // todo how to properly type this as an FormEvent?
    const syntheticEvent: any = {
      preventDefault: () => null,
      target: { value: { ...this.state } }
    };

    onSubmit(syntheticEvent);
  };

  render(): JSX.Element {
    const { minInputDate, maxInputDate } = this.props;
    const { name, startDate, endDate } = this.state;

    return (
      // false positive
      // eslint-disable-next-line css-modules/no-undef-class
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>
          {/* define via prop later, for edit */}
          <h2>Create Task</h2>

          <div className={styles.inputGroup}>
            {/* false positive */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            {/* false positive */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="startDate">Start Date:</label>
            <input
              id="startDate"
              type="date"
              min={minInputDate}
              max={maxInputDate}
              value={startDate}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            {/* false positive */}
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="endDate">End Date:</label>
            <input
              id="endDate"
              type="date"
              min={minInputDate}
              max={maxInputDate}
              value={endDate}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className={styles.footer}>
            <input type="submit" value="Submit" />
          </div>
        </form>
        {/* // todo delete me */}
        {getNotes()}
      </div>
    );
  }
}
