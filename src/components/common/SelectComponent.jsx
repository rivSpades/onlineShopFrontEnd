// SelectComponent.js
import useCustomSelect from '@/src/hooks/useCustomSelect';
import React, { useEffect, useRef } from 'react';

const SelectComponent = ({
  options,
  placeholder,
  open,
  customClass,
  onSelect,
  selectedOption,
}) => {
  const {
    isOpen,

    openDropdown,
    closeDropdown,
    toggleDropdown,
    selectOption,
  } = useCustomSelect(options, open);

  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelectOption = (option) => {
    selectOption(option);
    openDropdown();
    onSelect(option); // Notify parent of selection
  };

  const dropdownClassName = `nice-select ${customClass || ''} ${
    isOpen ? 'open' : ''
  }`;
  console.log(selectedOption);
  return (
    <div
      className={dropdownClassName}
      tabIndex="0"
      onClick={toggleDropdown}
      ref={dropdownRef}
    >
      <span className="current">{selectedOption || placeholder}</span>
      <ul className="list">
        {options.map((option, index) => (
          <li
            key={index}
            className={`option${
              selectedOption === option ? ' selected focus' : ''
            }`}
            data-value={index}
            onClick={() => handleSelectOption(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectComponent;
