import PropTypes from "prop-types";

const FileList = ({ children }) => {
  return (
    <div className="flex flex-col h-full w-5/12">
      <div className="w-full h-full p-4 overflow-y-auto flex flex-col gap-y-1 border border-dashed border-slate-400 dark:border-border dark:border-solid dark:rounded-[.5rem] dark:shadow-md">
        {children}
      </div>
    </div>
  );
};

FileList.propTypes = {
  children: PropTypes.node.isRequired,
};

export default FileList;
