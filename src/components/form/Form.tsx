import React, { useState } from "react";
import { sendRequest } from "../../api/api";
import { useInput } from "../../hooks/UseInputHook";
import style from "./formStyle.module.scss";

export const Form: React.FC = () => {
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
    <div className={style.form__wrapper}>
      <form noValidate onSubmit={handleSubmit}>
        <div className={style.form__input}>
          <label>Имя Фамилия</label>
          <input
            name="fullName"
            onChange={fullName.onChange}
            onBlur={fullName.onBlur}
            value={fullName.value.toUpperCase()}
            placeholder="Введите имя и фамилию "
          />
          {fullName.focused && fullName.empty && (
            <span>{fullName.errorMessage}</span>
          )}
          {fullName.focused && fullName.minLengthError && (
            <span>{fullName.errorMessage}</span>
          )}
          {fullName.focused && fullName.maxLengthError && (
            <span>{fullName.errorMessage}</span>
          )}
          {fullName.focused && fullName.maxWordsLengthError && (
            <span>{fullName.errorMessage}</span>
          )}
        </div>
        <div className={style.form__input}>
          <label>E-mail</label>
          <input
            name="email"
            onChange={email.onChange}
            onBlur={email.onBlur}
            value={email.value}
            type="email"
            placeholder="Ваш email"
          />
          {email.focused && email.empty && <span>{email.errorMessage}</span>}
          {email.focused && email.emailError && (
            <span>{email.errorMessage}</span>
          )}
        </div>
        <div className={style.form__input}>
          <label>Номер телефона</label>
          <input
            name="phone"
            type="tel"
            onChange={phone.onChange}
            onBlur={phone.onBlur}
            value={phone.value}
            placeholder="Ваш номер телефона"
          />
          {phone.focused && phone.empty && <span>{phone.errorMessage}</span>}
        </div>
        <div className={style.form__input}>
          <label>Дата рождения</label>
          <input
            name="birthday"
            onChange={birthday.onChange}
            onBlur={birthday.onBlur}
            value={birthday.value}
            type="date"
          />
          {birthday.focused && birthday.empty && (
            <span>{birthday.errorMessage}</span>
          )}
        </div>
        <div className={style.form__input}>
          <label>Сообщение</label>
          <input
            name="message"
            onChange={message.onChange}
            onBlur={message.onBlur}
            value={message.value}
            placeholder="Введите ваше сообщение"
          />
          {message.focused && message.empty && (
            <span>{message.errorMessage}</span>
          )}
          {message.focused && message.minLengthError && (
            <span>{message.errorMessage}</span>
          )}
          {message.focused && message.maxLengthError && (
            <span>{message.errorMessage}</span>
          )}
        </div>
        <button
          disabled={
            !fullName.inputValid ||
            !email.inputValid ||
            !phone.inputValid ||
            !birthday.inputValid ||
            !message.inputValid
          }
        >
          Отправить
        </button>
        {successRequest && <div>Данные успешно отправленны</div>}
        {errorRequest && <span>Упс какая-то ошибка </span>}
      </form>
    </div>
  );
};
