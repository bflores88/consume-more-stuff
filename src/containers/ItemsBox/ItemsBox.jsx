import React, { Component } from 'react';
import Card from '../../components/Card';

class ItemsBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      input: '',
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
  }

  // handleInputChange(e) {
  //   const { value } = e.target;
  //   this.setState({ input: value });
  // }

  render() {
    const input = this.state.input;
    const cardList = this.props.cards.map((card, idx) => {
      return (
        <Card
          key={idx}
          id={card.id}
          title={card.title}
          body={card.body}
          priority={card.priority}
          priority_id={card.priority_id}
          status={card.status}
          status_id={card.status_id}
          created_by={card.created_by}
          assigned_to={card.assigned_to}
          users={this.props.users}
        />
      );
    });
    return <>{cardList}</>;
  }
}

export default ItemsBox;
