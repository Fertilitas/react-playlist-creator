import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import PropTypes from "prop-types";

const DraggableUploadListItem = ({ originNode, file }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: file.uid,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    cursor: "move",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? "is-dragging" : ""}
      {...attributes}
      {...listeners}
    >
      {file.status === "error" && isDragging
        ? originNode.props.children
        : originNode}
    </div>
  );
};

DraggableUploadListItem.propTypes = {
  originNode: PropTypes.node.isRequired,
  file: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    originFileObj: PropTypes.object,
  }).isRequired,
};

export default DraggableUploadListItem;
