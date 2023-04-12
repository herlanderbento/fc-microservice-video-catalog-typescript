import { deepFreeze } from "../utils/object";

export default abstract class ValueObject<Value = any> {
  protected readonly _value: Value;

  constructor(value: Value) {
    this._value = deepFreeze(value);
  }

  public get value() {
    return this._value;
  }

  public toString = () => {
    if (typeof this.value !== "object" || this.value === null)
      try {
        return this.value.toString();
      } catch (error) {
        return this.value + "";
      }

    const valueStr: string = this.value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
