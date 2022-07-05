import React from "react";
import { CommonType } from "../../types/types";
import style from "./formStyle.module.scss";

type PropsType = {
  fullName: CommonType;
  email: CommonType;
  phone: CommonType;
  birthday: CommonType;
  message: CommonType;
  successRequest: boolean;
  errorRequest: boolean;
  handleSubmit: (e: React.SyntheticEvent) => void;
};

export const Form: React.FC<PropsType> = (props) => {
  const submitForm = (e: React.SyntheticEvent) => {
    e.preventDefault();
    props.handleSubmit(e);
  };
  return (
    <div className={style.form__wrapper}>
      <form noValidate onSubmit={submitForm}>
        <h3>Seobility</h3>
        <div className={style.form__input}>
          <label>Имя Фамилия</label>
          <input
            name="fullName"
            onChange={props.fullName.onChange}
            onBlur={props.fullName.onBlur}
            value={props.fullName.value.toUpperCase()}
            placeholder="Введите имя и фамилию "
          />
          {props.fullName.focused && props.fullName.empty && (
            <span>{props.fullName.errorMessage}</span>
          )}
          {props.fullName.focused && props.fullName.minLengthError && (
            <span>{props.fullName.errorMessage}</span>
          )}
          {props.fullName.focused && props.fullName.maxLengthError && (
            <span>{props.fullName.errorMessage}</span>
          )}
          {props.fullName.focused && props.fullName.maxWordsLengthError && (
            <span>{props.fullName.errorMessage}</span>
          )}
        </div>
        <div className={style.form__input}>
          <label>E-mail</label>
          <input
            name="email"
            onChange={props.email.onChange}
            onBlur={props.email.onBlur}
            value={props.email.value}
            type="email"
            placeholder="Ваш email"
          />
          {props.email.focused && props.email.empty && (
            <span>{props.email.errorMessage}</span>
          )}
          {props.email.focused && props.email.emailError && (
            <span>{props.email.errorMessage}</span>
          )}
        </div>
        <div className={style.form__input}>
          <label>Номер телефона</label>
          <input
            name="phone"
            type="tel"
            onChange={props.phone.onChange}
            onBlur={props.phone.onBlur}
            value={props.phone.value}
            placeholder="Ваш номер телефона"
          />
          {props.phone.focused && props.phone.empty && (
            <span>{props.phone.errorMessage}</span>
          )}
        </div>
        <div className={style.form__input}>
          <label>Дата рождения</label>
          <input
            name="birthday"
            onChange={props.birthday.onChange}
            onBlur={props.birthday.onBlur}
            value={props.birthday.value}
            type="date"
          />
          {props.birthday.focused && props.birthday.empty && (
            <span>{props.birthday.errorMessage}</span>
          )}
        </div>
        <div className={style.form__input}>
          <label>Сообщение</label>
          <input
            name="message"
            onChange={props.message.onChange}
            onBlur={props.message.onBlur}
            value={props.message.value}
            placeholder="Введите ваше сообщение"
          />
          {props.message.focused && props.message.empty && (
            <span>{props.message.errorMessage}</span>
          )}
          {props.message.focused && props.message.minLengthError && (
            <span>{props.message.errorMessage}</span>
          )}
          {props.message.focused && props.message.maxLengthError && (
            <span>{props.message.errorMessage}</span>
          )}
        </div>
        <button
          disabled={
            !props.fullName.inputValid ||
            !props.email.inputValid ||
            !props.phone.inputValid ||
            !props.birthday.inputValid ||
            !props.message.inputValid
          }
        >
          Отправить
        </button>
        {props.successRequest && (
          <div className={style.tooltip__success}>
            <p>Данные успешно отправленны</p>
          </div>
        )}
        {props.errorRequest && (
          <div className={style.tooltip__error}>
            <p>Упсс! Ошибка </p>
          </div>
        )}
      </form>
    </div>
  );
};
