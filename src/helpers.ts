import {Elem, Props, Placeholder, Node, TextNode} from './base';

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

export function create(meta: Meta, type: string): [Node, Meta] {
    return [new Elem(type), {}];
}

export function createPlaceholder(meta: Meta): Node {
   return new Placeholder;
}

export function createTextNode(meta: Meta, text: string): Node {
    return new TextNode(text);
}

export function getData(meta: Meta, elem: Node): Data {
    return elem.data;
}

export function replace(meta: Meta, oldElem: Node, newElm: Node): any {
    if (!oldElem) {
        return;
    }

    if (!newElm) {
        oldElem.remove();
    }

    const parent = oldElem.parent;

    if (!parent) {
        throw new Error('cannot replace dom');
    }

    parent.replaceChild(newElm as Elem, oldElem as Elem);
}

export function setData(meta: Meta, elem: Node, value: Data) {
    elem.data = value;
}

export function setProp(meta: Meta, elem: Node, name: string, value: any) {
    (elem as Elem).props[name] = value;
}
