function welcome(){
	notify("welcome", "Welcome to the Potato Game!");
}

var items = ['potatoCount', 'moneyCount','marketRate','potatoSellers','potatoGetters','potatoSellers','hunger','stage'];

var specials = ['billowsFeedingMachine', 'billowsFeedingMachineTrickleDown', 'timeMachine', 'alcoholism', 'potatoFamine','potatoCoin','potatoGovernment','future', 'getRecruiters']

var timeouts = ['psTimeout','pgTimeout'];

var multipliers = {};
for (var i in items){
  multipliers[items[i]] =1.05;
}
multipliers['marketRate'] = 1.3;

var goalText = {};

goalText[0] = "You shouldn't really see this.";
goalText[1] = "You are hungry, you own a lot of fertile land, and you can make potatoes. To you, a potato is a tasty and nutritious food source. You should get and eat potatoes."
goalText[2] = "You are pretty full now, and you can make potatoes faster than you can eat them. All those extra potatoes will go to waste if you don't sell them! You should sell some potatoes, get some money for a rainy day fund or something. Potatoes to you aren't just a food source, they're your income source now."
goalText[3] = "Ok, so farming potatoes is actually pretty profitable. You have some friends who want to join in on the potato venture. You can hire them to farm potatoes with you. This will of course cost money, but the amount of money you can make off their labor is pretty great. They'd make potatoes himself, but you're the only one with any fertile land around here, and they would never want to violate your non-agression pact by illegaly using your land to not go hungry. Potatoes to you are now a ticket up! And potatoes to your workers are now their lifeblood."
goalText[4] = "Hm. You are making some pretty good money now. But you could make more. If only there was a way to make people want potatoes more! But the same amount of labor is going into the potato, so it wouldn't make sense to charge people more for the same product... unless... a friend approaches you. Their proposition: they will post up a bunch of pictures around town, put some billboards up, make people really want potatoes. Just put your friend in charge of marketing for a nominal fee, and you can boost up that market rate! Another friend offers to take care of your recruiting needs too - that should free you to do nice things, such as look at all the new cars you can buy with your new excess profits."
goalText[5] = "Wow! The money is really starting to flow in. It's just annoying that you have to feed yourself. Money can fix a lot of things, but can it really fix your basic human needs? You're more of a potato guy than you are a science guy, but you've heard some good things about technology. A researcher approaches you, a wealthy potato baron, with a bunch of really cool and reasonably priced inventions. "
goalText[6] = "Holy cow! You've built a time machine. That's... That's insane. How did you buy that. That costs so much money. Why did you even buy that? Do you really need more profit? Do you really need to sell potatoes to EVERYBODY?"
goalText[7] = "I should have known... the time machine wasn't enough for you. You needed more. You can go to the past, and you can go to the future. But you could never control the present. Well. I guess you can now. You own governments. Not any government. All governments. Some conspiracy boards had caught on to your plan of global domination, but we all didn't believe them. Well, we were wrong. Why can't all this money just be enough for you? Why can't you just be happy? Potatoes have done so much for you. They've brought you everything you ever wanted. But they've caused so much destruction. Everyone is under the thumb of big potato. There is no free will anymore. There is no democracy. There is only potato. This is too much for me. I'm going to go spend some of my PotatoCoins at the Potato Theater and watch a potato (that's what they call movies now. they call movies \"potatoes.\")"
//reset();
start();
var names = [];
$.getJSON('names.json', function(data){
	names = data;
    document.getElementById("randomName1").innerHTML = names[Math.floor(Math.random() * names.length)];
  document.getElementById("randomName2").innerHTML = names[Math.floor(Math.random() * names.length)];
    document.getElementById("randomName3").innerHTML = names[Math.floor(Math.random() * names.length)];

});
//var request = new XMLHttpRequest();
//request.open("GET", "names.json",false);
//request.send(null);t
//var names = JSON.parse(request.responseText);
//alert(names[0]);

function potatoSeller(){
  
  for(var i =0 ; i < parseInt(localStorage.getItem("potatoSellers"));i++){
		sellPotato();
	}	
  
  setTimeout('potatoSeller()',parseInt(localStorage.getItem("psTimeout")));
}

function potatoGetter(){
  for(var i =0 ; i < parseInt(localStorage.getItem("potatoGetters"));i++){
		getPotato();
	}	
  setTimeout('potatoGetter()',parseInt(localStorage.getItem("pgTimeout")));
}

  setTimeout(potatoSeller(),parseInt(localStorage.getItem("psTimeout")));
  setTimeout(potatoGetter(),parseInt(localStorage.getItem("pgTimeout")));

