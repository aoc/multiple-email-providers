import { registerSchema, ValidationSchema, validate } from 'class-validator';
import ModelValidationError from '../common/errors/ModelValidationError';

interface Email {
  to: string;
  toName: string;
  from: string;
  fromName: string;
  subject: string;
  body: string;
  bodyText?: string;
}

const EmailSchema: ValidationSchema = {
  name: 'emailSchema',
  properties: {
    to: [
      {
        type: 'isEmail',
        constraints: []
      }
    ],
    toName: [
      {
        type: 'isNotEmpty'
      }
    ],
    from: [
      {
        type: 'isEmail',
        constraints: []
      }
    ],
    fromName: [
      {
        type: 'isNotEmpty'
      }
    ],
    subject: [
      {
        type: 'isNotEmpty'
      }
    ],
    body: [
      {
        type: 'isNotEmpty'
      }
    ]
  }
};
registerSchema(EmailSchema);

export const fromRequest = async (body: any): Promise<Email> => {
  const newEmail: Email = {
    to: body.to,
    toName: body.to_name,
    from: body.from,
    fromName: body.from_name,
    subject: body.subject,
    body: body.body
  };

  const errors = await validate('emailSchema', newEmail);

  if (errors.length > 0) {
    throw new ModelValidationError(errors);
  }

  return newEmail;
};

export default Email;
