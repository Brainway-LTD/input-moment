import cx from 'classnames';
import React, { Component } from 'react';
import InputSlider from 'react-input-slider';

export default class extends Component {
  state = {
    m: this.props.moment.clone()
  }
  changeHours = pos => {
    const m = this.props.moment;
    const _m = this.props._moment;
    m.hours(pos.x);
    _m.hours(pos.x);
    this.props.onChange(m.clone());
  };

  changeMinutes = pos => {
    const m = this.props.moment;
    const _m = this.props._moment;
    m.minutes(pos.x);
    _m.minutes(pos.x);
    this.props.onChange(m.clone());
  };

  render() {
    const m = this.props.moment;
    const { hours, minutes } = this.props.text
    return (
      <div className={cx('m-time', this.props.className)}>
        <div className="showtime">
          <span className="time">{m.format('HH')}</span>
          <span className="separater">:</span>
          <span className="time">{m.format('mm')}</span>
        </div>

        <div className="sliders">
          <div className="time-text">{hours}</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={23}
            xstep={this.props.hourStep}
            x={m.hour()}
            onChange={this.changeHours}
          />
          <div className="time-text">{minutes}</div>
          <InputSlider
            className="u-slider-time"
            xmin={0}
            xmax={59}
            xstep={this.props.minStep}
            x={m.minute()}
            onChange={this.changeMinutes}
          />
        </div>
      </div>
    );
  }
}