setInterval(function(){
           if(localStorage.getItem("getRecruiters") == 'true'){
             buy('potatoGetters');
             buy('potatoSellers');
           } 
},100);
// Hunger

var counter = 0;
setInterval(function(){
  
  if(parseInt(localStorage.getItem("hunger")) < 20){
    document.getElementById('hunger').className = 'hunger';
  }else{
    document.getElementById('hunger').className = '';
  }
  if (localStorage.getItem("billowsFeedingMachine")){
    counter = counter % 6;
    if (counter == 0){
      eatPotato();
    }
  }
  localStorage.setItem("hunger", parseInt(localStorage.getItem("hunger")) - 1);
  update();
  counter++;
  if(parseInt(localStorage.getItem("hunger")) < 0){
    gameOver();
  }
},1000)

function start(){
  
  var cost ={} ;
cost['getRecruiters'] = 1500;
cost['billowsFeedingMachine'] = 1000;
cost['billowsFeedingMachineTrickleDown'] = 5000;
cost['alcoholism'] = 10000;
cost['potatoCoin'] = 50000;
  cost['automateWorkers'] = 25000;
cost['potatoGovernment'] = 500000;
cost['timeMachine'] = 100000;
  cost['openPortal1849'] = 500000;
  cost['openPortal2500BC'] = 500000;
  cost['future'] = 100000;
  
  for (var c in cost){
    cost[c] = cost[c] * 5;
  }
  
  cost['marketRate'] = 50;
  cost['potatoSellers'] = 10;
  cost['potatoGetters'] = 10;

  
	if(!localStorage.getItem("store")){
		localStorage.setItem('store',true)
		for (var i in items){
			localStorage.setItem(items[i], 0);
		}
     for (var t in timeouts){
       localStorage.setItem(timeouts[t],100);
     }
    	localStorage.setItem('marketRate',.25);
      localStorage.setItem('hunger',100);
      var awards = new Array();
      awards.push("New game!");
      localStorage.setItem('cost', JSON.stringify(cost));
      localStorage.setItem('awards',JSON.stringify(awards));
      localStorage.setItem('stage', 1);
    localStorage.setItem('moneyType', "dollars");

		welcome();
	}
  for (var s in specials){
      if(localStorage.getItem(specials[s]) == 'true'){
            document.getElementById(specials[s]).style.display = "none";
      }
  }
  cost = JSON.parse(localStorage.getItem('cost'));
  //console.log(cost);
  // console.log(JSON.stringify(cost))

  changeStage(parseInt(localStorage.getItem('stage')));
  if(localStorage.getItem('getRecruiters')){
    specialEvent('getRecruiters');
  }
	update();
}

function update(){
	for (var i in items){
		document.getElementById(items[i]).innerHTML = localStorage.getItem(items[i]);
	}
  
  document.getElementById("moneyCount").innerHTML += " " + localStorage.getItem("moneyType");
  
  var stage = parseInt(localStorage.getItem('stage'));
  // console.log(stage);
  var money = parseInt(localStorage.getItem('moneyCount'));
  // console.log(money);
  if(stage == 1 && parseInt(localStorage.getItem('hunger')) > 200){
    award("Let's start to make money!");
    changeStage(2);
  }
  if(stage == 2 && money >= 5){
    award('Full time hustle 8)');
    changeStage(3);
  }
  if(stage == 3 && money >= 35){
      award("Let's market it up!");
    changeStage(4);
  }
  if(stage == 4 && money >= 500){
        award('Research is the future!');

    changeStage(5);
  }
  if(stage == 5 && localStorage.getItem('timeMachine') == 'true'){
    award('The future is the future!');
    changeStage(6);
  }
  if(stage == 6 && localStorage.getItem('potatoGovernment') == 'true'){
    award('There is no future or past only now.');
    changeStage(7);
  }
  
  var cost = JSON.parse(localStorage.getItem("cost"));
  
  for (var c in cost){
    //console.log(c);
    if(document.getElementById(c + 'Cost') == null){
      if(c != 'getRecruiters') console.log('error ' + c);
      continue;
    } 
    if(cost[c] == 'NaN') cost[c] = 5000000;
    document.getElementById(c + 'Cost').innerHTML = cost[c] + " " + localStorage.getItem("moneyType");
  }
  
  var awards = JSON.parse(localStorage.getItem("awards"));

  document.getElementById('awardList').innerHTML = "";
  for (var a in awards){
    document.getElementById('awardList').innerHTML += "<li>" + awards[a] + "</li>";
  }

  
}

