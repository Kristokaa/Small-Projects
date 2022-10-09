function render(){
	right = document.getElementById("right")
	height = document.getElementById("pion").value
	width = document.getElementById("poziom").value
	right.innerHTML = ""
	for (d = 2; d < width ; d++){
		r = row();
		right.appendChild(r);
		for (b = 0; b < d; b++){
			r.appendChild(circle(5));
		}
	}
	for (a = 0; a < height; a++){
		r = row();
		right.appendChild(r);
		for (b = 0; b < width; b++){
			r.appendChild(circle(height - a - 1 - ((width -b - 1)*document.getElementById("skos").value)));
		}
	}
}

function circle(full){
	c = document.createElement('div');
	c.className = "circle"
	c.draggable= "true"
	c.style.background = document.getElementById("color").value
	c.onclick = interact
	c.ondragover = interact
	c.ondragenter = dragenter_handler
	c.ondragstart = dragstart_handler
	if (full < 0){
		c.style.background = "white"
		c.style.borderColor = "lightgray"
	}
		
	return c
}

function row(){
	r = document.createElement('div');
	r.draggable= "false"
	r.className = "row"
	r.ondragstart = dragstart_handler
	return r
}

function interact(ev){

	action =  document.querySelector('input[name="food"]:checked').value 

	if(action == "color"){
		if (event.target.style.borderColor != "lightgray"){
			event.target.style.background = document.getElementById("color").value
		}
	}
	
	else if (action == "delete"){
		event.target.style.background = "white"
		event.target.style.borderColor = "lightgray"
	}
	
	else if (action == "add"){
		if (event.target.style.borderColor == "lightgray"){
			event.target.style.background = document.getElementById("color").value
			event.target.style.borderColor = "black"
		}
	}

}

function dragstart_handler(ev){
	var img = new Image();
	img.src = 'crs.png';
	ev.dataTransfer.setDragImage(img, 10, 10);
	ev.dataTransfer.dropEffect = "copyMove";
}

function dragenter_handler(ev){
	var img = new Image();
	img.src = 'crs.png';
	ev.dataTransfer.setDragImage(img, 10, 10);
	event.dataTransfer.dropEffect = "copy";
}

function zapisz(){
	div = document.getElementById("right")
    html2canvas(div).then(function(canvas) {     
        var img = canvas.toDataURL();
        downloadURI(img, "AAA.png");
    });

}


function downloadURI(uri, name) {
    var link = document.createElement("a");

    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();   
	
}

function newcolor(){
	mem = document.getElementById("colors");
	c = document.createElement('p');
	c.className = "memory"
	c.onclick = setcolor
	c.style.background = document.getElementById("color").value
	mem.appendChild(c);
}

function setcolor(ev){
    raw = ev.target.style.background
	colr = colorP(ev.target.style.background);
	document.getElementById("color").value = colorP(ev.target.style.background);
}

function colorP(string){
	var re = new RegExp("rgb\\((\\d+) *, *(\\d+) *, *(\\d+)\\)");
	str = re.exec(string);
	return rgbToHex(str[1], str[2], str[3])
}

function componentToHex(c) {
  var hex = parseInt(c).toString(16);
  return hex.length == 1 ? "0" + hex : hex;

}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}


function newload(e) {

  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    console.log(contents)
	document.getElementById("right").innerHTML = contents
	var circles = document.getElementsByClassName("circle");
	for(let circle of circles){
		circle.onclick = interact
		circle.ondragover = interact
		circle.ondragenter = dragenter_handler
		circle.ondragstart = dragstart_handler
		
		}
	
	
	
	
	
  };
  reader.readAsText(file);
}



function save(){
	txt= document.getElementById("right").innerHTML;
	name = document.getElementById("fname").value;
	console.log(txt)
	download(name+".txt", txt)
}
function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function setup(){
	document.getElementById('file-input')
  .addEventListener('change', newload, false);
}