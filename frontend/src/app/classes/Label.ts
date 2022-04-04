export default class Label {
  private _placeholder: string;
  private _name: string;
  private _icon: string;
  private _description: string;
  private _iconDescription: string;
  private _type: string;
  private _propertyModel: any;

  constructor(
    placeholder: string,
    name: string,
    icon: string,
    description: string,
    iconDescription: string,
    type: string,
    propertyModel: any
  ) {
    this._placeholder = placeholder;
    this._name = name;
    this._icon = icon;
    this._description = description;
    this._iconDescription = iconDescription;
    this._type = type;
    this._propertyModel = propertyModel;
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

  get iconDescription(): string {
    return this._iconDescription;
  }

  get type(): string {
    return this._type;
  }

  get propertyModel(): string {
    return this._propertyModel;
  }
}
