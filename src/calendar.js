import Moment from 'moment';
import { extendMoment } from 'moment-range';
import React, { Component } from 'react';
import cx from 'classnames';
import chunk from 'lodash/chunk';

const moment = extendMoment(Moment);

const Day = ({ d, className, isDisabled, day, ...props }) => {
  const Day = moment(day)
  const cls = cx({
    // 'prev-month': Day.isBefore(moment().date(1)),
    // 'next-month': Day.isAfter(moment().endOf('month').date()),
    'current-day': Day.format('YY-MM-DD') === moment(d).format('YY-MM-DD'),
    'disabled': isDisabled
  });

  return <td className={cls} {...props}>{Day.date()}</td>;
};

export default class Calendar extends Component {
  selectDate = (day) => {
    const m = this.props._moment;
    m.set(moment(day).toObject())
    this.props.onChange(m);
    this.props.onSetDate(m.clone());
  };

  prevMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props._moment.subtract(1, 'month'));
  };

  nextMonth = e => {
    e.preventDefault();
    this.props.onChange(this.props._moment.add(1, 'month'));
  };

  render() {
    const {
      className,
      prevMonthIcon,
      nextMonthIcon,
      onValidate,
    } = this.props;

    const m = this.props._moment;
    const d = this.props.moment.toISOString();
    const d1 = m.clone().subtract(1, 'month').endOf('month').date();
    const d2 = m.clone().date(1).day();

    const start = m.clone().subtract(1, 'month').date(d1 - d2 + 1)
    const end = start.clone().add(41, 'day')
    const range = moment.range(start, end)
    const days = Array.from(range.by('days')).map(day => {
      return day.toISOString()
    })
    const weeks = Array.from(moment.range(m.clone().weekday(0), m.clone().weekday(6)).by('days')).map(day => day.format('ddd'))

    return (
      <div className={cx('m-calendar', className)}>
        <div className="toolbar">
          <button type="button" className="prev-month" onClick={this.prevMonth}>
            <i className={prevMonthIcon} />
          </button>
          <span className="current-date">{m.format('MMMM YYYY')}</span>
          <button type="button" className="next-month" onClick={this.nextMonth}>
            <i className={nextMonthIcon} />
          </button>
        </div>

        <table>
          <thead>
            <tr>
              {weeks.map((w, i) => <td key={i}>{w}</td>)}
            </tr>
          </thead>

          <tbody>
            {chunk(days, 7).map((row, w) =>
              <tr key={w}>
                {row.map(day => {
                  const isDisabled = typeof onValidate === 'function' ? !onValidate(moment(day)) : false
                  return <Day
                    key={day}
                    d={d}
                    day={day}
                    isDisabled={isDisabled}
                    onClick={() => isDisabled ? null : this.selectDate(day)}
                  />
                }
                )}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}
