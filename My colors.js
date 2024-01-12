//load the MUI plugin ui
cfg.MUI
//make the app dark themed
cfg.Dark
//start the app
function OnStart()
{
//set the theme color
color = MUI.colors.red
app.InitializeUIKit(color.red) 
//create main layout
	lay = app.CreateLayout( "Linear", "VCenter,FillXY" )
	//create tab view
   Tab = MUI.CreateTabFixed( "Select,My Colors,contacts",1,1,'VTop,FillXY')
  lay.AddChild( Tab )
   
   //get the tab layout
       var sele = Tab.GetLayout("Select")
       //add child in tab
        btn = MUI.CreateButtonRaisedO( "Select Color" )
        btn.SetOnTouch(Onbtn)
      sele.AddChild(btn)
       
      
      //YOU CAN REMOVE THIS INFO FOR YOUR PROJECTS!!
   info = app.CreateText( "This app is a free and open source writen in javascript using DROIDSCRIPT IDE  by $HotBite aka Ian$ The main reason is to work with JSON data i.e writing a json file, Reading a json file and push/adding data to a json file. USAGE: click the red button, Select the main color the select its shade at the bottom then tap the done text in the bottom-right-corner, after a dialog is shown, in the input box write the name of the color you want then press the SAVE button and SWIP/TAP the MY COLORS tab to see the list of your colors",1,0.3,"multiline" )
   sele.AddChild(info)
   info2 = MUI.CreateTextJumbo( "READ, PUSH/ADD, WRITE json data without FS-module/Node js",0.8,0.3,"multiline" )
   sele.AddChild(info2)
   info3 = MUI.CreateTextH6( "list will not be lost even when the app closes!",1,1,"multiline" )
   sele.AddChild(info3)
   var list_con = Tab.GetLayout("contacts")
   conts  = app.CreateList( "isoftuganda@gmail.com,Whatsapp__+256760824588,ianrobinson@facebook,ianwalya@youtube,hotbite@github",1,1 )
    list_con.AddChild(conts)
   //INFO ENDS HERE!!
  
    
      //create the color palette
    palet = MUI.CreateColorPicker( "Choose color" )
    //callback
    palet.SetOnSelect(Onc)
    
    //get tab view
  var co = Tab.GetLayout("My Colors")
  //create list view
     list = app.CreateList( "",1,1 )
     co.AddChild(list)
  
  //when the app starts the list will be populated with json-data
	//read the json file
	   var file = app.ReadFile( "data.json","utf8" )
	   //parse json data into javascript data
     var pr = JSON.parse(file)
     //populate list
     list.SetList( pr.colors )
	 //end of operation
	 
	 //Create Dialog(DON'T CALL THE "SHOW()" function!
	 //dialog layout
	 var dia = app.CreateLayout( "Linear","VTop,FillXY" )
	 dia.SetSize( 0.7,0.5 )
	 dia.SetBackGradient( "#2e2e22","#5e5e5e" )
	 //input view
   inp1 = MUI.CreateTextAreaFilledA( 0.6,"color name" )
   //Below this button will call the function that will push/add json
   //to json file
   save = MUI.CreateButtonContained( "save color to list" )
   save.SetOnTouch(Onsave)
   dia.AddChild( inp1 )
   dia.AddChild( save )
   //Add the abobe layout to dialog
   dialo = app.CreateDialog( "Save color" )
   dialo.AddLayout( dia )
	
	app.AddLayout( lay )
}
//this calls the color palette to showup
function Onbtn()
{
	palet.Show()
}
//this calls the dialog to show
function Onc(color)
{
var newc = color
//show dialog here
dialo.Show()
//create a template text view from which the hash code of the
//color will be got from
temp = app.CreateText( "" )
temp.SetText( color )
}
//this will push data into json file
function Onsave()
{     //get the input value
      var inp1_value = inp1.GetText()
      //read the json file
	     var f2 = app.ReadFile( "data.json","utf8" )
	     //parse the json file
     var p2 = JSON.parse(f2)
     //combine the input value and hash code of color
     var comb = inp1_value+" "+temp.GetText()
     //make one variable
     var comb2 = comb
     //pish/add data to the object
     p2.colors.push(comb2)
     //change the javascript object to json style
     var str =  JSON.stringify(p2,null,100)
     //write the json data
     app.WriteFile( "data.json",str,"utf8" )
     //list the updated values to the list
      list.SetList( p2.colors )
      //hide the dialog
      dialo.Hide()
     
}