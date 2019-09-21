import swaggerJSDoc, { Options } from 'swagger-jsdoc';

const options: Options = {
  swaggerDefinition: {
    info: {
      title: 'Multiple Email Providers',
      version: '1.0.0'
    },
    openapi: '3.0.2',
    basePath: '/'
  },
  apis: ['./src/email/routes.yaml']
};

const buildOpenapiDoc = () => {
  return swaggerJSDoc(options);
};

export default buildOpenapiDoc;
