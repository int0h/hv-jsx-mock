export type Node = Elem | Placeholder | TextNode | null;
export interface Props {
    [key: string]: any;
}

class Base {
    parent: Elem = null;
    data: any;

    remove() {
        const id = this.parent.children.indexOf(this);
        this.parent.children.splice(id, 1);
    }
}

export class Elem extends Base {
    parent: Elem = null;
    type: string;
    children: Node[] = [];
    props: Props = {};

    constructor (type: string) {
        super();
        this.type = type;
    }

    appendChild(child: Node) {
        child.parent = this;
        this.children.push(child);
    }

    replaceChild(oldElem: Node, newElem: Node) {
        const id = this.children.indexOf(this);
        this.children[id] = newElem;
    }

}

export class Placeholder extends Base {
    parent: Elem;
}

export class TextNode extends Base {
    parent: Elem;
    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }
}
