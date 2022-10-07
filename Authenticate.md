## API для авторизации

Для внешней авторизации, нужно выполнить POST запрос по адресу `https//<webinar-domain>/api/login` или другой вариант, используемый реже, когда невозможно определить вебинар на основе домена - `https//<webinar-domain>/api/<webinar-name>/login`, где `<webinar-domain>` - это зарегистрированнное доменное имя вебинара, `<webinar-name>` - это системное имя вебинара, передав такие параметры:

- Обязательные
  - username - ФИО пользователя
  - email - Email пользователя

- Необязательные
  - avatar - url картинки, которая может использоваться в качестве аватара пользователя
  - phone - телефон
  - work - место работы
  - post - должность

Api авторизации при успешном выполнении возвращает json объект такого вида:

```json
{
  "message": "Successful",
  "status": true,
  "token": "hash-string"
}
```

где наибольшую ценность представляет аттрибут `token`.


Если запрос не прошел валидацию, будет возвращен json объект и статус 422:

```json
{
  "errors": {
    "email": ["The email must be a valid email address."],
    "username": ["The username field is required."]
  },
  "message": "validation error",
  "status": false
}
```

После получения токена, чтобы закончить авторизацию, нужно перейти к вебинару по адресу `https://<webinar-domain>/login?token=<token>`. В случае успешной проверки токена, браузер будет направлен на главную страницу вебинара, иначе будет показано сообщение об ошибке.

Пример:

```js
  // js

  const webinar_domain = `sprint.webinar.1t.ru`; // Домен может отличаться, это только пример
  // Описание пользователя
  const userdata = {
    username: 'John Doe', // обязательный
    email: 'mail@example.com', // обязательный
    avatar: 'https://example.com/avatar.png', // необязательный
  };
  // Выполняет авторизацию с использованием АПИ и перенаправляет пользователя на страницу вебинара
  axios.post(`https://${webinar_domain}/api/login`, userdata)
    .then(({data}) => {
      // Направить браузер на страницу вебинара, где будет проверен токе
      // и пользователь сможет пользоваться вебинаром
      window.location.href = `https://${webinar_domain}/login?token=${data.token}`;
    })
    .catch((error) => {
      // errors handle
    });
```

```php
  // php

  function webinar_auth(string $webinar_domain, array $postdata)
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://{$webinar_domain}/api/login");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata)
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = json_decode(curl_exec($ch));
    curl_close($ch);
    return $output['token'];
  }

  $access_token = webinar_auth('sprint.webinar.1t.ru', ['username' => 'Альберт', 'email' => 'test@example.mail']);

  //  Использование токена при рендеринге страницы (in view)
  <a href="{{ "https://sprint.webinar.1t.ru/login?token={$access_token}" }}">Перейти в вебинар авторизованным</a>
```
