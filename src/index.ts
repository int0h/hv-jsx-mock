import {Target, Children, targetRenderChildren} from 'hv-jsx';
import {Node} from './base';
export {Node, Elem, Base, Placeholder, Props, TextNode} from './base';

import {
    append,
    closest,
    create,
    createPlaceholder,
    createTextNode,
    getData,
    replace,
    setData,
    setProp,
    replaceSequence
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
    setProp,
    replaceSequence
};

export function renderDom(content: Children, params = {}): Node[] {
    const meta = {target: mock, targetMeta: {}} as any;
    return targetRenderChildren(meta, content) as any as Node[];
}
