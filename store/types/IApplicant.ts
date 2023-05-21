export interface IApplicantDetails {
  application_id?: string;
  type?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  categories?: any;
  vehicle_info?: any;
  branding?: any;
}

export default interface IApplicant {
  applicant: IApplicantDetails | null;
  fetchApplicant: () => void;
}
