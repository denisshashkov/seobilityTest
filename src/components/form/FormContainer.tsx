import React, { Fragment, useState } from "react";
import { sendRequest } from "../../api/api";
import { useInput } from "../../hooks/UseInputHook";
import { Form } from "./Form";

export const FormContainer = () => {
  const [successRequest, setSuccessRequest] = useState<boolean>(false);
  const [errorRequest, setErrorRequest] = useState<boolean>(false);
  const fullName = useInput({
    empty: true,
    minLength: 3,
    maxLength: 30,
    wordsCount: 2,
  });
  const email = useInput({ empty: true, isEmail: false });
  const phone = useInput({ empty: true });
  const birthday = useInput({ empty: true });
  const message = useInput({ empty: true, minLength: 10, maxLength: 300 });

  //Маска номера телефона
  const prefixNumber = (str: string) => {
    if (str === "7") {
      return "7 (";
    }
    if (str === "8") {
      return "8 (";
    }
    if (str === "9") {
      return "7 (9";
    }
    return "7 (";
  };

  const validValue = phone.value.replace(/\D+/g, "");
  let result;
  if (phone.value.includes("+8") || phone.value[0] === "8") {
    result = "";
  } else {
    result = "+";
  }

  for (let i = 0; i < validValue.length && i < 11; i++) {
    switch (i) {
      case 0:
        result += prefixNumber(validValue[i]);
        continue;
      case 4:
        result += ") ";
        break;
      case 7:
        result += "-";
        break;
      case 9:
        result += "-";
        break;
      default:
        break;
    }
    result += validValue[i];
  }
  phone.value = result;

  //закидываем значения из inputs в объект data для отправки
  const data = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    birthday: birthday.value,
    message: message.value,
  };
  // функция сброса значений в inputs после отправки
  const resetForm = () => {
    fullName.resetInput();
    email.resetInput();
    phone.resetInput();
    birthday.resetInput();
    message.resetInput();
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    await sendRequest(data)
      //Выводим сообщение об успешной отправке
      .then(() => setSuccessRequest(true))
      //сброс значений в inputs
      .then(() => resetForm())
      //вывод сообщения об ошибке
      .catch(() => setErrorRequest(true))
      //зачищаем сообщения
      .finally(() =>
        setTimeout(() => {
          setSuccessRequest(false);
          setErrorRequest(false);
        }, 3000)
      );
  };

  return (
    <Fragment>
      <Form
        handleSubmit={handleSubmit}
        fullName={fullName}
        email={email}
        phone={phone}
        birthday={birthday}
        message={message}
        successRequest={successRequest}
        errorRequest={errorRequest}
      />
    </Fragment>
  );
};
