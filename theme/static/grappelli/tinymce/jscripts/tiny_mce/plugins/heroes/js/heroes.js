function gotoherolink(a) {
  var href = a.getAttribute('href');
  var last_pos = href.length;
  var pos = href.lastIndexOf("/", last_pos - 2);
  var name = href.substring(pos + 1, last_pos - 1).replace('_',' ');
  var smallImg = a.children[1];
  var item = {img: smallImg.getAttribute('src'), href:href, dname:name};
  strHTML = '';
  strHTML += '<a href="' + item.href + '" target="_blank">';
  strHTML += '<img src="'+item.img+'" width="29" height="16" border="0" />';
  strHTML += ' ' + item.dname;
  strHTML += '</a>';
  tinyMCEPopup.editor.execCommand('mcePasteHero', {'html':strHTML});
  tinyMCEPopup.close();
  return false;
}
