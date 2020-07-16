'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _momentRange = require('moment-range');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _chunk = require('lodash/chunk');

var _chunk2 = _interopRequireDefault(_chunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var moment = (0, _momentRange.extendMoment)(_moment2.default);

var Day = function Day(_ref) {
  var d = _ref.d,
      className = _ref.className,
      isDisabled = _ref.isDisabled,
      day = _ref.day,
      props = _objectWithoutProperties(_ref, ['d', 'className', 'isDisabled', 'day']);

  var Day = moment(day);
  var cls = (0, _classnames2.default)({
    // 'prev-month': Day.isBefore(moment().date(1)),
    // 'next-month': Day.isAfter(moment().endOf('month').date()),
    'current-day': Day.format('YY-MM-DD') === moment(d).format('YY-MM-DD'),
    'disabled': isDisabled
  });

  return _react2.default.createElement(
    'td',
    _extends({ className: cls }, props),
    Day.date()
  );
};

var Calendar = function (_Component) {
  _inherits(Calendar, _Component);

  function Calendar() {
    var _ref2;

    var _temp, _this, _ret;

    _classCallCheck(this, Calendar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = Calendar.__proto__ || Object.getPrototypeOf(Calendar)).call.apply(_ref2, [this].concat(args))), _this), _this.selectDate = function (day) {
      var m = _this.props._moment;
      m.set(moment(day).toObject());
      _this.props.onChange(m);
      _this.props.onSetDate(m.clone());
    }, _this.prevMonth = function (e) {
      e.preventDefault();
      _this.props.onChange(_this.props._moment.subtract(1, 'month'));
    }, _this.nextMonth = function (e) {
      e.preventDefault();
      _this.props.onChange(_this.props._moment.add(1, 'month'));
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Calendar, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          prevMonthIcon = _props.prevMonthIcon,
          nextMonthIcon = _props.nextMonthIcon,
          onValidate = _props.onValidate;


      var m = this.props._moment;
      var d = this.props.moment.toISOString();
      var d1 = m.clone().subtract(1, 'month').endOf('month').date();
      var d2 = m.clone().date(1).day();

      var start = m.clone().subtract(1, 'month').date(d1 - d2 + 1);
      var end = start.clone().add(41, 'day');
      var range = moment.range(start, end);
      var days = Array.from(range.by('days')).map(function (day) {
        return day.toISOString();
      });

      var weeks = moment.weekdaysShort();

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('m-calendar', className) },
        _react2.default.createElement(
          'div',
          { className: 'toolbar' },
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'prev-month', onClick: this.prevMonth },
            _react2.default.createElement('i', { className: prevMonthIcon })
          ),
          _react2.default.createElement(
            'span',
            { className: 'current-date' },
            m.format('MMMM YYYY')
          ),
          _react2.default.createElement(
            'button',
            { type: 'button', className: 'next-month', onClick: this.nextMonth },
            _react2.default.createElement('i', { className: nextMonthIcon })
          )
        ),
        _react2.default.createElement(
          'table',
          null,
          _react2.default.createElement(
            'thead',
            null,
            _react2.default.createElement(
              'tr',
              null,
              weeks.map(function (w, i) {
                return _react2.default.createElement(
                  'td',
                  { key: i },
                  w
                );
              })
            )
          ),
          _react2.default.createElement(
            'tbody',
            null,
            (0, _chunk2.default)(days, 7).map(function (row, w) {
              return _react2.default.createElement(
                'tr',
                { key: w },
                row.map(function (day) {
                  var isDisabled = typeof onValidate === 'function' ? !onValidate(moment(day)) : false;
                  return _react2.default.createElement(Day, {
                    key: day,
                    d: d,
                    day: day,
                    isDisabled: isDisabled,
                    onClick: function onClick() {
                      return isDisabled ? null : _this2.selectDate(day);
                    }
                  });
                })
              );
            })
          )
        )
      );
    }
  }]);

  return Calendar;
}(_react.Component);

exports.default = Calendar;