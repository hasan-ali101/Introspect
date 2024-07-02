import { EditorContent, PureEditorContent } from "@tiptap/react";
import React, { useRef } from "react";

import { LinkMenu } from "@/tiptap/components/menus";

import { useBlockEditor } from "@/tiptap/hooks/useBlockEditor";

// import "@/styles/tiptap.css";

import ImageBlockMenu from "@/tiptap/extensions/ImageBlock/components/ImageBlockMenu";
import { ColumnsMenu } from "@/tiptap/extensions/MultiColumn/menus";
import { TableColumnMenu, TableRowMenu } from "@/tiptap/extensions/Table/menus";
import { TiptapProps } from "./types";
import { TextMenu } from "../menus/TextMenu";
import { ContentItemMenu } from "../menus/ContentItemMenu";
import { Entry } from "@/types/entry";

type BlockEditorProps = TiptapProps & { selectedEntry?: Entry };

export const BlockEditor = ({ ydoc, selectedEntry }: BlockEditorProps) => {
  const { editor } = useBlockEditor(selectedEntry);

  const menuContainerRef = useRef(null);
  if (typeof window === "undefined") {
    return null;
  }

  if (!editor) {
    return null;
  }

  return (
    <>
      <div className="flex h-full " ref={menuContainerRef}>
        <div className="relative flex h-full flex-1 flex-col overflow-hidden">
          <EditorContent editor={editor} className="flex-1 overflow-y-auto" />
          <ContentItemMenu editor={editor} />
          <LinkMenu editor={editor} appendTo={menuContainerRef} />
          <TextMenu editor={editor} />
          <ColumnsMenu editor={editor} appendTo={menuContainerRef} />
          <TableRowMenu editor={editor} appendTo={menuContainerRef} />
          <TableColumnMenu editor={editor} appendTo={menuContainerRef} />
          <ImageBlockMenu editor={editor} appendTo={menuContainerRef} />
        </div>
      </div>
    </>
  );
};

export default BlockEditor;
