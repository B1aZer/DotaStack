var itemdata;

function HeropediaDFReceive(dataJSON) {

  if ( dataJSON['itemdata'] )
  {
    itemdata = dataJSON.itemdata;
  }
}

showItemInFullBox = function (item) {
  var item = itemdata[item];
  console.log(item);
  strHTML = '';
  strHTML += '<a href="/items/">';
  strHTML += '<img src="http://cdn.dota2.com/apps/dota2/images/items/'+item.img+'" width="16" height="16" border="0" />';
  strHTML += ' ' + item.dname;
  strHTML += '</a>';
  tinyMCEPopup.editor.execCommand('mcePasteItem', {'html':strHTML});
  tinyMCEPopup.close();
}
