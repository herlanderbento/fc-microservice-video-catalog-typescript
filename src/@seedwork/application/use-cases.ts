export default interface UseCase<Input, Output> {
  execute(inout: Input): Output | Promise<Output>;
}
