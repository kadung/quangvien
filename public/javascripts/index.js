$(document).ready(function(){
    // Product-detail
    $("#callback-form").submit(event => {
      event.preventDefault();   // Prevent form send data.
      $('#callbackButton').prop('disabled', true);
      $("#error-number").addClass('d-none');
      $("#success-call").addClass('d-none');
      $("#fail-call").addClass("d-none");

      // Validation
      if (isVietnamesePhoneNumber($("#phone-number").val().toString())){
        $.ajax({
          url: "/callback/",
          type: "POST",
          data: {
            phoneNumber: $("#phone-number").val(),
            product: $("#product-name").text()
          },
          success: (data) => {
            if(data.status == "success") {
              $("#success-call").removeClass("d-none");
            }
            else{
              $("#fail-call").removeClass("d-none");
            }
            $('#callbackButton').prop('disabled', false);
          },
          dataType: 'json'
        });
      }
      else {
        $("#error-number").removeClass("d-none");
      }
    })
    
    // Contact
    $("#contact-form").submit(event => {
      event.preventDefault();   // Prevent form send data.

      $('#contact-submit').prop('disabled', true);
      $("#contact-error").addClass('d-none');
      $("#contact-success").addClass('d-none');

      $.ajax({
        url: "/lien-he/",
        type: "POST",
        data: {
          name: $("#contact-name").val(),
          phone: $("#contact-phone").val(),
          email: $("#contact-email").val(),
          message: $("#contact-message").val(),
        },
        success: (data) => {
          console.log(data)
          if(data.status == "success") {
            $("#contact-success").removeClass("d-none");
            $('#contact-form').trigger("reset");
          }
          else{
            $("#contact-error").removeClass("d-none");
          }
          $('#contact-submit').prop('disabled', false);
        },
        dataType: 'json'
      });

    })
})

const isVietnamesePhoneNumber = (number) => {
  return /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}