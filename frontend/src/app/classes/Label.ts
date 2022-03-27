export default class Label {
  private _placeholder: string;
  private _name: string;
  private _icon: string;
  private _description: string;

  constructor(
    placeholder: string,
    name: string,
    icon: string,
    description: string
  ) {
    this._placeholder = placeholder;
    this._name = name;
    this._icon = icon;
    this._description = description;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  get name(): string {
    return this._name;
  }

  get icon(): string {
    return this._icon;
  }

  get description(): string {
    return this._description;
  }
}
