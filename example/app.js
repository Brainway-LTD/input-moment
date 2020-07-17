import '../src/less/input-moment.less';
import './app.less';
import moment from 'moment';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import InputMoment from '../src/input-moment';
import packageJson from '../package.json';

const interval = 5 * 60 * 1000

class App extends Component {
  state = {
    momentState: moment(Math.ceil(moment() / interval) * interval),
    customText: {
      date: 'Date',
      time: 'Time',
      next: 'Next',
      save: 'Save',
      hours: 'Hours:',
      minutes: 'Minutes:'
    }
  };

  handleChange = m => {
    this.setState({ momentState: m });
  };

  handleSave = () => {
    console.log('saved', this.state.momentState.format('llll'));
  };

  handleValidate = m => {
    return !m.isBefore(new Date())
  }
  render() {
    return (
      <div className="app">
        <h1>
          {packageJson.name}: {packageJson.version}
        </h1>
        <h2>{packageJson.description}</h2>
        <form>
          <div className="input">
            <input type="text" value={this.state.momentState.format('llll')} readOnly />
          </div>
          <InputMoment
            moment={this.state.momentState}
            onChange={this.handleChange}
            minStep={5}
            onSave={this.handleSave}
            customText={this.state.customText}
            onValidate={this.handleValidate}
            isRtl={false}
          />
        </form>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
