## API для авторизации

Для внешней авторизации, нужно выполнить POST запрос по адресу `https://<webinar-server>/api/login`, где `<webinar-server>` - это зарегистрированнное доменное имя вебинара (по умолчанию `app.webinar.1t.ru`), передав такие параметры:

- Обязательные

| Параметр | Описание           |
|----------|--------------------|
| username | ФИО пользователя   |
| email    | Email пользователя |

- Необязательные

| Параметр | Описание                                                                   |
|----------|----------------------------------------------------------------------------|
| avatar   | url картинки, которая может использоваться в качестве аватара пользователя |
| phone    | телефон                                                                    |
| work     | место работы                                                               |
| post     | должность                                                                  |

Api авторизации при успешном выполнении возвращает json объект такого вида:

```json
{
  "message": "Successful",
  "status": true,
  "redirect": "https://<webinar-domain>?token=<token>"
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
После успешного выполнения запроса авторизации нербходимо направить браузер пользователя, использовав параметр redirect json объекта, который вернул сервер.

Пример:

```js
  // js

  const webinar_server = `sprint.webinar.1t.ru`; // Домен может отличаться, это только пример
  // Описание пользователя
  const userdata = {
    username: 'John Doe', // обязательный
    email: 'mail@example.com', // обязательный
    avatar: 'https://example.com/avatar.png', // необязательный
  };
  // Выполняет авторизацию с использованием АПИ и перенаправляет пользователя на страницу вебинара
  axios.post(`https://${webinar_server}/api/login`, userdata)
    .then(({data}) => {
      if (!data.redirect) {
        throw new Error("Адрес вебинара не найден");
      }
      // Направить браузер на страницу вебинара, где пользователь уже будет авторизован
      window.location.href = data.redirect;
    })
    .catch((error) => {
      // errors handle
    });
```

```php
  // php

  function webinar_auth(string $webinar_server, array $postdata)
  {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://{$webinar_server}/api/login");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postdata)
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    $output = json_decode(curl_exec($ch));
    curl_close($ch);
    return $output['redirect'];
  }

  $webinarUrl = webinar_auth('sprint.webinar.1t.ru', ['username' => 'Альберт', 'email' => 'test@example.mail']);

  // рендеринг страницы (in view)
  <a href="{{ $webinarUrl }}">Перейти в вебинар авторизованным</a>
```
