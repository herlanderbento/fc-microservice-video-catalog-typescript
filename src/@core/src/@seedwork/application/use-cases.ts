export interface UseCase<Input, Output> {
  execute(inout: Input): Output | Promise<Output>;
}

export default UseCase;
