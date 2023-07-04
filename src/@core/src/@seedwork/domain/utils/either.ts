//O either será um array personalizado do JavaScript
//O 1º elemento é o valor
//O 2º elemento é o erro
const EitherConstructor: new <Ok, Error>(...p: [Ok, Error]) => [Ok, Error] =
  Array as any;

export class Either<Ok, Error = any> extends EitherConstructor<Ok, Error> {
  constructor(...p: [Ok, Error]) {
    super(...p);
  }

  public static ok<T>(value: T): Either<T, null> {
    return new Either(value, null);
  }

  public static fail<T>(error: T): Either<null, T> {
    return new Either(null, error);
  }

  public getOk() {
    return this[0];
  }

  public getFail() {
    return this[1];
  }

  public isOk() {
    return this[1] === null;
  }

  public isFail() {
    return this[1] !== null;
  }
}
