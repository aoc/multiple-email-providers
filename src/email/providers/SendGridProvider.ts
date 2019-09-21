import { EmailProvider } from './EmailProvider';
import Email from '../email';
import { GotJSONOptions, HTTPError } from 'got';
import httpClient from '../../common/http-client';
import EmailDeliverError from '../../common/errors/EmailDeliveryError';
import { Error, ErrorCode } from '../../error-handler';
import { response } from 'express';

export default class SendGridProvider extends EmailProvider {
  public static readonly url: string = 'https://api.sendgrid.com/v3/mail/send';

  public async send(email: Email): Promise<any> {
    try {
      const options: GotJSONOptions = {
        headers: {
          Authorization: `Bearer ${this.config.token}`
        },
        body: {
          personalizations: [
            {
              to: [
                {
                  email: email.to,
                  name: email.toName
                }
              ]
            }
          ],
          from: {
            email: email.from,
            name: email.fromName
          },
          subject: email.subject,
          content: [
            {
              type: 'text/html',
              value: email.body
            },
            {
              type: 'text/plain',
              value: email.bodyText
            }
          ]
        },
        json: true
      };

      const reponse = await httpClient.post(SendGridProvider.url, options);
      return response;
    } catch (e) {
      let errors = null;
      if (e instanceof HTTPError) {
        const responseBody = e.body as any;
        errors = responseBody.errors;
      }

      throw new EmailDeliverError(errors, e);
    }
  }
}
