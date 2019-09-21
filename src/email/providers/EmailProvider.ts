import Email from '../email';
import { EmailProviderConfig } from '../../common/config';
import validator from 'validator';

export abstract class EmailProvider {
  protected readonly config: EmailProviderConfig;

  constructor(conf: EmailProviderConfig) {
    this.config = conf;
  }

  public isValidConfig(): boolean {
    return !validator.isEmpty(this.config.token);
  }

  public getId(): string {
    return this.config.id;
  }

  public abstract async send(email: Email): Promise<any>;
}
