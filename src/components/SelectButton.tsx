interface SelectButtonProps {
      children: React.ReactNode;
      selected: boolean;
      onClick: () => void;
}

const SelectButton: React.FC<SelectButtonProps> = ({ children, selected, onClick }) => {
      return (
            <span
                  onClick={onClick}
                  className={`border border-gold rounded-lg px-4 py-2 font-medium cursor-pointer 
                  ${selected ? "bg-gold text-black font-semibold" : ""} 
                  hover:bg-gold hover:text-black`}
            >
                  {children}
            </span>
      );
};

export default SelectButton;