function reset(){
	localStorage.clear();
  history.go();
}

function getPotato(){
	localStorage.setItem("potatoCount", parseInt(localStorage.getItem("potatoCount")) + 1);
	update();
}

function sellPotato(){


	if(parseInt(localStorage.getItem("potatoCount")) > 0){
		localStorage.setItem("potatoCount", parseInt(localStorage.getItem("potatoCount")) - 1);
		localStorage.setItem("moneyCount", (parseFloat(localStorage.getItem("moneyCount")) + parseFloat(localStorage.getItem("marketRate"))).toFixed(2));	
	  document.getElementById("randomName3").innerHTML = names[Math.floor(Math.random() * names.length)];

  }else{
		//alert('You are out of potatoes to sell.');
	}
	update();
}

function spendMoney (money) {
  if (parseFloat(localStorage.getItem('moneyCount')) < money) return false;
  localStorage.setItem('moneyCount', (parseFloat(localStorage.getItem('moneyCount'))-money).toFixed(2));
  return true;
}

function buy(item){
  
  var cost = JSON.parse(localStorage.getItem("cost"));
  
  //first we check if we can afford it
  if(!spendMoney(cost[item])) return;
  
    if(localStorage.getItem("automateWorkers")){
      multipliers['potatoGetters'] = 0.8;
      multipliers['potatoSellers'] = 0.8;
    }
    
  cost[item] = (Math.pow(cost[item],multipliers[item])).toFixed(2);
  if(cost[item] == 'NaN'){
    cost[item] = 5000000;
  }
  //hack to prevent some weird behavior on automation of the worker
  if(cost[item] <= .03){
    cost[item] = 1.5;
  }
  
  var multiplier = 1;
  var i = parseFloat(localStorage.getItem(item));

  if (item == 'potatoGetters') {
    var name;
    if(localStorage.getItem("automateWorkers")){
     name = parseInt(Math.random() * 1000000);
    }
      else{
        name = names[Math.floor(Math.random() * names.length)];
      }
    document.getElementById("randomName1").innerHTML = name;
  }
  
  if (item == 'potatoSellers') {
    var name;
      if(localStorage.getItem("automateWorkers")){
      name = parseInt(Math.random() * 1000000);
    }else{
      name = names[Math.floor(Math.random() * names.length)];
    }
  document.getElementById("randomName2").innerHTML = name;
  }

  if(item == 'marketRate'){
    multiplier = (parseFloat(localStorage.getItem('marketRate'))).toFixed(2);
    if (localStorage.getItem('alcoholism')){
      multiplier++;
    }
    if (localStorage.getItem('potatoCoin')){
      multiplier+= 5;
    }
  }
  
  //saving the changes
  localStorage.setItem('cost', JSON.stringify(cost));
  
  if(item == 'future'){
    localStorage.setItem('moneyCount', parseInt(localStorage.getItem('moneyCount') + parseFloat(localStorage.getItem('marketRate')) * 16000));
    if(!localStorage.getItem('future')){
      localStorage.setItem('future', true);
      award("You have traveled into the future for the first time! It would not have been possible without the thousands of potatoes you sold along the way!");
    }
  }
  
  localStorage.setItem(item,i + (1 * multiplier));

  update();
}

// function buyPotatoGetter(){
// }

// function buyPotatoSeller(){
//   var ps =  parseInt(localStorage.getItem("potatoSellers"));
// 		localStorage.setItem("potatoSellers", ps + 1);
// 	  update();
//     document.getElementById("randomName2").innerHTML = names[Math.floor(Math.random() * names.length)];
// }  

// function increaseMarketRate(){
//     var multiplier = 1;
//     if(localStorage.getItem("alcoholism")){
//       multiplier++;
//     }
// 		localStorage.setItem("marketRate", parseFloat(localStorage.getItem("marketRate")) + (.01 * multiplier));
// 	update();
// }

function eatPotato(){
  if(parseInt(localStorage.getItem("potatoCount"))> 0){
    localStorage.setItem("potatoCount", parseInt(localStorage.getItem("potatoCount")) - 1);
    localStorage.setItem("hunger", parseInt(localStorage.getItem("hunger")) + 10);
  }
    var awards = JSON.parse(localStorage.getItem("awards"));
  var KAT_AWARD = "You're a fat kapitalist kitty kat!";
  if(!awards.includes(KAT_AWARD) && parseInt(localStorage.getItem("hunger")) > 1000 ){
    award(KAT_AWARD);
  }
  update();
}

