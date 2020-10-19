$(document).ready(function(){
    $("#test1234").click(() => {
      $("#error-number").removeClass("d-none")
    })
  
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
    
})

const isVietnamesePhoneNumber = (number) => {
  return /(03|07|08|09|01[2|6|8|9])+([0-9]{8})\b/.test(number);
}