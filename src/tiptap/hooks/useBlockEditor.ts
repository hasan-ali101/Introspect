import { Editor, useEditor } from "@tiptap/react";

import { ExtensionKit } from "@/tiptap/extensions/extension-kit";
import { initialContent } from "@/tiptap/lib/data/initialContent";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = () => {
  const editor = useEditor({
    autofocus: true,
    content: window.localStorage.getItem("editor-content"),
    onUpdate: ({ editor }) => {
      window.localStorage.setItem("editor-content", editor.getHTML());
    },
    extensions: [...ExtensionKit({})],
    editorProps: {
      attributes: {
        autocomplete: "off",
        autocorrect: "off",
        autocapitalize: "off",
        class: "min-h-full",
      },
    },
  });

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  return { editor, characterCount };
};
