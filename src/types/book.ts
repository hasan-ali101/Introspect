export interface IBook {
  id: string;
  title: string;
  color: string;
  label: boolean;
  text: string;
  notebook: boolean;
  coverImage?: string;
  uploadedImage?: string;
  imageFit?: "object-fill" | "object-cover";
}
