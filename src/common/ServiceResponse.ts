export enum ServiceResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

export default interface ServiceResponse {
  status?: ServiceResponseStatus;
  errors?: any;
}
