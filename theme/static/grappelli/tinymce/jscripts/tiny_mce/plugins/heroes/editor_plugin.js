(function(){tinymce.create('tinymce.plugins.HeroesPlugin',{init:function(ed,url){var self=this;ed.addCommand('mcePasteHero',function(item){if(!item.html){return}var html=item.html;var dom=ed.dom;ed.execCommand('mceInsertContent',false,html)});ed.addCommand('mceHeroes',function(){ed.windowManager.open({file:url+'/heroes.htm',popup_css:url+'/css/heroes.css',width:550+ed.getLang('example.delta_width',0),height:220+ed.getLang('example.delta_height',0),inline:1},{plugin_url:url,some_custom_arg:'custom arg'})});ed.addButton('heroes',{title:'Insert Hero',cmd:'mceHeroes',image:url+'/hero.png'})},createControl:function(n,cm){return null},getInfo:function(){return{longname:'Heroes plugin',author:'Dmitry',authorurl:'http://dbran.me/',version:"1.0"}}});tinymce.PluginManager.add('heroes',tinymce.plugins.HeroesPlugin)})();
