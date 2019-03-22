$(function () {
  const $payment = $('[js-payment]')
  const $paymentObject = $payment.find('[js-payment-object]')
  const $paymentButton = $payment.find('[js-payment-button]')

  // Визуализация глобального объекта корзины на странице
  $paymentObject.html(JSON.stringify(CART, null, '  '))

  $paymentButton.on('click', function () {
    alert('Вызов метода оплаты терминала')
    PayLogicKiosk.makePayment(CART)
  })

})