import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
} from "../ui/context-menu";

const ProjectContextMenu = ({ isOpen, onClose }) => {
  return (
    <ContextMenu open={isOpen} onClose={onClose}>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default ProjectContextMenu;
