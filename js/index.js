//////////////保存本地数据函数\\\\


$(function(){

  var bendi=function(){
	localStorage.setItem("baocun",JSON.stringify(baocun))
	localStorage.setItem("fs",JSON.stringify(fs))
}
//////////////获取数据
if(localStorage.baocun){
	var baocun=JSON.parse(localStorage.baocun)
	var fs=JSON.parse(localStorage.fs)
}else{
	var baocun=[]
	var fs='all'
	bendi()
}
///////////清空函数
var qingkong=function(){
	if($('.danji').length){
		$('.button').addClass('btn')
	}else{
		$('.button').removeClass('btn')
	}
}
//////////////判断
var panduan=function(){
		if($('.danji').length===baocun.length){
			$('#qx')
			.prop('checked','true')
		}else{
			$('#qx')
			.removeProp('checked')
		}
	}
//////////////渲染页面
function xuanran(){
	$('.shuru ul').html('')
	$('.yi').addClass('yinc')
	$('.xiaz a').removeClass('dianji')
	$('.xiaz a').each(function(i,v){
		if($(v).html()===fs){
			$(v).addClass('dianji')
		}
	})
	if(baocun.length){
		var ss=baocun.length
		$('.yi').removeClass('yinc')
		if(fs==='All'){
		}else if(fs==='Active'){
			baocun=$.grep(baocun,function(v){
				return v.isd!=='checked'
			})
		}else if(fs==='Completed'){
			baocun=$.grep(baocun,function(v){
				return v.isd==='checked'
			})
		}
		$(baocun).each(function(i,v){
			$('<li>')
			.attr('dataid',v.id)
			.html('<div><input type="checkbox"'+v.isd+' class="yuan"><label>'+v.va+'</label><input type="button" value="x" class="you"></div><input class="emid" type="text"value="'+v.va+'">')
			.appendTo($('.shuru ul'))
			if(v.isd){
				$('.shuru ul li:last').addClass('danji')
			}
		})
		var sz=ss-$('.danji').length
		$('.xia span').html(sz+' items left')
		qingkong()
		panduan()	
		baocun=JSON.parse(localStorage.baocun)
	}
}
xuanran()
//////////////回车保存
$('#diyi').on('keydown',function(e){
	if(e.keyCode===13){
		console.log(1);
		if($('#diyi').val()){
			if(baocun.length){
				var id=Number(baocun[baocun.length-1].id)+1
			}else{
				var id=1
			}	
			var p={id:id,va:$('#diyi').val(),isd:''}
			baocun.push(p)
			bendi()
			xuanran()
			$('#diyi').val('')
		}
	}
})
//////////////删除
$('.shuru ul').on('click','li input:button',function(){
	var id=Number($(this).closest('li').attr('dataid'))
	baocun=$.grep(baocun,function(v){
		return v.id!==id
	})
	bendi()
	xuanran()
})
/////////////修改
$('.shuru ul').on('dblclick','li',function(e){
	$(this).addClass('shuangji')
})
////////////修改完成
$('.shuru ul').on('focusout','li .emid',function(e){
	var vaa=$(this).val()
	var id=Number($(this).parent().attr('dataid'))
	var s=$.map(baocun,function(v){
		if(v.id===id){
			v.va=vaa
		}
	})
	bendi()
	xuanran()	
})
/////////////修改状态
$('.shuru ul').on('click','li div .yuan',function(e){
	$(this).closest('li').toggleClass('danji')
	var id=Number($(this).closest('li').attr('dataid'))
	if($(this).closest('li').is('.danji')){
		$(baocun).each(function(i,v){
			if(v.id===id){
				v.isd='checked'
			}
		})
	}else{
		$(baocun).each(function(i,v){
			if(v.id===id){
				v.isd=''
			}
		})
	}
	panduan()
	bendi()
	xuanran()
})
////////////全选 
$('#qx').on('click',function(e){
	$(this).toggleClass('qx')
	if($(this).is('.qx')){
		$(this).prop('checked','true')
		$('.yuan').prop('checked','true')
		$('.li')
		.addClass('danji')
		$(baocun).each(function(i,v){
			v.isd='checked'
		})
	}else{
		$(this).removeProp('checked')
		$('.yuan').removeProp('checked')
		$('.li')
		.removeClass('danji')
		$(baocun).each(function(i,v){
			v.isd=''
		})
	}
	bendi()
	xuanran()
})
///////////全部清空
$('.button').on('click',function(e){
	$('.danji').each(function(i,v){
		var id=Number($(v).attr('dataid'))
		baocun=$.grep(baocun,function(v){
			return v.id!==id
		})
	})
	bendi()
	xuanran()	
})
///////////展开收起
$('.xiaz').on('click','li a',function(e){
	$('.xiaz a').removeClass('dianji')
	$(this).addClass('dianji')
	fs=$(this).text()
	baocun=JSON.parse(localStorage.baocun)
	localStorage.setItem("fs",JSON.stringify(fs))
	xuanran()
})

})
