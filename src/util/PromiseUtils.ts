// TODO: Find a better name
export default class PromiseUtils {
  static sleep(duration: number): Promise<void> {
    return new Promise(r => setTimeout(r, duration));
  }
}
