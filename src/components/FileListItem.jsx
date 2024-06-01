import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Paperclip, Trash2 } from "lucide-react";
import PropTypes from "prop-types";

const FileListItem = ({ file, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: file.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="file-item w-full h-8 flex items-center text-sm font-light ">
      <div
        className="w-11/12 h-full px-4 py-2 flex flex-row justify-start items-center gap-x-3 text-primary rounded-lg border border-slate-300 shadow-sm cursor-move"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <Paperclip size={20} />
        {file.file?.name}
      </div>
      <Trash2
        size={14}
        className="mx-auto text-destructive/60 cursor-pointer hover:text-destructive"
        onClick={onDelete}
      />
    </div>
  );
};

FileListItem.propTypes = {
  file: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export default FileListItem;
