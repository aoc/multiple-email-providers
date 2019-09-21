import PostmarkProvider from './PostmarkProvider';
import SendGridProvider from './SendGridProvider';
import { EmailProviderConfig } from '../../common/config';
import { EmailProvider } from './EmailProvider';
import ConfigError from '../../common/errors/ConfigError';

interface Providers {
  [x: string]: typeof EmailProvider | typeof PostmarkProvider;
}

const providers: Providers = {
  sendgrid: SendGridProvider,
  postmark: PostmarkProvider
};

const get = (config: EmailProviderConfig): EmailProvider => {
  const providerClass = providers[config.id];

  if (!providerClass) {
    throw new ConfigError(`Invalid Provider: ${config.id}`);
  }

  return new providerClass(config);
};

export default get;
