/** @jsx React.DOM */
var React = require('react');
var ReactPropTypes = React.PropTypes;
var TopicActionCreators = require('../actions/TopicActionCreators');
var TopicTextInput = require('./TopicTextInput.react');

var cx = require('react/lib/cx');

var TopicItem = React.createClass({

  propTypes: {
    topic: ReactPropTypes.object.isRequired
  },

  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  /**
   * @return {object}
   */
  render: function() {
    var topic = this.props.topic;
    var input;
    if (this.state.isEditing) {
      input =
        <TopicTextInput
          className="edit"
          onSave={this._onSave}
          value={topic.text}
        />;
    }

    // List items should get the class 'editing' when editing
    // and 'completed' when marked as completed.
    // Note that 'completed' is a classification while 'complete' is a state.
    // This differentiation between classification and state becomes important
    // in the naming of view actions toggleComplete() vs. destroyCompleted().
    return (
      <li
        className={cx({
          'editing': this.state.isEditing
        })}
        key={topic.id}>
        <div className="view">
          <label onDoubleClick={this._onDoubleClick}>
            {topic.text}
          </label>
          <button className="increment" onClick={this._onIncrement}>+</button>
          <button className="decrement" onClick={this._onDecrement}>-</button>
          <button className="destroy" onClick={this._onDestroyClick}>{String.fromCharCode(215)}</button>
        </div>
        {input}
      </li>
    );
  },

  _onToggleComplete: function() {
    TopicActionCreators.toggleComplete(this.props.topic);
  },

  _onDoubleClick: function() {
    this.setState({isEditing: true});
  },

  _onIncrement: function() {
    TopicActionCreators.increment(this.props.topic.id);
  },

  _onDecrement: function() {
    TopicActionCreators.decrement(this.props.topic.id);
  },

  /**
   * Event handler called within TopicTextInput.
   * Defining this here allows TopicTextInput to be used in multiple places
   * in different ways.
   * @param  {string} text
   */
  _onSave: function(text) {
    TopicActionCreators.updateText(this.props.topic.id, text);
    this.setState({isEditing: false});
  },

  _onDestroyClick: function() {
    TopicActionCreators.destroy(this.props.topic.id);
  }

});

module.exports = TopicItem;