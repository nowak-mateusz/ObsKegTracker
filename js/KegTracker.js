 var myData = [ [,,"Non-Premium","Premium"]
		       ,[,"Common",0,0]
		       ,[,"Rare",0,0]
		       ,[,"Epic",0,0]
		       ,[,"Legendary",0,0]
		       ,[0,,,]
              ];	 
		
function updateData() {
	//d3.text("data.csv", function(data) {
	//var parsedCSV = d3.csv.parseRows(data);
	d3.select("body").select("table").remove();
				
	var table = d3.select("body")
		.append("table")
		.selectAll("tr")

		.append("tr")
		//.data(parsedCSV).enter()
		.data(myData).enter()
		.append("tr")

		.selectAll("td")
		.data(function(d) { return d; }).enter()
		.append("td")
		//.attr("align","center")
		.text(function(d) { return d; });

	d3.selectAll("td").each (
		function(d,i) {
			if(i < 20) {
				var val = d3.select(this).text();
				if(!isNaN(parseFloat(val)) && isFinite(val)) {
					d3.select(this).text("");
					for(var j = 0; j < val.length; j++) {
						d3.select(this).append("img")
							.attr("style","vertical-align:middle")
							.attr("src",function(d) {return "http://custom-gwent.com/img/number"+val[j]+".png"; })
							.attr("height", "20");
					}
				}
			}
			else if(i == 20) {
				var val = d3.select(this).text();
				d3.select(this).text("Total: ");
				for(var j = 0; j < val.length; j++) {
					if(!isNaN(parseFloat(val[j])) && isFinite(val[j])) {
						d3.select(this).append("img")
							.attr("style","vertical-align:middle")
							.attr("src",function(d) {return "http://custom-gwent.com/img/number"+val[j]+".png"; })
							.attr("height", "20");
					}
				}
			}
		}
	);	
						
	var td = d3.selectAll("td").each ( 
		function(d, i) { 
			if(i == 0) {
				d3.select(this).attr("rowspan",5)
					.append("img")
					.attr("src","img/placeholder_barrel10.png")
					.attr("style", "display: block;")
					.attr("width", "200");
					//.attr("height", "217");
			}
			else if((i<20) && ((i%4) == 0 )) {
				d3.select(this).remove();
			}
		}
	);
        //});
};
		
// KeystrokeClient events
KeystrokeClient.onConnect = function()
{
	$('#disconnect-screen').addClass('connected');
};

KeystrokeClient.onDisconnect = function()
{
	$('#disconnect-screen').removeClass('connected');
	$('.pressed').removeClass('pressed');
};

var mouse_wheel_up_timer = null;
var mouse_wheel_down_timer = null;

KeystrokeClient.onKeyDown = function(keyCode)
{
	if(KeystrokeClient.testModifierKeys(false,true,true)) // ctrl + shift
	{
		switch(keyCode)
		{
			case '31':
			{
				myData[1][3]--;
				if(myData[1][3] < 0)
					myData[1][3] = 0;
				updateData();
				break;
			}
			
			case '32':
			{
				myData[2][3]--;
				if(myData[2][3] < 0)
					myData[2][3] = 0;
				updateData();
				break;
			}
			
			case '33':
			{
				myData[3][3]--;
				if(myData[3][3] < 0)
					myData[3][3] = 0;
				updateData();
				break;
			}
			
			case '34':
			{
				myData[4][3]--;
				if(myData[4][3] < 0)
					myData[4][3] = 0;
				updateData();
				break;
			}
			
		}
	}
	else if(KeystrokeClient.testModifierKeys(false,true,false)) //ctrl
	{
		switch(keyCode)
		{
			case '31':
			{
				myData[1][2]--;
				if(myData[1][2] < 0)
					myData[1][2] = 0;
				updateData();
				break;
			}
			
			case '32':
			{
				myData[2][2]--;
				if(myData[2][2] < 0)
					myData[2][2] = 0;
				updateData();
				break;
			}
			
			case '33':
			{
				myData[3][2]--;
				if(myData[3][2] < 0)
					myData[3][2] = 0;
				updateData();
				break;
			}
			
			case '34':
			{
				myData[4][2]--;
				if(myData[4][2] < 0)
					myData[4][2] = 0;
				updateData();
				break;
			}
		}
	}
	else if(KeystrokeClient.testModifierKeys(false,false,true)) //shift
	{
		switch(keyCode)
		{
			case '31':
			{
				myData[1][3]++;
				updateData();
				break;
			}
			
			case '32':
			{
				myData[2][3]++;
				updateData();
				break;
			}
				
			case '33':
			{
				myData[3][3]++;
				updateData();
				break;
			}
			
			case '34':
			{
				myData[4][3]++;
				updateData();
				break;
			}
		}
	}
	else
	{
		switch(keyCode)
		{
			case '31':
			{
				myData[1][2]++;
				updateData();
				break;
			}
			
			case '32':
			{
				myData[2][2]++;
				updateData();
				break;
			}
			
			case '33':
			{
				myData[3][2]++;
				updateData();
				break;
			}
			
			case '34':
			{
				myData[4][2]++;
				updateData();
				break;
			}
			
			case '6b':
			{
				myData[5][0]++;
				updateData();
				break;	
			}
			
			case '6d':
			{
				myData[5][0]--;
				if(myData[5][0] < 0)
					myData[5][0] = 0;
				updateData();
				break;	
			}
		}
	}
};

KeystrokeClient.onKeyUp = function(key_code)
{
	var container = $('.key-' + key_code);
	if(container.length)
		container.removeClass('pressed');
};

window.onload = function(e)
{
	//getCustomLayout();
	updateData();
	KeystrokeClient.start(host_ip, host_port);
};