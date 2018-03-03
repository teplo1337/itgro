const form = $('.order-form');

form.submit(()=> {  
  $('.block__success').hide();
  $('.block__warning').hide();
  $('.block__error').hide();

  const data = {};

  data.name = validator(form.find('input[name="name"]')),
  data.phone = validator(form.find('input[name="phone"]')),
  data.email = validator(form.find('input[name="email"]')),
  data.radio = validator(form.find('input[name="duration"]').filter(':checked')),
  data.text = validator(form.find('textarea[name="text"]'));

  for (key in data) {
    if (data[key] === undefined) return false;
  }

  sendData(data);
  return false;
});

const validator = (element) => {
  if (element.val()) {
    return element.val();
  } else {

    element.addClass('wrn');
    element.click(() => {
      $('.block__warning').hide();
      element.removeClass('wrn');

    });
    
    $('.block__warning').show();
    return undefined;
  }
}

const sendData = (data) => {
  $.ajax({
    url: '/api',
    type: 'POST',
    data: JSON.stringify(data),
    contentType: "application/json"    
  })
  .done ((msg) => {   
      $('.block__success').show();
      form.trigger("reset");
      console.log(msg);
  })
  .fail((msg) => {
      $('.block__error').show();
      console.log(msg);
  });
}