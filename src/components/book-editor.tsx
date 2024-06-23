import { CircleX } from "lucide-react";
import { CircleOff } from "lucide-react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { UploadButton } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { IBook } from "@/types/book";
import { useToast } from "@/components/ui/use-toast";

const defaultColors = [
  "bg-red-300",
  "bg-blue-300",
  "bg-purple-300",
  "bg-green-300",
  "bg-orange-300",
];

const defaultImages = [
  undefined,
  "/wave.jpeg",
  "/stars.jpeg",
  "/venus.jpeg",
  "/flowers.webp",
];

type bookEditorType = {
  book: IBook;
  isEditing: boolean;
  onClose: (book: IBook) => void;
  onNotebookSelect: (id: string, e: string) => void;
  onColorSelect: (id: string, color: string) => void;
  onLabelSelect: (id: string, e: string) => void;
  onImageSelect: (id: string, image: string | undefined) => void;
  onImageUploaded: (res: any, id: string) => void;
};

const BookEditor = ({
  book,
  isEditing,
  onClose,
  onColorSelect,
  onImageSelect,
  onLabelSelect,
  onNotebookSelect,
  onImageUploaded,
}: bookEditorType) => {
  const { toast } = useToast();

  return (
    <div
      id="editor"
      className={cn(
        isEditing ? "w-80 md:w-80" : "w-0 border-transparent",
        "relative h-full overflow-hidden rounded-xl border-2 bg-[#a5beea] shadow-lg transition-all duration-500 dark:bg-dark-tertiary md:h-full",
      )}
    >
      <CircleX
        size={28}
        className={cn(
          !isEditing ? "hidden" : "flex",
          "absolute right-2 top-2 cursor-pointer",
        )}
        onClick={() => {
          onClose(book);
        }}
      />
      {isEditing && (
        <div className="flex h-full min-h-64 w-full flex-col gap-8 px-8 pb-4 pt-10">
          <RadioGroup
            onValueChange={(e) => onNotebookSelect(book.id, e)}
            className="grid-flow-col"
            defaultValue={book.notebook ? "notebook" : "book"}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="book"
                id="book"
                className="border-white text-white"
              />
              <Label className="text-nowrap" htmlFor="option-one">
                Book
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="notebook"
                id="notebook"
                className="border-white text-white"
              />
              <Label className="text-nowrap" htmlFor="option-two">
                Notebook
              </Label>
            </div>
          </RadioGroup>
          <div
            className={cn(
              !isEditing && "hidden",
              "flex w-full justify-between",
            )}
          >
            {defaultColors.map((color) => (
              <div
                key={color}
                className={cn(
                  book.color === color && "bg-white",
                  "flex h-10 w-10 items-center justify-center rounded-full border",
                )}
              >
                <div
                  className={cn(
                    "h-8 w-8 cursor-pointer rounded-full hover:scale-105 ",
                    color,
                  )}
                  onClick={() => onColorSelect(book.id, color)}
                />
              </div>
            ))}
          </div>
          <RadioGroup
            onValueChange={(e) => onLabelSelect(book.id, e)}
            className="grid-flow-col"
            defaultValue={book.label ? "label" : "no label"}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="label"
                id="label"
                className="border-white text-white"
              />
              <Label className="text-nowrap" htmlFor="option-one">
                Label
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no label"
                id="no label"
                className="border-white text-white"
              />
              <Label className="text-nowrap" htmlFor="option-two">
                No Label
              </Label>
            </div>
          </RadioGroup>
          <div className="flex w-full justify-between">
            {defaultImages.map((image) => {
              if (image === undefined) {
                return (
                  <div
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-md border"
                    onClick={() => onImageSelect(book.id, image)}
                  >
                    <CircleOff className=" h-4 w-4" />
                  </div>
                );
              }
              return (
                <div
                  key={image}
                  className={cn(
                    book.coverImage === image && "bg-white",
                    "h-10 w-10 cursor-pointer rounded-md border p-[2px] hover:scale-105",
                  )}
                  onClick={() => onImageSelect(book.id, image)}
                >
                  <Image
                    className="h-full w-full rounded-md object-cover"
                    src={image}
                    width={100}
                    height={100}
                    alt={image}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm">Upload a cover image:</p>

            <div className="flex w-full items-start justify-between">
              <UploadButton
                className="ut-button:shadown-md ut-button:border ut-button:bg-transparent ut-button:p-4 ut-button:text-sm ut-button:text-white hover:ut-button:bg-white/10 ut-allowed-content:text-[8px] ut-allowed-content:text-gray-300 ut-button:dark:border dark:ut-button:border-white ut-button:dark:bg-transparent ut-button:dark:text-white ut-button:hover:dark:bg-dark-secondary dark:ut-allowed-content:text-gray-300"
                endpoint="imageUploader"
                onClientUploadComplete={(res) => onImageUploaded(res, book.id)}
                onUploadError={(error: Error) => {
                  // Do something with the error.
                  toast({
                    description: "Image Upload Error",
                  });
                }}
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <div
                  className={cn(
                    book.coverImage === book.uploadedImage &&
                      book.uploadedImage &&
                      "bg-slate-300 hover:scale-105",
                    "h-10 w-10 cursor-pointer rounded-md border-2 p-[1px]",
                  )}
                  onClick={() => {
                    book.uploadedImage &&
                      onImageSelect(book.id, book.uploadedImage);
                  }}
                >
                  {book.uploadedImage && (
                    <img
                      src={book.uploadedImage}
                      className="h-full w-full rounded-md"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookEditor;
