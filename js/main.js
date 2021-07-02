$(document).ready(function() {
     $(window).on('scroll', function () {
        // 1) cnt2 카메라 움직임
        const moveStart = $('#cnt2').offset().top;
        const moveScale = moveStart * 0.4;

        if ($(this).scrollTop() > moveStart - moveScale && $(this).scrollTop() < moveStart + moveScale){
            $('#cnt2 ul li a').parent().addClass('on');
        } else $('#cnt2 ul li a').parent().removeClass('on');

        // 3-1) cnt4 scroller 누르고 있을땐 point_right 사라지게 ok but 왼쪽방향으로 움직일때 제어하기!!!!!!!!!!!!!
    
        // 3-2) 4pass 사진들 delay되면서 나오기
        const $cnt4 = $('#cnt4').offset().top;
        const $cnt5 = $('#cnt5').offset().top;
        const $passDelay = $('#cnt4 #pass_delaySlide .pass');
        if ($(this).scrollTop() > $cnt4 - 250 && $(this).scrollTop() < $cnt5 + 250 ) {
            $passDelay.each(function(i) {
                let TopMove = 50 * i +50;
                console.log(TopMove);
                $(this).delay(100 * i + 100).stop(false,true).animate({top: `${TopMove}px`});
            });
        }
        else {
            $passDelay.each(function(i) {
                $(this).delay(100 * i).stop().animate({top: 0});
            });
          }
    });
    
    // 2-1) cnt3 카메라 출력 움직임 - pc
    // 2-2) cnt3 카메라 출력 움직임 - mobile
    const cnt3 = $('#cnt3 .tit_txt').offset().top;
    const cnt4 = $('#cnt4').offset().top;
    const $vanish = $('#cnt3 .vanish');
    let timer = 0;

    let currentDirection = ''; // 현재의 방향을 나타내는 변수
    let lastScrollY = 0; // 방향을 구하기 위해 사용되는 변수

    var isMobile = $(window).width() < 768 ? true : false;

    $(window).on('scroll resize', function () {
        clearTimeout(timer);

        timer = setTimeout(function () {
            var scrollY = $(this).scrollTop();

            if (window.matchMedia("(max-width: 767px)").matches) { //모바일
                // pc 스타일이 적용 되었다면 초기화 하기 추가(pc에서 모바일로 변경되는 순간 한번만 동작)
                if (isMobile === false) {
                    $vanish.removeClass('on').show().next().find('.img_m, .img_b').removeAttr('style');
                }

                if ($(this).scrollTop() > cnt3 -200 && $(this).scrollTop() < cnt4 - 200) {
                    // 대상 영역에 진입한 경우
                    $vanish.addClass('on').next().find('.img_m').delay(2000).stop().animate({right: '-30%',opacity: 1});
                } else {
                    // 대상 영역을 벗어난 경우 (대상영역의 위나 아래일 경우)
                    $vanish.removeClass('on').next().find('.img_m').stop().animate({right: '10%',opacity: 0});
                }
                isMobile = true;
            }  else { //pc
                //  모바일 스타일이 적용 되었다면 초기화 하기 추가(모바일에서 pc로 변경되는 순간 한번만 동작)
                if (isMobile == true) {
                    $vanish.removeClass('on').show().next().find('.img_m, .img_b').removeAttr('style');
                }

                if ($(this).scrollTop() > cnt3 -300 && $(this).scrollTop() < cnt4 - 300) {
                    // 대상 영역에 진입한 경우
                    // 2. 핸드폰 오른쪽 기울어지고 블루투스 깜빡
                    $vanish.addClass('on');
                    // 3. 카메라가 움직이기 전 작은 이미지 살짝 나옴
                    // 4. 핸드폰과 블루투스 사라짐
                    // 5. 카메라가 움직인 후 큰 이미지가 출력
                    $vanish.fadeOut(2000, function(){
                        $(this).next().find('.img_m').delay(1000).stop().animate({right: '-10%',opacity: 1},function(){
                            $(this).css('opacity',0).next().stop().animate({opacity: 1},'easeInOutQuint');
                        });
                    })
                } else {
                    // 대상 영역을 벗어난 경우 (대상영역의 위나 아래일 경우)
                    console.log('벗어남');
                    $vanish.removeClass('on').show().next().find('.img_m, .img_b').stop(true, false).removeAttr('style');
                }
                isMobile = false;
            }     
        });
    });
    $(window).trigger('resize');

    // 4-1) cnt5 이벤트 페이지 - pc 버전
    const $eventLi = $('#cnt5 .event_pc li');
    
    $eventLi.eq(1).find('.event_txt').show();
    $eventLi.find('.event_img').on('click', function () {
        $(this).parent().addClass('on').siblings().removeClass('on');
    });


    // 4-1) cnt5 이벤트 - mobile버전 (아코디언)
    const $acco = $('.accordion');
    const $accoPanel = $acco.find('li .acdnPanel');
    $acco.children().attr({tabIndex: 0});

    $acco.children().on('click focus', function () {
        if ($(this).hasClass('on')) {
            $(this).removeClass('on').find('.acdnHeader').show().next().stop().animate({maxHeight: 0},1000, function(){
               $(this).css('visibility','hidden');
            });
        }
        else {
            $(this).addClass('on').siblings().removeClass('on').find('.acdnPanel').stop().animate({maxHeight: 0}, 1000,function(){
                $(this).css('visibility','hidden').prev().show();
             });
            $(this).find('.acdnPanel').css('visibility','visible').stop().animate({maxHeight: 800}, 1000,function(){
                $(this).prev().hide();
            });
        }
    });	//mouseenter, focusin이벤트 종료

    $acco.find('.list1, .list6').on('keydown', function (e) {
      if ($acco.hasClass('pc')) {
        if ($(this).hasClass('list1') && (e.shiftKey && e.keyCode === 9)) out('pc');
        else if ($(this).hasClass('list6') && (!e.shiftKey && e.keyCode === 9)) out('pc');
      } else if ($acco.hasClass('m')) {
        if ($(this).hasClass('list1') && (e.shiftKey && e.keyCode === 9)) out('m');
        else if ($(this).hasClass('list6') && (!e.shiftKey && e.keyCode === 9)) out('m');
       }
    });
      
});