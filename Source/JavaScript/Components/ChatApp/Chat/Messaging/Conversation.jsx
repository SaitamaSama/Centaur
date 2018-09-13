import React, { Component } from 'react';
import MessageGroup from "./MessageGroup";
import "../../../../../Styles/Conversation.scss";

export default class Conversation extends Component {
  state = {
    groupedConversation: []
  };

  groupConvo() {
    const convo = this.props.conversation;

    let lastSender = null;
    const mutated = [];

    convo.forEach(thread => {
      if(thread.sender === lastSender) {
        const lastIndex = mutated.length - 1;
        mutated[lastIndex].messages.push({
          ...thread
        });

        return;
      }

      mutated.push({
        sender: thread.sender,
        messages: [{
          ...thread
        }]
      });
      lastSender = thread.sender;
    });

    this.setState({
      groupedConversation: mutated
    });
  }

  componentDidMount() {
    this.groupConvo();
  }

  componentDidUpdate(prevProps) {}

  render() {
    return (
      <section className="conversation">
        {this.state.groupedConversation.map((conversation, index) => (
          <MessageGroup key={index} conversation={conversation} activeUsername={this.props.activeUsername} />
        ))}
      </section>
    );
  }
}