import React from "react";
import PropTypes from "prop-types";

const Button = ({ type = "button", buttonText, onClick, loading,disabled }) => {
  return (
    <div className="mt-6">
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className="relative flex justify-center w-full px-4 py-2
        text-sm font-medium leading-5 text-white transition duration-150
         ease-in-out bg-gray-900 border border-transparent rounded-md
         group hover:bg-opacity-90 focus:outline-none"
      >
        {loading ? "Loading..." : buttonText}
      </button>
    </div>
  );
};

Button.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};
export default Button;