## API для авторизации

Для внешней авторизации, нужно выполнить POST запрос по адресу `https//app.webinar.1t.ru/api/<webinar-name>/login`, где `<webinar-name>` - это системное имя вебинара, передав такие параметры:

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


где наибольшую ценность представляет аттрибут `token`. После получения токена, можно перейти к вебинару по адресу `https://webinar.1t.ru/<webinar-name>/login?token=<token>&redirect=/<webinar-name>` или с использованием домена `https://<webinar-name>.webinar.1t.ru/login?token=<token>&redirect=/`. Если указанный токен в адресе не верный, то на странице будет показано сообщение об ошибке.

Пример:

```js
  // js
  const webinarname = 'sprint';
  const webinar_domain = `${webinarname}.webinar.1t.ru`; // Домен может отличаться
  // Выполняет авторизацию с использованием АПИ и перенаправляет пользователя на страницу вебинара
  axios.post(`https://${webinar_domain}/api/${webinarname}/login`, userdata)
    .then(({data}) => {
      // navigate browser to webinars login page
      // redirect нужен для редиректа после проверки токена
      window.location.href = `https://${webinar_domain}/login?token=${data.token}&redirect=/`;
    })
    .catch((error) => {
      // errors handle
    });
```

```php
  // php

  function webinar_auth(string $webinar, array $postdata)
  {
    $ch = curl_init();
    // вместо "webinar.1t.ru" можно указать другой доступный домен например "{$webinar}.webinar.1t.ru"
    curl_setopt($ch, CURLOPT_URL, "https://webinar.1t.ru/api/{$webinar}/login");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata)
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = json_decode(curl_exec($ch));
    curl_close($ch);
    return $output['token'];
  }

  $access_token = webinar_auth('my-webinar', ['username' => 'Альберт', 'email' => 'test@example.mail']);

  // in view use token
  // redirect=/ указывается для автоматического редиректа на главную страницу вебинара, после проверки
  <a href="{{ "https://{$webinar}.webinar.1t.ru/login?token={$access_token}&redirect=/" }}">Перейти в вебинар авторизованным</a>
```
