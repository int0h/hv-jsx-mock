import {Target} from 'hv-jsx';
import {Node} from './base';

import {
    append,
    closest,
    create,
    createPlaceholder,
    createTextNode,
    getData,
    replace,
    setData,
    setProp
} from './helpers';


export const mock: Target<Node, any, number, any> = {
    append,
    closest,
    create,
    createPlaceholder,
    createTextNode,
    getData,
    replace,
    setData,
    setProp
};
