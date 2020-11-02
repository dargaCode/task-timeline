import React from "react";

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

  render(): JSX.Element {
    const { onSubmit } = this.props;
    const { name, startDate, endDate } = this.state;

    return (
      <div>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="startDate">Start Date:</label>
            <input
              id="startDate"
              type="date"
              value={startDate}
              onChange={this.handleChange}
              required
            />
          </div>

          <div>
            <label htmlFor="endDate">End Date:</label>
            <input
              id="endDate"
              type="date"
              value={endDate}
              onChange={this.handleChange}
              required
            />
          </div>

          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
