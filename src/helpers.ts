import {Elem, Placeholder, Node, TextNode} from './base';

export interface Meta {}

export interface Data {
    [key: string]: any;
}

export function append(meta: Meta, parentMeta: Meta, parent: Node, elm: Node) {
    if (!(parent instanceof Elem)) {
        return;
    }
    parent.appendChild(elm);
}

export function closest(meta: Meta, from: Node, matcher: (elem: Node) => boolean): Node {
    let elem = from;

    while (elem) {
        if (matcher(elem)) {
            return elem;
        }
        elem = elem.parent;
    }

    return null;
}

export function create(meta: Meta, type: string): [Node, Meta, Meta] {
    return [new Elem(type), {}, {}];
}

export function createPlaceholder(meta: Meta): Node {
   return new Placeholder;
}

export function createTextNode(meta: Meta, text: string): Node {
    return new TextNode(text);
}

export function getData(meta: Meta, elem: Node): Data {
    if (!elem) {
        return {};
    }

    return elem.data;
}

export function replace(meta: Meta, oldElem: Node, newElm: Node): any {
    if (!oldElem) {
        return;
    }

    if (!newElm) {
        newElm = new Placeholder();
    }

    const parent = oldElem.parent;

    if (!parent) {
        throw new Error('cannot replace dom');
    }

    parent.replaceChild(oldElem as Elem, newElm as Elem);
}

export function replaceSequence(meta: Meta, oldElems: Node[], newElems: Node[]): any {
    const oldStart = oldElems[0];

    if (!oldStart || newElems.length <= 0) {
        throw new Error('empty nodeset');
    }

    const parent = oldStart.parent;

    if (!parent) {
        throw new Error('cannot replace dom');
    }

    parent.replaceChildren(oldElems, newElems);
}

export function setData(meta: Meta, elem: Node, value: Data) {
    if (!elem) {
        throw new Error('provided parameter is not valid Node');
    }
    elem.data = value;
}

export function setProp(meta: Meta, elem: Node, name: string, value: any) {
    (elem as Elem).props[name] = value;
}
