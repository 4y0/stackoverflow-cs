
var pre_elements  = document.querySelectorAll('pre');
var copy_textarea = document.createElement('textarea');


//********* Text Area Defaults ************

copy_textarea.id             = 'copy_textarea';
copy_textarea.style.width    = "400px";
copy_textarea.style.height   = "auto";
copy_textarea.style.position = 'fixed';
copy_textarea.style.top      = ( ( screen.height / 2 ) - 200 ) + 'px';
copy_textarea.style.right    = ( ( screen.width / 2 ) - 200 ) + 'px';
copy_textarea.style.display  = "none";
copy_textarea.style.color    = 'white';
copy_textarea.style.outline  = 'none';
copy_textarea.style.borderRadius    = '20px';
copy_textarea.style.backgroundColor = 'rgba(0,0,0,0.75)';


//********* Text Area Defaults ************

document.body.appendChild(copy_textarea);


//********* Init Pre elements and inject buttons ************

pre_elements
	.forEach( function (pre_element, i) {

		  pre_element.setAttribute('contenteditable', true);
		  pre_element.setAttribute('id', 'code_' + i);

		  pre_element.style.outline = 'none';
		  var codepen_data          = {};
		  codepen_data.title        = document.title;
		  codepen_data.editors      = '001';
		  codepen_data.js           = pre_element.innerText.replace(/"/g, "&​quot;").replace(/'/g, "&apos;");
		  codepen_data_string       = JSON.stringify(codepen_data);

		  //Only inject buttons if pre element has enough text
		  if(pre_element.innerText.length > 50) 
		  {
			 var outerhtml = "";
			  outerhtml += 
			  [
			    '<form action="http://codepen.io/pen/define" method="POST" target="_blank">',
			    '<input type="hidden" name="data" value=\''+codepen_data_string+'\'>',
			    ' <input type="submit" value="Edit on Code Pen">',
			    '<input type="button" value="Copy code" id="copy_code_cex_btn" data-code-id="code_'+i+'">',
			    '</form>'
			  ].join(''); 
		  }
		  pre_element.outerHTML += outerhtml; 

	});

//********* Init Pre elements and inject buttons ************



document
	.addEventListener('click', function (e) { 

	  var target_id = e.target.getAttribute('id');

	  if (target_id == "copy_code_cex_btn") {

	  	 var code_id                 = e.target.getAttribute('data-code-id');
	  	 var current_pre             = document.getElementById(code_id);
	     copy_textarea.style.display = 'block';
	     copy_textarea.value         = current_pre.innerText;
	     copy_textarea.style.height  = ( copy_textarea.value.split('\n').length * 15 ) + 5 + "px"; //Auto-resize height to fit
	     copy_textarea.style.top     = current_pre.getBoundingClientRect().top + 'px';
	     copy_textarea.style.right   = ( current_pre.getBoundingClientRect().right - 210 ) + 'px';
	     copy_textarea.select();
	     document.execCommand('copy'); 

	  }
	  else if (target_id != "copy_textarea") {

	  	document.getElementById('copy_textarea').style.display = 'none';

	  } 
	  
	});