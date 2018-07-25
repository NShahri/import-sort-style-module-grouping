// @flow

import {isValidDate} from './helpers/dateHelper';
import type {Node} from 'react';
import css from './main.module.css';
import {ReactComponent as ReactSVG} from './resources/react.svg';
import React, { Component } from "react";

type Props = {|
  date: Date
|};

class SampleClass extends Component<Props> {
  render() {
    const {date} = this.props;
    return (
      <div className={css.appContainer} data-date={isValidDate(date) ? date : 'not vaklid'}>
        <ReactSVG />
      </div>
    );
  }
}

export default SampleClass;


