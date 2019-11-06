PayLogicKiosk
================================================================================
Инициализация оплаты
--------------------------------------------------------------------------------
Чтобы начать оплату, необходимо сформировать объект корзины и вызвать JavaScript метод PayLogicKiosk.makePayment(cart), где cart - объект корзины.
Для вызова метода не требуется подключения каких-либо библиотек. Данный метод будет доступен автоматически при открытии сайта через ПО платежного киоска.

После вызова метода будет сразу инициирован переход к оплате. Дальнейшая обработка всего процесса платежа, а также ошибок, осуществляется на стороне ПО платежного киоска.

Объектная модель
--------------------------------------------------------------------------------
**Корзина**
* Номер заказа
    * Наименование поля: number
    * Тип: строка
    * Обязательность: нет
* Список атрибутов заказа
    * Наименование поля: attributes
    * Тип: массив объектов attribute
    * Обязательность: нет
* Список позиций
    * Наименование поля: items
    * Тип: массив объектов item
    * Обязательность: да

Примеры объектов:

`````
{
 number: 'D363-K',
 attributes: [
  {
   key: 'phone',
   value: '9123545566'
  },
  {
   key: 'period',
   value: '12'
  }
 ],
 items: [
  {
   name: 'Оплата МТС',
   price: 20000,
   subjectType: 4
  }
 ]
}
`````

`````
{
 number: '22RTV1457-55',
 items: [
  {
   id: 'a9671480-09ce-4843-9656-be4691252873',
   name: 'Чисбургер средний',
   price: 10000,
   count: 1000,
   paymentMethod: 2
  },
  {
   id: '12ec45be-43e7-4db3-96f7-960201e249cc',
   subjectType: 1,
   name: 'Кола большая',
   price: 5000,
   count: 1000,
   taxId: 2
  }
 ]
}
`````

**Атрибут заказа (attribute)**

* Ключ атрибута
    * Наименование поля: key
    * Тип: строка
    * Обязательность: да
* Значение атрибута
    * Наименование поля: value
    * Тип: строка
    * Обязательность: да

`````
{
 key: 'phone',
 value: '9123545566'
}
`````

`````
{
 key: 'period',
 value: '12'
}
`````

**Позиция (item)**

* Идентификатор позиции
    * Наименование поля: id
    * Тип: строка
    * Обязательность: нет
    * Использование: для сопоставления позиции с внешними учетными системами
* Название позиции
    * Наименование поля: name
    * Тип: строка
    * Обязательность: да
    * Ограничения: 128 символов. Если будет передана строка длиной более 128 символов, то при фискализации платежа поле автоматически будет обрезано до максимально допустимого значения
