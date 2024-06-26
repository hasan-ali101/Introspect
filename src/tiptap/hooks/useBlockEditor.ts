import { Editor, useEditor } from "@tiptap/react";
import type { Doc as YDoc } from "yjs";

import { ExtensionKit } from "@/tiptap/extensions/extension-kit";
import { useSidebar } from "./useSidebar";
import { initialContent } from "@/tiptap/lib/data/initialContent";

declare global {
  interface Window {
    editor: Editor | null;
  }
}

export const useBlockEditor = ({ ydoc }: { ydoc: YDoc }) => {
  const leftSidebar = useSidebar();

  const editor = useEditor(
    {
      autofocus: true,
      onCreate: ({ editor }) => {
        if (editor.isEmpty) {
          editor.commands.setContent(initialContent);
        }
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
    },
    [ydoc],
  );

  const characterCount = editor?.storage.characterCount || {
    characters: () => 0,
    words: () => 0,
  };

  if (typeof window !== "undefined") {
    window.editor = editor;
  }

  return { editor, characterCount, leftSidebar };
};
