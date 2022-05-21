function opentab(evt, namee) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(namee).style.display = "block";
  evt.currentTarget.className += " active";
}
function openbetab(evt, tabname) {
  var i, betab_content, betablink;
  betab_content = document.getElementsByClassName("betab_content");
  for (i = 0; i < betab_content.length; i++) {
    betab_content[i].style.display = "none";
  }
  betablink = document.getElementsByClassName("betablink");
  for (i = 0; i < betablink.length; i++) {
    betablink[i].className = betablink[i].className.replace(" active", "");
  }
  document.getElementById(tabname).style.display = "block";
  evt.currentTarget.className += " active";
}
function openpatab(evt, pabname) {
  var i, patab_content, patablink;
  patab_content = document.getElementsByClassName("patab_content");
  for (i = 0; i < patab_content.length; i++) {
    patab_content[i].style.display = "none";
  }
  patablink = document.getElementsByClassName("patablink");
  for (i = 0; i < patablink.length; i++) {
    patablink[i].className = patablink[i].className.replace(" active", "");
  }
  document.getElementById(pabname).style.display = "block";
  evt.currentTarget.className += " active";
}