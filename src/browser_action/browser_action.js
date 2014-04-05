Firebase.enableLogging(true);
var f = new Firebase('https://use-your-own.firebaseio-demo.com/');
// get a demo url here 'https://www.firebase.com/tutorial/#tutorial/basic/1'
// copy that url into the above field
// you can visit the url to see the database in Forge
// be beware there are no security rules for this new demo database

var chat = f.child('chat')
now = Date.now()

window.onload = function() {
	document.getElementById("button").onkeydown = function(e) {
		console.log(e.keyCode)
	}
	document.getElementById("button").onclick = function() {
		var box = document.getElementById('inputMsg')
		var box_value = box.value
		box.value = ''
		box.focus();

		var name = document.getElementById('inputName')
		var name_value = name.value
		name.className ='noInput'

		var name_label = document.getElementById("nameLabel");
		if(name_label.parentNode) {
			name_label.parentNode.removeChild(name_label);
		}
		
		chat.push({
			name: name_value,
			message: box_value,
			created: now
		}) 
	}
	chat.on('child_added', function (snap) {
		var parent = document.getElementById('contents');
		var msgs = snap.val();
		var chatmsg = document.createElement('p');
		chatmsg.appendChild(document.createTextNode(msgs.name + ": " + msgs.message));
		//document.getElementById('contents').appendChild(chatmsg);
		//parent.appendChild(chatmsg);
		parent.insertBefore(chatmsg, parent.firstChild);
		//document.getElementById('contents').innerHTML = msgs.created;
	})
}