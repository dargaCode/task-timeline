import React from "react";
import styles from "./TaskDetailsForm.module.scss";

interface Props {
  onSubmit: (event: React.FormEvent) => void;
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

    const syntheticEvent: any = {
      preventDefault: () => null,
      target: { value: { ...this.state } }
    };

    onSubmit(syntheticEvent);
  };

  render(): JSX.Element {
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
              value={endDate}
              onChange={this.handleChange}
              required
            />
          </div>

          <div className={styles.footer}>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
