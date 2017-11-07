export type Node = Elem | Placeholder | TextNode | null;
export interface Props {
    [key: string]: any;
}

export class Base {
    parent: Elem | null = null;
    data: any;

    remove() {
        if (!this.parent) {
            throw new Error('not mounted');
        }
        const id = this.parent.children.indexOf(this);
        this.parent.children.splice(id, 1);
    }
}

export class Elem extends Base {
    parent: Elem | null = null;
    type: string;
    children: Node[] = [];
    props: Props = {};

    constructor (type: string) {
        super();
        this.type = type;
    }

    appendChild(child: Node) {
        if (!child) {
            return;
        }

        child.parent = this;
        this.children.push(child);
    }

    replaceChild(oldElem: Node, newElem: Node) {
        const id = this.children.indexOf(oldElem);
        this.children[id] = newElem;
        (newElem as Elem).parent = this;
    }

    replaceChildren(olds: Node[], news: Node[]) {
        const id = this.children.indexOf(olds[0]);
        news.forEach(elem => elem && (elem.parent = this));
        this.children.splice(id, olds.length, ...news);
    }

}

export class Placeholder extends Base {
    parent: Elem | null;
}

export class TextNode extends Base {
    parent: Elem | null;
    text: string;

    constructor(text: string) {
        super();
        this.text = text;
    }
}
