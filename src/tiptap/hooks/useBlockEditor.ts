import { Editor, useEditor } from "@tiptap/react";
import { ExtensionKit } from "@/tiptap/extensions/extension-kit";
import { Entry } from "@/types/entry";
import { useEffect } from "react";

import { debouncedUpdateEntry } from "@/utils/queries/updateEntry";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = (selectedEntry?: Entry) => {
  const editor = useEditor({
    autofocus: true,
    content: selectedEntry?.content,
    onUpdate: ({ editor }) => {
      debouncedUpdateEntry(selectedEntry?.id as string, editor.getHTML());
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

  useEffect(() => {
    if (selectedEntry) {
      editor?.commands.setContent(selectedEntry.content);
    }
  }, [selectedEntry]);

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  return { editor, characterCount };
};
