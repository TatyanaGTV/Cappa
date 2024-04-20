$(document).ready(function(){
    new WOW({
        animateClass: 'animate__animated',
    }).init();

/*let button = document.querySelector('.program-items');
    button.addEventListener('click', (event) => {
   // let isButton = event.target.closest('.program-items');
    if (isButton) {
        button.forEach((readButton) => {
            let dots = document.getElementsByClassName(".dots");
            let read_more = document.getElementsByClassName(".read_more");
            let read = document.getElementsByClassName(".read");
            if (dots.style.display === 'none') {
                read_more.style.display = 'block';
                read.innerText = "Скрыть";
            } else {
                read_more.style.display = 'none';
                read.innerText = "Читать далее";
            }
        })
    }
    });*/
  //  $('.program-items').on ( 'click','.read_more',function () {
  //      let dots = $('.p_dots');//многоточие
  //      let read_more = $('.read_more');//кнопки
  //      let read = $('.read');//скрытая часть текста
   //     let text = $('.program-item');

        $('.program-items').on('click', '.read_more', function() {
            let dots = $(this).closest('.hide320').find('.p_dots');
            let read_more = $(this);
            let read = $(this).closest('.hide320').find('.read');
            let text = $('.program-item');

            if (dots.is(':visible')) {
                read.css('display', 'inline');
                dots.css('display', 'none');
                read_more.html("Скрыть");
                text.css('height','auto');
            } else {
                read.css('display', 'none');
                dots.css('display', 'inline');
                read_more.html("Читать далее");
            }
        });

        //    read_more.html(dots.is(':visible') ? "Скрыть" : "Читать далее");
     //   });

       // })
  //  });

    $('.schedule-items').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 2000,
        dots:true,
        customPaging: function (slide,i) {
            return "<span class='dot'></span>";
        },
        appendArrows: $('.arrows-slick'),
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next'),
        responsive: [
            {
                breakpoint: 695,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 375,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    variableWidth: true,
                }
            }
        ]
    });
    $('.otzov-items').slick({
        slidesToShow: 2,
        slidesToScroll: 1,
       // autoplay: true,
      //  autoplaySpeed: 2000,
        dots:true,
        customPaging: function (slide,i) {
            return "<span class='dot-black'></span>";
        },
        appendArrows: $('.arrows-slick-black'),
        prevArrow: $('.slider.slick-prev'),
        nextArrow: $('.slider.slick-next'),
        responsive: [
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
            ]
    });



    if (screen.width > 476 ) {
        $('.fotos').slick({
            dots: true,
            infinite: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            customPaging: function (slide,i) {
                return "<span class='dot-black'></span>";
            },
            appendArrows: $('.arrows-slick-black-2'),
            prevArrow: $('.slider_2.slick-prev'),
            nextArrow: $('.slider_2.slick-next'),
            responsive: [
                {
                    breakpoint: 475,
                    settings: {
                       slidesToShow: 1,
                        slidesToScroll: 1,
                //         $('.fotos').slick('slickRemove','<div className="foto-gallery.f2"></div>'),
              //          $('.slider').slick({'slickRemove', $('.fotos')});
                    }
               }
            ]
        });
    } else if (screen.width < 475) {
   // $('.fotos').on('setPosition', function(event, slick, direction){
   //     $('.fotos').slick('slickRemove','<div className="foto-gallery f2"></div>');
    //    $('.fotos').slick('slickRemove','<div className="foto-gallery f3"></div>');
    //    $('.fotos').slick('slickRemove','<div className="foto-gallery f4"></div>');
  //  });
        $('.foto-gallery.f1').slick({
            dots: true,
            infinite: true,
            rows :1,
            adaptiveHeight: true,
            speed: 500,
            fade: true,
            cssEase: 'linear',
            slidesToShow: 1,
            slidesToScroll: 1,
            customPaging: function (slide, i) {
                return "<span class='dot-black'></span>";
            },
            appendArrows: $('.arrows-slick-black'),
            prevArrow: $('.slick-prev-black'),
            nextArrow: $('.slick-next-black'),
        });

    }
    $('.card-image').magnificPopup({
        type: 'image',
        zoom: {
            enabled: true,
            duration: 600,
            easing: 'ease-in-out',
            scale:3,
            opener: function(openerElement) {
                return openerElement.is('img') ? openerElement : openerElement.find('img');
            }
        }
    });
    $('#btn').click(function() { // ID откуда кливаем
        $('html, body').animate({
            scrollTop: $(".program").offset().top // класс объекта к которому приезжаем
        }, 1000); // Скорость прокрутки
    });
    $('.btn-ord').click(function() {
        $('.popup').show();
        $('.popup-container').show();
    });
    //для кнопки Заказать звонок. валидация формы в попапе
    $('#pop_submit').click(function(e) {
        e.preventDefault();
        e.stopPropagation();

        let name = $('#pop_name');
        let phone = $('#pop_phone');
        let hasError = false;
        let red1 = $('.red1');
        let red2 = $('.red2');

        $('.error-input').hide();
        red1.css('border-color','transparent');
        red2.css('border-color','transparent');
        if (!name.val()) {
            name.next().show();
            hasError = true;
            red1.css('border-color','red');
        }
        if (!phone.val()) {
            phone.next().show();
            hasError = true;
            red2.css('border-color','red');
        }

        if (!hasError) {
            $.ajax({
                method: "post",
                url: "http://testologia.site/checkout",
                data: { name:  name.val(),  phone:  phone.val()}
            })
                .done(function (message) {
                    if (message.success) {
                        $('.pop-form').hide();
                        $('.text-popup').show();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.');
                        $('.popup').hide();
                        $('.popup-container').hide();
                    }
                });
        }
    });
    $('#submit').click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        let name = $('#name');
        let phone = $('#phone');
        let hasError = false;
        let red1 = $('.red1');
        let red2 = $('.red2');

        $('.error-input').hide();
        red1.css('border-color', 'transparent');
        red2.css('border-color', 'transparent');
        if (!name.val()) {
            name.next().show();
            hasError = true;
            red1.css('border-color', 'red');
        }
        if (!phone.val()) {
            phone.next().show();
            hasError = true;
            red2.css('border-color', 'red');
        }

        if (!hasError) {
            $.ajax({
                method: "post",
                url: "http://testologia.site/checkout",
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (message) {
                    if (message.success) {
                        $('.travel-form').remove();
                        $('.success-form').show();
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ.');
                        form.reset();
                    }
                });
        }
    });

        $('#email').click(function(e) {
            e.preventDefault();
            e.stopPropagation();

                let mail = $('#mail');
                let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                let er_red = $('.red_mail');
                er_red.css('border-color', '#fdaa24');
                if (!emailRegex.test(mail.val())) {
                    er_red.css('border-color', 'red');
                    alert ("Вы ввели некорректный адрес электронной почты");
                    return;
                } else {
                    alert ("Спасибо!");
                    mail.val('');
                }
            });
        let cross = $('#cross');
        cross.on('click',function () {
            $('.popup').hide();
            $('.popup-container').hide();
        });


    $('.observe-pict-video').hide();
    $('.cover-image ').show();
    $('#play').on('click', function () {
        $('.cover-image ').hide();
        $('.observe-pict-video').show();
    })
});

