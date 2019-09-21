import config from '../common/config';
import getProvider from './providers';
import { EmailProvider } from './providers/EmailProvider';
import log from '../common/logger';
import Email from './email';
import ServiceResponse, {
  ServiceResponseStatus
} from '../common/ServiceResponse';
import EmailDeliverError from '../common/errors/EmailDeliveryError';
import { ErrorCode } from '../error-handler';

const registeredEmailProviders: EmailProvider[] = [];
const TAG = 'Email Service -';

export const registerEmailProviders = () => {
  config.emailProviders.forEach(emailProviderConfig => {
    const emailProvider = getProvider(emailProviderConfig);

    if (emailProvider.isValidConfig()) {
      log.info(`${TAG} provider registered: ${emailProviderConfig.id}`);
      registeredEmailProviders.push(emailProvider);
    } else {
      log.error(`${TAG} - provider invalid config: ${emailProviderConfig.id}`);
    }
  });

  if (registeredEmailProviders.length === 0) {
    throw new Error('Please configure at least one Email Provider');
  }
};

export const htmlToText = (html: string): string =>
  html
    .replace(/<style([\s\S]*?)<\/style>/gi, '')
    .replace(/<script([\s\S]*?)<\/script>/gi, '')
    .replace(/<\/div>/gi, '\n')
    .replace(/<\/li>/gi, '\n')
    .replace(/<li>/gi, '  *  ')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<br\s*[\/]?>/gi, '\n')
    .replace(/<[^>]+>/gi, '');

export const sendEmail = async (email: Email): Promise<ServiceResponse> => {
  let response: ServiceResponse = {};

  // Try all the providers until one succeed
  for (const provider of registeredEmailProviders) {
    try {
      email.bodyText = htmlToText(email.body);
      await provider.send(email);
      log.info(`${TAG} Sent email using: ${provider.getId()}`);
      response = {
        status: ServiceResponseStatus.SUCCESS
      };

      return response;
    } catch (e) {
      const emailDeliverError: EmailDeliverError = e;

      log.error(
        `${TAG} Error sending email using: ${provider.getId()}`,
        emailDeliverError.errors,
        emailDeliverError.originalError
      );

      if (response.status !== ServiceResponseStatus.ERROR) {
        response = {
          status: ServiceResponseStatus.ERROR,
          errors: []
        };
      }

      response.errors.push({
        code: ErrorCode.EMAIL_PROVIDER_ERROR,
        source: provider.getId(),
        detail: emailDeliverError.errors
      });
    }
  }
  log.error(`${TAG} Could't send email`);
  return response;
};
