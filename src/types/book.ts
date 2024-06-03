export interface IBook {
  userId: number;
  id: number;
  title: string;
  color: string;
  label: boolean;
  notebook: boolean;
  coverImage?: string;
  uploadedImage?: string;
}
