import { IAffiliate } from './affiliate';
import { IBrand } from './brand';
import { IRequestStatus } from './request-status';
import { IUser } from './user';
import { ICountry } from './country';
import { IMedia } from './media';

export interface IRequest{
  "requestId": number,
  "advice": boolean,
  "campaignName": string,
  "campaignDescription": string,
  "decisionDeadline": string,
  "decisionDescription": string,
  "key": string,
  "numberOfAssets": number,
  "createdDate": string,
  "updatedDate": string,
  "submittedDate": string,
  "validatedDate": string,
  "affiliate": IAffiliate,
  "brand": IBrand,
  "requestStatus": IRequestStatus,
  "createdBy": IUser,
  "updatedBy": IUser,
  "submittedBy": IUser,
  "validatedBy": IUser,
  "countries": ICountry[],
  "media": IMedia[]
}
