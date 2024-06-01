import PropTypes from "prop-types";

const NoFileNote = ({ text }) => {
  return (
    <p className="mx-auto my-auto text-slate-400 text-sm font-light tracking-wider">
      {text}
    </p>
  );
};

NoFileNote.propTypes = {
  text: PropTypes.string,
};

export default NoFileNote;
