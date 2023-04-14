

export default function CanvasQR({id}) {
    var canvas = document.getElementById(id+'D');
		  var ctx = canvas.getContext("2d");
		    ctx.strokeStyle = "#2BA6CB";
		    ctx.lineWidth = 2;
		    // cuerpo
		    ctx.scale(.6, .6);
		    ctx.beginPath();
		    ctx.moveTo(8, 6);
		    ctx.lineTo(1, 6);
		    ctx.lineTo(1, 16);
		    ctx.lineTo(11, 16);
		    ctx.lineTo(11, 9);
		    //flecha
		    ctx.moveTo(5, 9);
		    ctx.lineTo(11, 3);
		    ctx.lineTo(8, 1);
		    ctx.lineTo(16, 1);
		    ctx.lineTo(16, 9);
		    ctx.lineTo(14, 6);
		    ctx.lineTo(8, 12);
		    ctx.closePath();
		    ctx.stroke();

		    var url = canvas.toDataURL();

		    document.getElementById("output").innerHTML = url;
		    document.getElementById("img").src = url;

  return (
    <div>
        <p>canvas: </p>
        <canvas width="11" height="12" id="canvas"></canvas>
        <div id="output"></div>
        <p>imagen: </p>
        <img alt="data:uri test" id="img" width="11" height="12" src="noImg"></img>
    </div>
  );
}