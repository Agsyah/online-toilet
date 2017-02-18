/************************************
*  Antri Toilet Umum Online
*  Rubi Jihantoro
*************************************/

		var mt = $('#maxtime').val()
		, 	wt = $('#whoisthere').val()
		,	li = $('.mem-store > .item:last-child').attr('id')
		, 	ni = li-1+2
		, 	mn = new Date().getMinutes()
		, 	sn = new Date().getSeconds()
		, 	sp = ''
		, 	nso= document.getElementById("notif");
		
		function mathRand () { /*
				Get Random number below user total
			*/ 	return Math.floor(Math.random() * $('.mem-store > .item').length-1+2);
		}
		function nowM() { /*
				get minutes
			*/  return new Date().getMinutes();
		}
		t=setTimeout(function(){
			nowM();
			mathRand();
		},500);

		$('.green.button').click(function () {
			$('.new-user').show();
		});
		$('.cancelantri-btn').click(function(){
			$('.new-user').hide();
		});
		$('.alert .accept').click(function(){
			$('.publicalert').hide();
		});
		$('.antri-btn').click(function () {
			if(validation(1,$('#yourname').val()) == false 
			&& validation(4,$('#yourmoney').val()) == true 
			&& validation(4,$('#yourtime').val()) == true
			&& validation(2,$('#yourmoney').val()) == true
			&& validation(2,$('#yourtime').val()) == true
			&& validation(2,$('#yourname').val()) == true)
			{ /*
				just validation - Rubi Jihantoro
			*/ 	var s = '.mem-tem > div';
				$('.new-user').hide();
				$(s).attr('id', ni);
				$(s).html($('#yourname').val());
				$(s).attr('time', $('#yourtime').val());
				$(s).attr('money', $('#yourmoney').val());
				$('#yourname, #yourtime, #yourmoney').val('');

				$('.mem-store').append($('.mem-tem').html());
				$('.list.user').append($('.mem-tem').html());
				tobot('u-list');
			}
			else { /*
					fail in validation, show alert ! - Rubi Jihantoro
				*/ 	$('.publicalert').show();
			}
		});
		function dynamicBAB () {
			$('.list.user > [time=""]').each(function () {/*
					remove empty user - Rubi Jihantoro
				*/ 	$(this).remove();
			});
			if($('.list.user > .active.item').length < 1)
			{
				if($('.mem-store').length < 1)
				{ /*
					make a user - Rubi Jihantoro
				*/  var son = $('.name-store > [id="'+mathRand()+'"]').html();
					$('.mem-tem > div').html(son);
					$('.mem-tem > div').attr('id', mathRand());
					$('.mem-tem > div').attr('come', nowM());
					$('.mem-tem > div').attr('time', mathRand());
					$('.mem-store').append($('.mem-tem').html());
					$('.list.user').html($('.mem-store').html());
					$('.list.user > .active.item:first-child').addClass('active');
					tobot('u-list');
				}
				else{/* get user from member store - Rubi Jihantoro
				  */var n 	= $('.mem-store > [id="'+mathRand()+'"]').html()
					, 	i 	= $('.mem-store > [id="'+mathRand()+'"]').attr('id')
					, 	t 	= $('.mem-store > [id="'+mathRand()+'"]').attr('time')
					,	m 	= $('.mem-store > [id="'+mathRand()+'"]').attr('money');

					$('.mem-tem > div').html(n);
					$('.mem-tem > div').attr('id', i);
					$('.mem-tem > div').attr('come', nowM());
					$('.mem-tem > div').attr('time', t);
					$('.mem-tem > div').attr('money', m);

					$('.list.user').html($('.mem-tem').html());
					$('.list.user > .item:first-child').addClass('active');
					tobot('u-list');
				}
			}
			else
			{
				var wc = $('.list.user > .active.item').attr('come')
				,	nm = $('.list.user > .active.item').attr('time')
				, 	fr = nm-1+1
				, 	fn = wc-1+1
				, 	nn = fr+fn;

				if(nowM() > nn || nowM() == nn)
				{ /*
					if(min now == estimated user time) == remove user / selesai BAB - Rubi Jihantoro
				*/  var ym = $('.list.user > .active.item').attr('money')
					, 	yi = $('.list.user > .active.item').attr('id')
					, 	nm = ym-$('#price').val()
					, 	ni = $('.ti2 > x').html()-1
					, 	fs = ni+1+nm
					, 	nn = $('.list.user > .active.item').html();
					$('.ti2 > x').html(fs);
					$('.ti1 > x').html($('#price').val());
					$('.ti2 > x').html($('#price').val());

			        var unique_id = $.gritter.add({

			            title: 'Pemberitahuan!',

			            text: nn+' Telah selesai buang air besar, Kini saldo yang dimiliki nya tersisa Rp.'+nm,

			            image: 'img/rubi.jpg',

			            sticky: true,

			            time: '',

			            class_name: 'my-sticky-class'
			        });
			         setTimeout(function(){
			         $.gritter.remove(unique_id, {
			         fade: true,
			         speed: 'slow'
			         });
			         }, 8000);
			         nso.play(); // play sound - Rubi Jihantoro
					$('.mem-store > [id="'+yi+'"]').attr('money', nm);
					$('.list.user > .active.item').remove();
					$('.list.user > .item:first-child').attr('come', nowM());
					$('.list.user > .item:first-child').addClass('active');
				}
			}
			$('.ti1 > x').html($('#price').val());
		}
		function tobot (i) { // auto scroll ke bawah
			var s = document.getElementById(i);
			s.scrollTop = s.scrollHeight; 
		}
		function validation (i,v,w) {
			if(i == 1){ // Alphabet And Space Only | IF return false == do your magic - Rubi Jihantoro
				var patt = /[^a-z\s^A-Z]/;
				return patt.test(v); 
			}
			else if(i == 2){ // is empty? Double Validation - Rubi Jihantoro
				return !(v === undefined || '' === v || $.isArray(v) && v.length === 0);
			}
			else if(i == 3){ // minimal length | w == you minimal length - Rubi Jihantoro
			    return (v !== undefined)
			       ? (v.length >= w)
			       : false
			      ;
			}
			else if(i == 4){ //number only - Rubi Jihantoro
				var patt = /^\-?\d*(\.\d+)?$/;
				return patt.test(v);
			}
		}
		setInterval(function(){
			dynamicBAB(); //set interval untuk function dynamicBAB() - Rubi Jihantoro
		}, 400);