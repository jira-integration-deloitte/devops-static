export class KeyValue {
    constructor(private key?: String, private value?: any) {}

    get Key() {
        return this.key;
    }
    set Key(key: String) {
        this.key = key;
    }
    get Value() {
        return this.value;
    }
    set Value(value: any) {
        this.value = value;
    }
}