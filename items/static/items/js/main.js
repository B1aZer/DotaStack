var g_rgItemData;

var itemdata;
var attributeList = [];
var props;
var test;
var attributeText = [];

var inputSelect = 'input[name="attribute"]';

function getActiveFilters() {
  var active = [];
  $('input[name="attribute"]' + ':checked').each(function () {
    active.push($(this).val());  
  });
  return active; 
}

function getValues(item) {
  var attrs = [];
  var el_attr = item['attrib'];
  var item = $('<span>' + el_attr + '</span>')
  item.find('.attribValText').each(function(i) {
    attrs.push($(this).text());
  });
  return attrs;
}

function refresh(items, filters) {
  $('div.floatItemImage').each(function () {
    var item = $(this);
    var name = item.attr('itemname');
    var attrs = getValues(items[name]);
    if (!filters.length) {
      item.removeClass('disabled');
      return;
    }
    for (var i = 0; i < filters.length; i++) {
      if ($.inArray(filters[i], attrs) < 0) {
        item.addClass('disabled');
        break;
      }
      else {
        item.removeClass('disabled');
      }
    }
  });
}

function attachEvents(items) {
  $(inputSelect).on('change', function () {
    var filters = getActiveFilters();
    refresh(items, filters);
  });
}

function HeropediaDFReceive(dataJSON) {

  if ( dataJSON['itemdata'] )
  {
    itemdata = dataJSON.itemdata;
    attachEvents(itemdata);

    g_rgItemData = dataJSON['itemdata'];
    g_bItemDataReady = true;
    if ( g_bWrapItems )
    {
      WrapIconsWithLinks( 'item' );
    }
  }
  if ( dataJSON['abilitydata'] )
  {
    g_rgAbilityData = dataJSON['abilitydata'];
    g_bAbilityDataReady = true;
    if ( g_bWrapAbilities )
    {
      WrapIconsWithLinks( 'ability' );
    }
  }
  if ( dataJSON['herodata'] )
  {
    g_rgHeroData = dataJSON['herodata'];
    g_bHeroDataReady = true;
    if ( g_bWrapHeroes )
    {
      WrapIconsWithLinks( 'hero' );
    }
  }
}

function BuildItemFullBoxHTML( iData )
{
  strHTML = '';
  strHTML += '<div id="itemTopRow">';
  if ( iData.created )
  {
    strHTML += '<div id="fullItemRecipeItems">';
    strHTML += '<div id="fullItemRecipeItemsTitle">Рецепт:</div>';

    // Determine if the components add up to the total cost of the item. If not, it requires a recipe.
    var totalPrice = iData.cost;
    $.each( iData.components, function( i, iName ) {
      totalPrice -= g_rgItemData[iName].cost;
    });

    if ( totalPrice != 0 ) {
      strHTML += '<div style="cursor:pointer" itemname=recipe" class="floatRecipeImage itemIconWithTooltip recipeComponent"><img src="http://cdn.dota2.com/apps/dota2/images/items/recipe_lg.png" width="49" height="37" border="0" /></div>';
    }

    // Now, add the rest of the components
    $.each( iData.components,
      function( i, iName )
      {
        strHTML += '<div onClick="showItemInFullBox(\''+iName+'\', 1)" style="cursor:pointer" itemname="'+iName+'" class="floatRecipeImage itemIconWithTooltip recipeComponent"><img src="http://cdn.dota2.com/apps/dota2/images/items/'+iName+'_lg.png" width="49" height="37" border="0" /></div>';
      }
    );
    strHTML += '</div>';
  }
  strHTML += '<div class="itemName quality_'+iData.qual+'">'+iData.dname+'</div>';
  strHTML += '<div class="goldIcon"><img src="http://cdn.dota2.com/apps/dota2/images/tooltips/gold.png" width="25" height="17" border="0" /></div>';
  strHTML += '<div class="goldCost">'+iData.cost+'</div>';
  strHTML += '</div>';
  strHTML += '<div class="row">';
  strHTML += '<div class="col-xs-3">';
  strHTML += '<div class="largeItemImg"><img src="http://cdn.dota2.com/apps/dota2/images/items/'+iData.img+'" width="182" height="138" border="0" /></div>';
  strHTML += '</div>';
  strHTML += '<div class="col-xs-9">';
  strHTML += '<div class="itemBoxDetails">';
  strHTML += '<div class="itemBoxHR"><img src="http://cdn.dota2.com/apps/dota2/images/heropedia/itembox_hr.png" width="646" height="1" border="0" /></div>';
  strHTML += '<div class="detailBoxCol detailBoxLore">'+iData.lore+'&nbsp;</div>';
  strHTML += '<div class="detailBoxCol detailBoxDesc">'+iData.desc+'&nbsp;</div>';
  strHTML += '<div class="detailBoxCol detailBoxAttribs">'+iData.attrib+'&nbsp;';
  if ( iData.mc || iData.cd )
  {
    strHTML += '<div class="cooldownMana">';
    if ( iData.mc )
    {
      strHTML += '<div class="mana"><img alt="Мана" title="Мана" class="manaImg" src="http://cdn.dota2.com/apps/dota2/images/tooltips/mana.png" width="22" height="22" border="0" />'+iData.mc+'</div>';
    }
    if ( iData.cd )
    {
      strHTML += '<img alt="Кулдаун" title="Кулдаун" class="cooldownImg" src="http://cdn.dota2.com/apps/dota2/images/tooltips/cooldown.png" width="22" height="22" border="0" />'+iData.cd+'<br clear="left" />';
    }
    strHTML += '<br clear="left" /></div>';
  }
  strHTML += '</div><br clear="left" /></div></div>';
  return strHTML;
}

function showItemInFullBox( itemName, bHideTooltip )
{
  if ( bHideTooltip ) // if clicking a recipe component in header box
  {
    $('#iconTooltip').hide();
  }

  iData = g_rgItemData[itemName];	
  $('#itemsHeader').html( BuildItemFullBoxHTML( iData ) );
  // setup hover handlers for components
  $('.recipeComponent').hover(
    // Mouse over
    function( e )
    {

      ShowTooltip( 'item', e.currentTarget, true );
    },
    // Mouse out
    function( e )
    {
      ShowTooltip( 'item', e.currentTarget, false );
    }
  );
  if ( iData.created )
  {
    $.each( iData.components, 
      function( i, iName )
      {
        $('#recipeitem_'+iName).hover( 
          // Mouse over
          function( e )
          {

            ShowTooltip( 'item', e.currentTarget, true );
          },
          // Mouse out
          function( e )
          {
            ShowTooltip( 'item', e.currentTarget, false );
          }
        );
      }
    );
  }

}

