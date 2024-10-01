
const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: 'transparent',
      border: 'none',
      display: 'flex',
      justifyContent: 'space-between',
  
      boxShadow: state.isFocused ? '' : '',
      '&:hover': {
        borderColor: '#4D4D4D',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    indicatorSeparator: () => ({
      display: 'none',
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      color: 'white',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: '#000',
      color: 'white',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#4D4D4D' : '#000',
      color: state.isFocused ? 'white' : 'gray',
      '&:hover': {
        backgroundColor: '#4D4D4D',
        color: 'white',
      },
    }),
  };
  
  export default customStyles;
  