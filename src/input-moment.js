import cx from 'classnames';
import moment from 'moment';
import React, { Component } from 'react';
import Calendar from './calendar';
import Time from './time';
import time from './time';

export default class InputMoment extends Component {
  static defaultProps = {
    prevMonthIcon: 'ion-ios-arrow-left',
    nextMonthIcon: 'ion-ios-arrow-right',
    dateIcon: 'ion-calendar im-btn',
    timeIcon: 'ion-clock im-btn',
    onValidate: m => true,
    customText: {},
    minStep: 1,
    hourStep: 1,
  };

  state = {
    tab: 0,
    _moment: this.props.moment.clone(),
  };

  handleClickTab = (e, tab) => {
    e.preventDefault();
    this.setState({ tab: tab });
  };

  handleSave = e => {
    e.preventDefault();
    if (this.state.tab === 0) {
      this.setState({ tab: 1 });
      return;
    }
    this.props.onChange(this.props.moment.clone())
    if (this.props.onSave) this.props.onSave();
  };

  handleChange = _moment => {
    this.setState({ _moment: _moment.clone() });
  };

  render() {
    const { tab } = this.state;
    const {
      moment: m,
      className,
      prevMonthIcon,
      nextMonthIcon,
      dateIcon,
      timeIcon,
      minStep,
      hourStep,
      onSave,
      customText,
      onValidate,
      ...props
    } = this.props;
    const cls = cx('m-input-moment', className);
    const today = moment().date();

    const text = {
      date: 'Date',
      time: 'Time',
      next: 'Next',
      save: 'Save',
      hours: 'Hours:',
      minutes: 'Minutes:',
      ...customText
    }

    return (
      <div className={cls} {...props}>
        <div className="options">
          <button
            type="button"
            className={cx(dateIcon, { 'is-active': tab === 0 })}
            onClick={e => this.handleClickTab(e, 0)}
          >
            {text.date}
          </button>
          <button
            type="button"
            className={cx(timeIcon, { 'is-active': tab === 1 })}
            onClick={e => this.handleClickTab(e, 1)}
          >
            {text.time}
          </button>
        </div>

        <div className="tabs">
          <Calendar
            className={cx('tab', { 'is-active': tab === 0 })}
            _moment={this.state._moment}
            moment={this.props.moment}
            onChange={this.handleChange}
            prevMonthIcon={this.props.prevMonthIcon}
            nextMonthIcon={this.props.nextMonthIcon}
            today={today}
            onSetDate={this.props.onChange}
            onValidate={onValidate}
          />
          <Time
            className={cx('tab', { 'is-active': tab === 1 })}
            _moment={this.state._moment}
            moment={this.props.moment}
            minStep={this.props.minStep}
            hourStep={this.props.hourStep}
            onChange={this.props.onChange}
            text={text}
            onValidate={onValidate}
          />
        </div>

        {this.props.onSave ? (
          <button
            type="button"
            className="im-btn btn-save ion-checkmark"
            onClick={this.handleSave}
          >
            {!this.state.tab && text.next || text.save}
          </button>
        ) : null}
      </div>
    );
  }
}
