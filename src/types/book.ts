export interface IBook {
  userId: string;
  id: string;
  title: string;
  color: string;
  label: boolean;
  notebook: boolean;
  coverImage?: string;
  uploadedImage?: string;
}
