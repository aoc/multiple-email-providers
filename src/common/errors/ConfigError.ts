export default class ConfigError extends Error {
  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ConfigError.prototype);
  }
}
