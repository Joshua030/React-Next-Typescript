import styled from "styled-components";

interface SelectPropsStyled {
  type: "white" | "grey";
}

const StyledSelect = styled.select<SelectPropsStyled>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid ${(props) => (props.type === "white" ? "var(--color-grey-100)" : "var(--color-grey-300)")};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

interface SelectProps {
  options: { value: string; label: string }[];
  value: string;
  type: "white" | "grey";
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select = ({ options, value, type, onChange }: SelectProps) => {
  return (
    <StyledSelect value={value} type={type} onChange={onChange}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
