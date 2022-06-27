import React, { useState } from "react";
import { ValidationType } from "../types/types";
import { useValidation } from "./UseValidationhook";

export const useInput = (validations: ValidationType) => {
  const [value, setValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const valid = useValidation(value, validations);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  const onBlur = () => {
    setFocused(true);
  };
  const resetInput = () => {
    setValue("");
  };
  return {
    value,
    onChange,
    onBlur,
    focused,
    resetInput,
    ...valid,
  };
};