//
function specialEvent(special){
  
  var moneyCount = localStorage.getItem('moneyCount');
  
  var cost = JSON.parse(localStorage.getItem("cost"));
  if( !spendMoney(cost[special])) return;
    
  document.getElementById(special).style.display = "none";
  localStorage.setItem(special,true);

  if(special == "billowsFeedingMachine"){
    award("You have bought a man named Billows through human trafficking. He feeds you now.");
  }
  
  //The trickle down effect is amazing! It allows your workers to get more work done for the same amount of pay!
  if(special == "billowsFeedingMachineTrickleDown"){
    award("Automation is amazing! It allows your workers to get more work done for the same amount of pay, while only increasing feelings of alienation towards labor by 1000000 per-cent!");
    for (var t in timeouts){
      localStorage.setItem(timeouts[t] , parseInt(localStorage.getItem(timeouts[t]))/2);
    }
  }
  
  if (special == "alcoholism"){
    award("You have managed to get people succesfully addicted to vodka. Now people want potatoes 2x as much! You have ruined many families and have had the most profitable day in potato-income-generating history. Congratulations!")
    localStorage.setItem("marketRate", (localStorage.getItem("marketRate") * 2).toFixed(2));
  }
  
  if (special =="timeMachine"){
    award("You have a time machine now. With great power, comes great responsibility. ")
  }
  
  if(special == "getRecruiters"){
    
    if(!localStorage.getItem(special)){
       award('"The clicking part is boring, let\'s just make someone else do it!" - You, probably.');
  }
    var MESSAGE = "Turn off the recruiter";
    if( document.getElementById(special).innerHTML != MESSAGE){
      document.getElementById(special).innerHTML = MESSAGE;
      localStorage.setItem(special,true);
    }else{
            localStorage.setItem(special,false);
        document.getElementById(special).innerHTML = "Turn on the recruiter";
    }
    document.getElementById(special).style.display = "block";

    
  }
  if (special == 'potatoCoin'){
    award("Congratulations! You have launched a new centralized currency, called potatoCoin. It is backed by the potato. The potato's value has now become so much more than just food. Every person that pays for anything with PotatoCoin bolsters it's strength, and legitimizes you. There is no separation between you and the PotatoCoin.")
    localStorage.setItem("moneyType", "PotatoCoins");
  }
  
  if (special == 'potatoGovernment'){
    award("Congratulations King! You now own me. And the world. Are you satisfied? Is this enough to satisfy you? Will anything ever satsify you?")
  }
  
  if(special == 'openPortal1849'){
    award("Welcome to the Irish Potato Famine! Potatoes sell for 1000x time more now, because people don't want to starve and they'll give all of their earthly posessions and labor in order to survive! Also, opening this portal for some reason made it so Barack Obama was never president. I'm not sure how. Butterfly effect? ")
    localStorage.setItem("marketRate", (parseFloat(localStorage.getItem("marketRate") *1000)).toFixed(2));
  }
  
  if(special == 'openPortal2500BC'){
    award("You go back in time to when the potato was invented, and you trade all your fancy genetically engineered modern day potatoes for all the gold of the indigenous South American peoples.");
    localStorage.setItem("moneyCount", parseInt(localStorage.getItem('moneyCount') + 100000000));
  }
  
  if(special == 'automateWorkers'){
    award('You laid off the people who needed to work on your potato plantation (which is now about 1% of the earth) to live! Now you will be extra efficient! Congratulations!');
    // cost['potatoSellers'] *= .0001;
    
    // cost['potatoGetters'] *= .0001;
  }
  
  localStorage.setItem('cost', JSON.stringify(cost));

}

function gameOver(){
  notify('Game Over!', 'You died from hunger. The game will now start again.');
  reset();
}

function award (str){
  notify("AWARD! ", str);
  var awards = JSON.parse(localStorage.getItem("awards"));
  awards.push(str);
  localStorage.setItem("awards",JSON.stringify(awards));
}

//putting this in a notify function. Later this can be made more graphic-intensive. 
function notify(header, text){
  
  alert(header + ": "+ text);
  
}

function changeStage(stage){
  
  var all = document.getElementsByTagName("span"); 
  for (var a in all){
    if(all[a].style != null) all[a].style.display="none";
  }
  
  for(var i =0 ; i <= stage; i++){
    document.getElementById('stage' + i).style.display="block";
  }
  
  localStorage.setItem('stage', stage);
  document.getElementById("goal").innerHTML = goalText[stage];

}