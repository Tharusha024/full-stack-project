import React from 'react';
import PropTypes from 'prop-types'; 

function Buttons_1({ name, bgColor, icon, customClasses, onClick }) {
  return (
    <button
      className={`text-white p-0 w-52 h-14 flex items-center gap-4 justify-center text-lg font-menu ${bgColor} ${customClasses}`}
      onClick={onClick} 
      aria-label={name} 
    >
      {icon}
      {name}
    </button>
  );
}

// Default props
Buttons_1.defaultProps = {
  name: 'Button',
  bgColor: 'bg-blue-500', 
  icon: null,
  customClasses: '',
  onClick: () => {},
};

// Prop validation
Buttons_1.propTypes = {
  name: PropTypes.string.isRequired,
  bgColor: PropTypes.string,
  icon: PropTypes.element,
  customClasses: PropTypes.string,
  onClick: PropTypes.func,
};

export default Buttons_1;
