import { EmailProvider } from './EmailProvider';
import Email from '../email';
import { GotJSONOptions, HTTPError } from 'got';
import httpClient from '../../common/http-client';
import EmailDeliverError from '../../common/errors/EmailDeliveryError';
import { Error, ErrorCode } from '../../error-handler';

export default class PostmarkProvider extends EmailProvider {
  public static readonly url: string = 'https://api.postmarkapp.com/email';

  public async send(email: Email): Promise<any> {
    try {
      const options: GotJSONOptions = {
        headers: {
          'X-Postmark-Server-Token': this.config.token
        },
        body: {
          From: email.from,
          To: email.to,
          Subject: email.subject,
          HtmlBody: email.body,
          TextBody: email.bodyText,
          ReplyTo: email.from
        },
        json: true
      };

      const response = await httpClient.post(PostmarkProvider.url, options);
      return response;
    } catch (e) {
      let errors = null;
      if (e instanceof HTTPError) {
        errors = e.body;
      }

      throw new EmailDeliverError(errors, e);
    }
  }
}
