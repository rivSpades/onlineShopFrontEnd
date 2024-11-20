import useCustomSelect from '@/src/hooks/useCustomSelect';
import React, { useEffect, useRef } from 'react';

const SelectComponent = ({
  options,
  placeholder,
  open,
  customClass,
  onSelect,
  selectedOption,
  required,
}) => {
  const { isOpen, openDropdown, closeDropdown, toggleDropdown, selectOption } =
    useCustomSelect(options, open);

  const dropdownRef = useRef(null);
  const selectRef = useRef(null); // Reference to the native select element

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
    onSelect(option); // Notify parent of selection
    closeDropdown();

    // Update the hidden native select element
    selectRef.current.value = option;
  };

  const dropdownClassName = `nice-select ${customClass || ''} ${
    isOpen ? 'open' : ''
  }`;

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

      {/* Hidden native select to trigger required validation */}
      <select
        ref={selectRef}
        value={selectedOption || ''}
        onChange={() => {}} // No need for onChange
        required={required}
        style={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
          height: 0,
          width: 0,
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectComponent;
