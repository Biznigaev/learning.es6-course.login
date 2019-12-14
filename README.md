## Домашнее задание к проекту Login

**Домашнее задание к проекту Login.**
1. Реализовать регистрацию.

**Метод запроса**: POST.

**Роут для запроса**: /auth/signup

Пример передаваемых данных (ключи в объекте обязательно должны быть такими же как в примере):

```json
email: "denis.m.pcspace@gmail.com",
password: "dmgame12345",
nickname: "dmgame",
first_name: "Denis",
last_name: "Mescheryakov",
phone: "0631234567",
gender_orientation: "male", // or "female"
city: "Kharkiv",
country: "Ukrane",
date_of_birth_day: 01,
date_of_birth_month: 03,
date_of_birth_year: 1989,
```

**В ответе от сервера прейдет:**
```json
{
	error: false, 
	message: "User created success. On your email sended link. Please verify your email."
}
```

Для регистрации используйте обязательно настоящий email так как вам туда придет ссылка для активации аккаунта.


**Форму с регистрацией разместите на странице логина в виде табов т.е форма логина отдельный таб, форма регистрации отдельный таб.**
1. Реализовать autocomplete в форме регистрации в полях countries и cities

**Метод запроса**: GET,
**Роут для запроса**: /location/get-countries

Вам прийдет массив стран, при выборе страны берете индекс из массива на котором была страна и делаете GET запрос на адрес location/get-cities/{COUNTRY_INDEX}

вместо COUNTRY_INDEX подставляете свой ранее полученный индекс страны индекс

В ответ вам прейдет список городов по этой стране, который вы должны вывести в селект.

Изначально поля для ввода города должно быть disabled.

**В качестве самих эелементов можете использовать нативные элементы из html**

**Или можете взять из jQuery UI элемент Autocomplete**