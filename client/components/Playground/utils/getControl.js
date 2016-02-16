/**
 * getControl
 *
 * @param  {object} propType The propType we want the control for
 * @return {component}       The rendered control for the propType
 */

import React from 'react';
import mapValues from 'lodash/mapValues';
import BooleanControl from '../BooleanControl';
import IntegerControl from '../IntegerControl';
import ArrayControl from '../ArrayControl';
import StringControl from '../StringControl';

const getControl = (propType) => {
  // In nested prop types, the name is at propType.name
  // normally it's at propType.type.name
  const name = propType.name || propType.type.name;
  const value = propType.value || propType.type && propType.type.value;
  let control;
  switch (name) {
    case 'bool':
      control = <BooleanControl />;
      break;
    case 'number':
      control = <IntegerControl />;
      break;
    case 'string':
      control = <StringControl />;
      break;
    case 'shape':
      mapValues(value, (innerProp) => {
        innerProp.control = getControl(innerProp);
      });
      break;
    case 'arrayOf':
      control = <ArrayControl innerProps={ propType } />;
      break;
    default:
      break;
  }
  return control;
};

export default getControl;
