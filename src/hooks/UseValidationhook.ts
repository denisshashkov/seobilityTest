import { useEffect, useState } from "react";
import { ValidationType } from "../types/types";

export const useValidation = (value: string, validations: ValidationType) => {
  const [empty, setEmpty] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [minLengthError, setMinLengthError] = useState<boolean>(false);
  const [maxLengthError, setMaxLengthError] = useState<boolean>(false);
  const [maxWordsLengthError, setMaxWordsLengthError] =
    useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [inputValid, setInputValid] = useState<boolean>(false);
  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        //Валидация на пустоту
        case "empty":
          if (value) {
            setEmpty(false);
          } else {
            setEmpty(true);
            setErrorMessage("Заполните это поле");
          }
          break;
        case "minLength":
          //Валидация на мин.длину
          if (value.length < validations[validation]! && value) {
            setMinLengthError(true);
            setErrorMessage(
              `Минимальное количество символов ${validations[validation]}`
            );
          } else {
            setMinLengthError(false);
          }
          break;
        case "maxLength":
          //Валидация на макс.длину
          if (value.length > validations[validation]!) {
            setMaxLengthError(true);
            setErrorMessage(
              `Максимальное количество символов ${validations[validation]}`
            );
          } else {
            setMaxLengthError(false);
          }
          break;
        case "wordsCount":
          //Валидация на кол-во слов
          if (value.split(" ").length > validations[validation]!) {
            setMaxWordsLengthError(true);
            setErrorMessage(
              `Максимальное количество слов ${validations[validation]}`
            );
          } else {
            setMaxWordsLengthError(false);
          }
          break;
        case "isEmail":
          //Валидация на валидный email
          const regexp = /^[\w.%+-]+@[\w.-]+\.[\w]{2,6}$/;
          if (!regexp.test(value) && value) {
            setEmailError(true);
            setErrorMessage("Не валидный email");
          } else {
            setEmailError(false);
          }
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    //Условие на валидные inputs, чтобы затем разблокировать кнопку отправки
    if (empty || minLengthError || maxLengthError || emailError) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [empty, minLengthError, maxLengthError, emailError]);

  return {
    errorMessage,
    empty,
    minLengthError,
    maxLengthError,
    emailError,
    inputValid,
    maxWordsLengthError,
  };
};
