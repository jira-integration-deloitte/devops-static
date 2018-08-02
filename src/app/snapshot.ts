import {KeyValue} from './key-value';

export class Snapshot {
    constructor(private title: String) {
        this.data = new Array<KeyValue>();
    }
    readonly data: Array<KeyValue>;

    get Data() {
        return this.data;
    }

    get Title() {
        return this.title;
    }
}
