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
        className="w-11/12 h-full px-4 py-2 flex flex-row justify-start items-center gap-x-3 text-primary rounded-lg border border-slate-300 shadow-sm cursor-move dark:text-gray-400 dark:border-border"
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <Paperclip size={20} />
        {file.file?.name}
      </div>
      <div className="p-1.5 mx-auto text-destructive/60 cursor-pointer rounded-[50%] border border-destructive/60 hover:text-destructive hover:border-destructive dark:text-rose-600/60 dark:border-rose-600/60 dark:hover:text-rose-600 dark:hover:border-rose-600">
        <Trash2 size={14} onClick={onDelete} />
      </div>
    </div>
  );
};

FileListItem.propTypes = {
  file: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
};

export default FileListItem;