* Идентификатор типа товара
    * Наименование поля: subjectType
    * Тип: целое число
    * Обязательность: нет
    * Возможные значения: в соответствии с [54ФЗ (Значения реквизита "признак предмета расчета")](http://www.consultant.ru/document/cons_doc_LAW_214339/cfdfbc0cb69618bfb358a7d612a1ac60149a7525/)
    * Значение по умолчанию: 1, если не переопределено конфигурацией ПО киоска
* Идентификатор налоговой ставки
    * Наименование поля: taxId
    * Тип: целое число
    * Обязательность: нет
    * Возможные значения: в соответствии с [54ФЗ (Значения реквизита "ставка НДС")](http://www.consultant.ru/document/cons_doc_LAW_214339/b09199c4b5b68f8c82f3f4aadd06954b4c7914c9/)
    * Значение по умолчанию: определяется из настроек справочника юр. лица. Если юр. лицо является плательщиком НДС, то берется ставка НДС 20% (1), иначе берется ставка Без НДС (6). Также значение может быть переопределено конфигурацией ПО киоска
* Идентификатор типа оплаты
    * Наименование поля: paymentMethod
    * Тип: целое число
    * Обязательность: нет
    * Возможные значения: в соответствии [с 54ФЗ (Значения реквизита "признак способа расчета")](http://www.consultant.ru/document/cons_doc_LAW_214339/731d2f8d127e3614422af34b4ac197612bd2f64d/)
    * Значение по умолчанию: ПРЕДОПЛАТА 100% (1)
* Цена
    * Наименование поля: price
    * Тип: целое число
    * Обязательность: да
    * Особенности: в копейках и с учетом НДС, за 1 ед.
* Количество
    * Наименование поля: count
    * Тип: целое число
    * Обязательность: нет
    * Особенности: в граммах, если товар штучный необходимо указать 1000, 2000 и т.д.
    * Значение по умолчанию: 1000
* Cумма по строке товарной позиции
    * Наименование поля: sum
    * Тип: целое число
    * Обязательность: нет
    * Особенности: Равна примерно price * count. Но при погрешностях округления может быть больше

`````
{
 id: 'a9671480-09ce-4843-9656-be4691252873',
 name: 'Чисбургер средний',
 subjectType: 1,
 taxId: 2,
 paymentMethod: 3,
 price: 15000,
 count: 1000
}

{
 id: 'a9671480-09ce-4843-9656-be4691252873',
 name: 'Чисбургер средний',
 subjectType: 1,
 taxId: 2,
 paymentMethod: 3,
 price: 15000,
 count: 2000,
 sum: 40000 
}
`````

**InputElement**

* Идентификатор
   * Наименование поля: key
   * Тип: строка
   * Обязательность: да
* Значение
   * Наименование поля: value
   * Тип: строка
   * Обязательность: да
* Заголовок
   * Наименование поля: keyTitle
   * Тип: строка
   * Обязательность: нет
   * Значение по умолчанию: null
* Идентификатор заголовка
   * Наименование поля: keyTitleId
   * Тип: строка
   * Обязательность: нет
   * Значение по умолчанию: null
* Первоначальное значение
   * Наименование поля: originalValue
   * Тип: строка
   * Обязательность: нет
   * Значение по умолчанию: null
* Заголовок значения
   * Наименование поля: valueTitle
   * Тип: строка
   * Обязательность: нет
   * Значение по умолчанию: null
* Идентификатор заголовка значения
   * Наименование поля: valueTitleId
   * Тип: строка
   * Обязательность: нет
   * Значение по умолчанию: null
* Флаги
   * Наименование поля: flags
   * Тип: Число
   * Обязательность: нет
   * Значение по умолчанию: 0
    
*Значения флагов:*

0 - Значение по умолчанию  - флаг отсутствует 

1 - Не показывать на экране подтверждения. Биты первого полубайта относятся к ТПО

2 - Не выводить на печать на чеке.

4 - Не показывать в атрибутах платежа в админке.

16 -  Возможность использования контактов. Биты второго полубайта относятся к кошельку

32 - Использовать валидацию по ёмкостям. Биты второго полубайта относятся к кошельку

256 - Запрет отдачи атрибута внешним агентам. Биты третьего полубайта относятся к процессингу

512 - Не отображать атрибут на front-end приложениях. Биты третьего полубайта относятся к процессингу

1024 - Значение помеченное этим флагом не подлежит изменению

2048 - Значение помеченное этим флагом будет замаскировано в логах

4096 - Значение содержит ссылку на картинку, которую корректно нужно отобразить

8192 - Значение содержит ссылку на внешний ресурс

268435456 - Атрибут был получен от сервера

1073741824 - Шифровать атрибуты на стороне сервера


Пример объекта

`````          
  {    
    key: 'deposit-id',
    value: 'As6df4s-654adss4d-as54asd',
    keyTitle: 'Идентификатор депозита',
    flags: 2
  }
`````


Пример использования
--------------------------------------------------------------------------------
Базовый пример работы с API

CART - js-объект корзины
$paymentButton - Кнопка оплаты

`````
const $paymentButton = $('[js-payment-button]')

const CART = {
  number: '22RTV1457-55',
  items: [
    {
      id: 'a9671480-09ce-4843-9656-be4691252873',
      name: 'Чисбургер средний',
      price: 10000,
      count: 1000,
      paymentMethod: 2,
      subjectType: 1,
      taxId: 1
    },
    {
      id: '12ec45be-43e7-4db3-96f7-960201e249cc',
      name: 'Кола большая',
      price: 5000,
      count: 1000,
      paymentMethod: 2,
      subjectType: 1,
      taxId: 1
    }
  ]
}

$paymentButton.on('click', function () {
  PayLogicKiosk.makePayment(CART)
})

`````
Остальные примеры работы API доступны в директории examples
