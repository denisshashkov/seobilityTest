export type ValidationType = {
  empty: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  wordsCount?: number;
};

export type CommonType = {
  value: string;
  focused: boolean;
  empty: boolean;
  errorMessage: string;
  emailError: boolean;
  minLengthError: boolean;
  maxLengthError: boolean;
  maxWordsLengthError: boolean;
  inputValid: boolean;
  onChange: (e: any) => void;
  onBlur: () => void;
  resetInput: () => void;
};
