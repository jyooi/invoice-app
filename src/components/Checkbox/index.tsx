import React from "react";
import tw, { styled, css } from "twin.macro";
type PropType = {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  label: string;
};

const InputCheckbox = styled.input(({ isCheck }: { isCheck: boolean }) => [
  isCheck ? tw`dark:bg-01` : tw`dark:bg-03`,
  tw`w-4 h-4 text-01 bg-05 border-0 rounded ring-0 group-hover:border-01 group-hover:border cursor-pointer`,
]);

const CheckboxLabel = styled.label(() => [
  tw`ml-[13px] text-lg font-bold text-03 cursor-pointer select-none dark:text-white`,
  css`
    line-height: 15px; /* 100% */
    letter-spacing: -0.25px;
  `,
]);

export const Checkbox = ({ isChecked, setIsChecked, label }: PropType) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <div tw="flex items-center" className="group">
        <InputCheckbox
          className="group"
          isCheck={isChecked}
          type="checkbox"
          value=""
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
        <CheckboxLabel
          className="group"
          htmlFor="inline-checkbox"
          onClick={() => setIsChecked(!isChecked)}
        >
          {label}
        </CheckboxLabel>
      </div>
    </>
  );
};
