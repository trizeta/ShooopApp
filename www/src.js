/**
* Variabili globali di utenza
*/
user = null;
debug = false;
url = "http://app.sh1.it/messaging/rest/";
//url = "http://192.168.30.121:8080/messaging/rest/";
urlregister = "http://www.shooopapp.com/attivazione";

//Variabile per la nuova pubblicazone
pubblicazione = null;

//Variabile per il messaggio
message = null;
dlg = null;

//Varabile per showcase
showcase = null;

//Variabile per l'evento
evento = null;

//Variabile per punteggio
punti = null;

//Filtro id
actualfilterid = null;


/* Configurazione Iniziale */
var dojoConfig={
    baseUrl: "",
    tlmSiblingOfDojo: false,
    isDebug: false, 
    packages: [
        { name: "dojo", location: "script/dojo" },
        { name: "dijit", location: "script/dijit" },
        { name: "dojox", location: "script/dojox" },
        { name: "dojo._base", location: "script/dojo/base" },
    ]
};

require([
    "dojo/ready",
    "dojo/_base/window",
    "dojo/dom-construct",
	"dojo/store/Memory",
	"dojo/store/Observable",
	"dijit/registry",
	"dojo/on",
	"dojo/dom",
	"dojox/mobile/ProgressIndicator",
	"dojo/date/stamp",
	"dojo/date/locale",
	"dojo/dom-style",
    "dojox/mobile/ListItem",
    "dojo/_base/array",
    "dojo/_base/connect",
    "dojo/dom-class",
    "dojox/mobile/ToolBarButton",
    "dojox/mobile/IconItem",
    "dojox/mobile/SimpleDialog",
    "dojox/mobile/Button",
    "dojox/mobile/SwapView",
    "dojox/mobile/CarouselItem",
    "dojox/mobile/Icon",
    "dojox/mobile/PageIndicator",
    "dojo/request", 
    "dojo/json",
    "dojox/mobile/CheckBox",
    "dojo/dom-geometry",
    "dojo/query",
    "dojox/mobile/SpinWheelDatePicker",
    "dojo/_base/Deferred",
	"dojox/mobile/parser",
	"dojox/mobile",
	"dojox/mobile/ComboBox",
	"dojox/mobile/compat",
	"dojox/mobile/ScrollableView",
	"dojox/mobile/RoundRectStoreList",
	"dojox/mobile/RoundRect",
    "dojox/mobile/Carousel",
	"dojox/mobile/TextBox",
    "dojox/uuid/generateRandomUuid",
    "dojox/mobile/ScrollablePane",    
	"dojox/mobile/TabBar",
	"dojox/mobile/ToolBarButton",
	"dojox/mobile/TextBox",
	"dojox/mobile/TextArea",
	"dojox/mobile/Switch",
	"dojox/mobile/Button",
	"dojox/mobile/EdgeToEdgeStoreList",
    "dojox/mobile/ExpandingTextArea",
    "dojox/mvc/Group",
	"dojox/mobile/EdgeToEdgeDataList",
	"dojox/mobile/FilteredListMixin",
	"dojox/mobile/RoundRect",
	"dojox/mobile/FormLayout",
	"dojox/mobile/Opener",
	"dojox/mobile/SearchBox",

    "dojox/mobile/SimpleDialog",
    "dojox/mobile/GridLayout",
    "dojox/mobile/Pane",
    "dojox/uuid/generateRandomUuid",
    "dojox/mobile/PullView",
    "dojox/mobile/IconContainer",
    "dojox/mobile/FixedView",
    "dojox/mobile/RadioButton",
    "dojox/mobile/IconMenu",
    "dojox/mobile/Badge",
    "dojox/mobile/IconMenuItem"  
	
], function(ready, win, domConstruct, Memory, Observable, registry, on, dom,ProgressIndicator,stamp,locale,domStyle,ListItem,array,connect,domClass,ToolBarButton,IconItem,SimpleDialog,Button,SwapView,CarouselItem,Icon,PageIndicator,request,json,CheckBox,domGeometry,query,SpinWheelDatePicker) {
	
		var dateformat = "dd/MM/yyyy";
        var progoffer, progmessage, progshowcase,progeventi; 
        var delItem, handler;
         
        /* Caricamento dinamico dei bottoni */
        showheadingbuttons = function(buttons){
            registry.byId("heading").destroyDescendants();
            for(i=0;i<buttons.length;i++) { 
                registry.byId("heading").addChild(new ToolBarButton(buttons[i]));             
            }

            //Controllo il bottone di filtrop 
            if(actualfilterid){
                domStyle.set('searchfilterbutton', 'visibility', 'visible');       
            }else{
                domStyle.set('searchfilterbutton', 'visibility', 'hidden');       
            }
        } 
        
          
		ready(function() {
	    	document.addEventListener("deviceready", onDeviceReady, false);   
                        
            /****************************************************************************
            *                   Definizione dei bottoni di header                       *
            *****************************************************************************/
            //Back Button
            back =  {class:"icon ion-ios7-checkmark-outline size-32", style:"float:left"};
            
            //Logout Button
            logout =  {class:"icon ion-log-out size-32", onTouchStart:logoutuser,  style:"float:left"};
            
            //Button Offer
            imageoffer =  {class:"icon ion-images size-32", moveTo:'tabImagePubblicazioni', callback:loadofferimage, style:"float:right"};
            editoffer =  {class:"icon ion-edit size-32", onTouchStart:function(){registry.byId("list").startEdit();},style:"float:right"};
            deleteofferbutton =  {class:"icon ion-trash-a size-32", onTouchStart:function(){deleteofferfunction()},style:"float:right"};
            uneditoffer =  {class:"icon ion-edit size-32", onTouchStart:function(){registry.byId("list").endEdit();},style:"float:right"};                    
            newoffer =  {class:"icon ion-ios7-plus-outline size-32", moveTo:'dettaglioPubblicazione', callback:nuovapubblicazione, style:"float:right"};
            publicoffer =  {class:"icon ion-ios7-cloud-upload-outline size-32", onClick:function(){pubblicacoffer()} , style:"float:right"};
            unpublicoffer =  {class:"icon ion-ios7-cloud-download-outline size-32", onClick:function(){unpubblicacoffer()} , style:"float:right"};
            
            editingofferimage =  {class:"icon  ion-ios7-compose-outline size-32", onClick:function(){registry.byId("imageofferContainer").startEdit()},style:"float:right"};
            uneditingofferimage =  {class:"icon  ion-ios7-compose-outline size-32", onClick:function(){registry.byId("imageofferContainer").endEdit()},style:"float:right" };
            newofferimagegallery =  {class:"icon ion-image size-32", onClick:function(){takepictureoffer(Camera.PictureSourceType.PHOTOLIBRARY)},style:"float:right"};
            newofferimagecamera =  {class:"icon ion-ios7-camera size-32", onClick:function(){takepictureoffer(Camera.PictureSourceType.CAMERA)},style:"float:right"};
              
            //Message Button
            newmessage =  {class:"icon ion-ios7-plus-outline size-32", moveTo:'dettaglioMessage', callback:nuovomessaggio, style:"float:right"};
            copymessage =  {class:"icon ion-ios7-copy-outline size-32", onClick:copiamessaggio, style:"float:right"};
            sendmessage =  {id:"sendmessageid", class:"icon ion-android-send size-32", onClick:inviamessaggio, style:"float:right"};
            editmessage =  {class:"icon ion-edit size-32", onTouchStart:function(){registry.byId("listmessage").startEdit();},style:"float:right"};
            uneditmessage =  {class:"icon ion-edit size-32", onTouchStart:function(){registry.byId("listmessage").endEdit();},style:"float:right"};
            deletemessagebutton =  {class:"icon ion-trash-a size-32", onTouchStart:function(){deletemessagefunction()},style:"float:right"};
            
            //Showcase Button
            imageshowcase =  {class:"icon ion-images size-32", moveTo:'tabImageShowcase', callback:loadshowcaseimage, style:"float:right"};
            editingshowcaseimage =  {class:"icon  ion-ios7-compose-outline size-32", onClick:function(){registry.byId("imageshowcaseContainer").startEdit()},style:"float:right"};
            uneditingshowcaseimage =  {class:"icon  ion-ios7-compose-outline size-32", onClick:function(){registry.byId("imageshowcaseContainer").endEdit()},style:"float:right"};
            newshowcaseimagegallery =  {class:"icon ion-image size-32", onClick:function(){takepictureshowcase(Camera.PictureSourceType.PHOTOLIBRARY)},style:"float:right"};
            newshowcaseimagecamera =  {class:"icon ion-ios7-camera size-32", onClick:function(){takepictureshowcase(Camera.PictureSourceType.CAMERA)},style:"float:right"};
            
            //Event Button 
            imageevent =  {class:"icon ion-images size-32", moveTo:'tabImageEventi', callback:loadeventimage, style:"float:right"};
            editevent =  {class:"icon ion-edit size-32", onTouchStart:function(){registry.byId("listeventi").startEdit();},style:"float:right"};
            uneditevent =  {class:"icon ion-edit size-32", onTouchStart:function(){registry.byId("listeventi").endEdit();},style:"float:right"};                    
            newevent =  {class:"icon ion-ios7-plus-outline size-32", moveTo:'dettaglioEvento', callback:nuovoevento, style:"float:right"};
            publicevent =  {class:"icon ion-ios7-cloud-upload-outline size-32", onClick:function(){pubblicaevento()} , style:"float:right"};
            unpublicevent =  {class:"icon ion-ios7-cloud-download-outline size-32", onClick:function(){unpubblicaevento()} , style:"float:right"};
            editingeventimage =  {class:"icon  ion-ios7-compose-outline size-32", onClick:function(){registry.byId("imageeventContainer").startEdit()},style:"float:right"};
            uneditingeventimage =  {class:"icon  ion-ios7-compose-outline size-32", onClick:function(){registry.byId("imageeventContainer").endEdit()},style:"float:right" };
            neweventimagegallery =  {class:"icon ion-image size-32", onClick:function(){takepictureevento(Camera.PictureSourceType.PHOTOLIBRARY)},style:"float:right"};
            neweventimagecamera =  {class:"icon ion-ios7-camera size-32", onClick:function(){takepictureevento(Camera.PictureSourceType.CAMERA)},style:"float:right"};   
            deleteeventbutton =  {class:"icon ion-trash-a size-32", onTouchStart:function(){deleteeventfunction()},style:"float:right"};
            
            //HomePAge Sync
            syncallbutton =  {id:"syncallbutton", class:"icon ion-loop size-32", onTouchStart:function(){syncall();} , style:"float:right"};

            //Punti Button
            salvapunti =  {class:"icon ion-images size-32",  onTouchStart:savepunti, style:"float:right"};
    
            //Immagine di test
            sync =  {class:"icon ion-ios7-refresh-empty size-32", onTouchStart:function(){syncall();},style:"float:right"};
            reset =  {class:"icon ion-alert-circled size-32", onTouchStart:function(){resettable();},style:"float:right"};   
                  
            
            //Nascondo i search
            domStyle.set('filterBoxOfferDiv', 'display', 'none');
            domStyle.set('filterBoxMessageDiv', 'display', 'none');
            domStyle.set('filterBoxCategoryDiv', 'display', 'none');
            domStyle.set('filterBoxEventoDiv', 'display', 'none');
            
            /****************************************************************************
            *   Aggiungo il controllo dei bottoni prima della transazione di apertura   *
            *****************************************************************************/                
            dojo.connect(registry.byId("ViewApplication"), "onBeforeTransitionIn", null, function(){
               domStyle.set('headinghome', 'display', 'inline');     
               showheadingbuttons([syncallbutton]);
            });

            dojo.connect(registry.byId("homepage"), "onBeforeTransitionIn", null, function(){
                domStyle.set('headinghome', 'display', 'inline');               
                showheadingbuttons([syncallbutton]);
                
                //Setto i badge
                controllsync();
                
            });    

            dojo.connect(registry.byId("homepage"), "onBeforeTransitionOut", null, function(){
                showheadingbuttons([]);
                domStyle.set('headinghome', 'display', 'none');               
            });

            dojo.connect(registry.byId("ViewLogin"), "onAfterTransitionOut", null, function(){
                showheadingbuttons([]);
            });         
            
            /***************************************** OFFERTE **************************************************/

			dojo.connect(registry.byId("tabPubblicazioni"), "onBeforeTransitionIn", null, function() {
				  actualfilterid = 'filterBoxOfferDiv';
                back.moveTo = "homepage";
                back.transitionDir = -1;
                showheadingbuttons([newoffer,back]);
                //Controllo HELP
                showhelp("OFFER");
                domStyle.set('headingoffer', 'display', 'inline');
            });
            
            dojo.connect(registry.byId("tabPubblicazioni"), "onBeforeTransitionOut", null, function() {
                domStyle.set('filterBoxOfferDiv', 'display', 'none');
                actualfilterid = null;
                domStyle.set('headingoffer', 'display', 'none');
			});
		
			dojo.connect(registry.byId("dettaglioPubblicazione"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "tabPubblicazioni";
               back.transitionDir = -1;
               showheadingbuttons([publicoffer,imageoffer,back]);                                          
               domStyle.set('headingoffer', 'display', 'inline');
			});
                            
            dojo.connect(registry.byId("dettaglioPubblicazione"), "onBeforeTransitionOut", null, function() {
                
                salvapubblicazione(function(){});
                domStyle.set('headingoffer', 'display', 'none');                
            });           
            
            dojo.connect(registry.byId("detailofferdescription"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "dettaglioPubblicazione";
               back.transitionDir = -1;
               showheadingbuttons([back]); 
                domStyle.set('headingoffer', 'display', 'inline');
               
			});
            
            dojo.connect(registry.byId("detailofferdescription"), "onAfterTransitionIn", null, function() {
                setContentEditorResize("offerhtmleditor","detailofferdescription"); 
            });

            dojo.connect(registry.byId("detailofferdescription"), "onBeforeTransitionOut", null, function() {
                //Salvo l'html della pubblicazione sulla pagina
                try{                 
                    var htmldesc = getContentEditor("offerhtmleditor");
                    registry.byId("description").set("label",htmldesc); 
                    salvapubblicazione();
                    
                }catch(e){
                    errorlog("SETTING HTML VALUE",e);
                }
                domStyle.set('headingoffer', 'display', 'none');
			});           
            
            dojo.connect(registry.byId("tabImagePubblicazioni"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "dettaglioPubblicazione";
               back.transitionDir = -1;
               showheadingbuttons([back,editingofferimage,newofferimagegallery,newofferimagecamera]);   
                domStyle.set('headingimage', 'display', 'inline');
			});

            dojo.connect(registry.byId("tabImagePubblicazioni"), "onBeforeTransitionOut", null, function() {
                domStyle.set('headingimage', 'display', 'none');
			});


            dojo.connect(registry.byId("swapviewofferimage"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "tabImagePubblicazioni";
               back.transitionDir = -1;
               showheadingbuttons([back]);               
			});


            /***************************************** MESSAGGI **************************************************/
            		
			dojo.connect(registry.byId("tabMessaggi"), "onBeforeTransitionIn", null, function() {
                actualfilterid = 'filterBoxMessageDiv'; 
                back.moveTo = "homepage";
                back.transitionDir = -1;
                showheadingbuttons([newmessage,back]); 
                showhelp("MESSAGE");
                domStyle.set('headingmessage', 'display', 'inline');
                               
          	});

            dojo.connect(registry.byId("tabMessaggi"), "onBeforeTransitionOut", null, function() {
                actualfilterid = null;
                domStyle.set('headingmessage', 'display', 'none');
            });
                
            dojo.connect(registry.byId("dettaglioMessage"), "onBeforeTransitionIn", null, function(bean) {
                back.moveTo = "tabMessaggi";
                back.transitionDir = -1;
                showheadingbuttons([back,sendmessage,copymessage]);    
                domStyle.set('headingmessage', 'display', 'inline');
               
          	});

            dojo.connect(registry.byId("dettaglioMessage"), "onAfterTransitionIn", null, function(bean) {
                setContentEditorResize("messagehtmleditor","dettaglioMessage");              
            });

                    
            dojo.connect(registry.byId("dettaglioMessage"), "onBeforeTransitionOut", null, function() {
                //Esco dal dettaglio e salvo il messaggio
                savemessage();
                domStyle.set('headingmessage', 'display', 'none');
          	});
              
            /***************************************** VETRINA **************************************************/

			dojo.connect(registry.byId("tabShowcase"), "onBeforeTransitionIn", null, function() {
                try{
                    domStyle.set('headingshowcase', 'display', 'inline');   
                    back.moveTo = "homepage";
                    back.transitionDir = -1;
                    
                    showheadingbuttons([imageshowcase,back]);
                    setContentEditorResize("showcasehtmleditor",'tabShowcase');
                    showhelp("SHOWCASE");
                }catch(e){
                    errorlog("SHOWCASE ERROR TRANSITION IN",e);
                }
			});

            dojo.connect(registry.byId("tabShowcase"), "onBeforeTransitionIn", null, function() {
                try{
                    if(showcase && showcase.description) {
                        setContentEditor("showcasehtmleditor",showcase.description);
                                               
                    }
                }catch(e){
                    errorlog("SHOWCASE ERROR TRANSITION IN",e);
                }
			});
            
            dojo.connect(registry.byId("tabShowcase"), "onBeforeTransitionOut", null, function() {
                domStyle.set('headingshowcase', 'display', 'none');
            });
            
            dojo.connect(registry.byId("tabImageShowcase"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "tabShowcase";
               back.transitionDir = -1;
               showheadingbuttons([back,editingshowcaseimage,newshowcaseimagegallery,newshowcaseimagecamera]);    
               domStyle.set('headingimage', 'display', 'inline');
			});
            
            dojo.connect(registry.byId("tabImageShowcase"), "onBeforeTransitionOut", null, function() {
                domStyle.set('headingimage', 'display', 'none');
            });

            dojo.connect(registry.byId("swapviewshowcaseimage"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "tabImageShowcase";
               back.transitionDir = -1;
               showheadingbuttons([back]);               
			});
            
            dojo.connect(registry.byId("tabShowcase"), "onBeforeTransitionOut", null, function(){
				//Salvo la vetrina
                if(showcase){
                    startLoading();
                    showcase.description = getContentEditor("showcasehtmleditor");
                    if(!showcase.id) {
                        showcase.showcase_id = getUUID(); 
                        showcase.utente_id = user.utente_id;
                        showcase.merchant_id = user.merchant_id;
                        addShowcase(showcase, function(){
                            stopLoading();
                            controllsync();
                        });
                    }else{
                        updateShowcase(showcase, function(){
                            stopLoading();
                            controllsync();
                        });
                    }    
                }
			});

            /***************************************** EVENTI **************************************************/

			dojo.connect(registry.byId("tabEventi"), "onBeforeTransitionIn", null, function() {
				//Visualizzo il Search Box                
                actualfilterid = 'filterBoxEventoDiv';   
                back.moveTo = "homepage";
                back.transitionDir = -1;
                showheadingbuttons([newevent,back]);    
                showhelp("EVENT");
                domStyle.set('headingevent', 'display', 'inline');
			});
            
            dojo.connect(registry.byId("tabEventi"), "onBeforeTransitionOut", null, function() {
                actualfilterid = null;
                  domStyle.set('headingevent', 'display', 'none');
			});
		
			dojo.connect(registry.byId("dettaglioEvento"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "tabEventi";
               back.transitionDir = -1;
               showheadingbuttons([publicevent,imageevent,back]);               
               domStyle.set('headingevent', 'display', 'inline');
			});
                        
            dojo.connect(registry.byId("dettaglioEvento"), "onBeforeTransitionOut", null, function() {
                salvaevento();
                domStyle.set('headingevent', 'display', 'none');                
            });           
            
            dojo.connect(registry.byId("detaileventdescription"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "dettaglioEvento";
               back.transitionDir = -1;
               showheadingbuttons([back]); 
               domStyle.set('headingevent', 'display', 'inline');
			});

            dojo.connect(registry.byId("detaileventdescription"), "onAfterTransitionIn", null, function() {
                setContentEditorResize("eventhtmleditor","detaileventdescription");
            });
                                
            dojo.connect(registry.byId("detaileventdescription"), "onBeforeTransitionOut", null, function() {
                //Salvo l'html della pubblicazione sulla pagina
                try{
                    var htmldesc = getContentEditor("eventhtmleditor");
                    registry.byId("description_evento").set("label",htmldesc); 
                    salvaevento();
                    
                }catch(e){
                    errorlog("SETTING HTML VALUE",e);
                }
                domStyle.set('headingevent', 'display', 'none');
			});           
            
            dojo.connect(registry.byId("tabImageEventi"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "dettaglioEvento";
               back.transitionDir = -1;
               showheadingbuttons([back,editingeventimage,neweventimagegallery,neweventimagecamera]);   
                domStyle.set('headingimage', 'display', 'inline');
			});

            dojo.connect(registry.byId("tabImageEventi"), "onBeforeTransitionOut", null, function() {
                domStyle.set('headingimage', 'display', 'none');
			});

            dojo.connect(registry.byId("swapvieweventimage"), "onBeforeTransitionIn", null, function() {
               //Distruggo i bottoni e ne creo di nuovi
               back.moveTo = "tabImageEventi";
               back.transitionDir = -1;
               showheadingbuttons([back]);               
			});

            /***************************************** PUNTI **************************************************/
			
			dojo.connect(registry.byId("tabPunti"), "onBeforeTransitionIn", null, function(){
   				showheadingbuttons([salvapunti]);                   
                domStyle.set('headingpunti', 'display', 'inline');               
			});

            dojo.connect(registry.byId("tabPunti"), "onBeforeTransitionOut", null, function(){
                domStyle.set('headingpunti', 'display', 'none');               
			});

            dojo.connect(registry.byId("detailpuntidescription"), "onBeforeTransitionIn", null, function() {
                  back.moveTo = "tabPunti";
                  back.transitionDir = -1;
                  showheadingbuttons([salvapunti]); 
                  if(punti.causale){              
                    registry.byId("eventhtmleditor").set("value",punti.causale);
                  }
                  domStyle.set('headingpunti', 'display', 'inline');  
          	});

            dojo.connect(registry.byId("detailpuntidescription"), "onBeforeTransitionOut", null, function() {
                var causale = registry.byId("eventhtmleditor").get("value");
                punti.causale =  causale;
                registry.byId("causalepunti").set("rightText",causale);                 
                domStyle.set('headingpunti', 'display', 'none');                
            });

            /***************************************** MY APP **************************************************/
			
			dojo.connect(registry.byId("tabMyApp"), "onBeforeTransitionIn", null, function(){
                back.moveTo = "homepage";
                back.transitionDir = -1;
				showheadingbuttons([reset,back]);                   
                domStyle.set('headingpreference', 'display', 'inline');               
			});

            dojo.connect(registry.byId("tabMyApp"), "onBeforeTransitionOut", null, function(){
                domStyle.set('headingpreference', 'display', 'none');               
			});

            dojo.connect(registry.byId("selectedPicker"), "onBeforeTransitionIn", null, function() {                
               actualfilterid = 'filterBoxCategoryDiv';
               back.moveTo = "dettaglioPubblicazione";
               back.transitionDir = -1;
               showheadingbuttons([back]); 
          	});

            dojo.connect(registry.byId("selectedPicker"), "onBeforeTransitionOut", null, function() {
                actualfilterid = null;
                
            });
            
            /***************************************** FINE **************************************************/

            
            /* GESTIONE EVENTI CAMPI OFFERTA */
            registry.byId("date_from").on("click",function(){
                getDateSpinner("date_from",function(newvalue){
                    pubblicazione.date_from = newvalue;
                });
			});
            
            registry.byId("date_to").on("click", function(){
                getDateSpinner("date_to",function(newvalue){
                    pubblicazione.date_to = newvalue;
                });
			});
            
            registry.byId("quantity").on("click",function(){
                getNumericSpinner("quantity",function(newvalue){
                    pubblicazione.quantity = newvalue;
                });
			});
            
            registry.byId("price").on("click", function(){
                getNumericSpinner("price",function(newvalue){
                   pubblicazione.price = newvalue;
                });
			});
            

            /* GESTIONE LISTA OFFERTE */
            var listoffer = registry.byId("list");
            connect.connect(listoffer, "onStartEdit", null, function(){
                try{
                   showheadingbuttons([newoffer,uneditoffer]);
                }catch(e){
                    errorlog("STARTEDIT - 100",e);
                }
            });
            
            connect.connect(listoffer, "onEndEdit", null, function(){
                try{
                    showheadingbuttons([newoffer,editoffer]);
                }catch(e){
                    errorlog("ENDEDIT - 100",e);
                }
            });
            
            connect.connect(listoffer, "onDeleteItem", null, function(widget){
                try {                    
                    createConfirmation("Vuoi cancellare "+widget.label+"?",
                                        function(){
                                            startLoading();
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                            deleteoffer(widget, function(){
                                               storepubblicazoni.remove(widget.id);
                                               stopLoading();
                                            });   
                                        }, 
                                        function(dlg){
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                        });                  
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
            });                
      
            /* GESTIONE DELLE IMMAGINI DELL'OFFERTA */
            var ic = registry.byId("imageofferContainer");
            connect.connect(ic, "onStartEdit", null, function(){
                try{
                   back.moveTo = "dettaglioPubblicazione";
                   back.transitionDir = -1;
                   showheadingbuttons([back,uneditingofferimage,newofferimagegallery,newofferimagecamera]);
                } catch(e) {
                    errorlog("STARTEDIT - 100",e);
                }
            });
            
            connect.connect(ic, "onEndEdit", null, function(){
                try{
                    back.moveTo = "dettaglioPubblicazione";
                    back.transitionDir = -1;
                    showheadingbuttons([back,editingofferimage,newofferimagegallery,newofferimagecamera]);
                }catch(e){
                    errorlog("ENDEDIT - 100",e);
                }
            });
                    
            connect.connect(ic, "onDeleteItem", null, function(widget){
                try{
                    //Elimino l'immagine dall'offerta
                    startLoading();
                    debuglog(widget.image_id);
                    deleteImageOffer(widget.image_id, pubblicazione, function(){
                        debuglog("IMMAGINE CANCELLATA");
                        stopLoading();
                    });                 
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
            });
            
            
            connect.connect(ic, "onMoveItem", null, function(widget, from, to){
                try{
                    startLoading();
                    moveImageOffer(widget,storepubblicazoni,pubblicazione,from,to,function(defaultimage){
                        stopLoading();                        
                    });
                }catch(e){
                    errorlog("MOVEITEM - 100",e);
                }
            });
            
            /* GESTIONE DEI MESSAGGI */
            var listmessage = registry.byId("listmessage");
            connect.connect(listmessage, "onStartEdit", null, function(){
                try{
                   showheadingbuttons([uneditmessage,newmessage]);
                }catch(e){
                    errorlog("STARTEDIT - 100",e);
                }
            });
            
            connect.connect(listmessage, "onEndEdit", null, function(){
                try{
                    showheadingbuttons([editmessage,newmessage]);                    
                }catch(e){
                    errorlog("ENDEDIT - 100",e);
                }
            });
            
            connect.connect(listmessage, "onDeleteItem", null, function(widget){
                try {                    
                    createConfirmation("Vuoi cancellare "+widget.label+"?",
                                        function(e){
                                            startLoading();
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                            deletemessage(widget, function(){
                                               storemessage.remove(widget.id);
                                               stopLoading();
                                            });   
                                        }, 
                                        function(dlg){
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                        });                  
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
            });
            
            /* GESTIONE DELLE IMMAGINI DELLA VETRINA */
            var icshowcase = registry.byId("imageshowcaseContainer");
            connect.connect(icshowcase, "onStartEdit", null, function(){
                try{
                   back.moveTo = "tabShowcase";
                   back.transitionDir = -1;
                   showheadingbuttons([back,uneditingshowcaseimage,newshowcaseimagegallery,newshowcaseimagecamera]);
                }catch(e){
                    errorlog("STARTEDIT - 100",e);
                }
            });
            
            connect.connect(icshowcase, "onEndEdit", null, function(){
                try{
                    back.moveTo = "tabShowcase";
                    back.transitionDir = -1;
                    showheadingbuttons([back,editingshowcaseimage,newshowcaseimagegallery,newshowcaseimagecamera]);
                }catch(e){
                    errorlog("ENDEDIT - 100",e);
                }
            });
                    
            connect.connect(icshowcase, "onDeleteItem", null, function(widget){
                try{
                    //Elimino l'immagine dall'offerta
                    startLoading();
                    debuglog(widget.image_id);
                    deleteImageShowcase(widget.image_id, showcase, function(){
                        debuglog("IMMAGINE CANCELLATA");
                        stopLoading();
                    });                 
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
            });
            
            connect.connect(icshowcase, "onMoveItem", null, function(widget, from, to){
                try{
                    if(showcase){
                        startLoading();
                         moveImageShowcase(widget,showcase,from,to,function(){
                            stopLoading();
                        });
                    }
                }catch(e){
                    errorlog("MOVEITEM - 100",e);
                }
            }); 

            
            /* GESTIONE LISTA EVENTI */
            var listeventi = registry.byId("listeventi");
            connect.connect(listeventi, "onStartEdit", null, function(){
                try{
                   showheadingbuttons([newevent,uneditevent]);
                }catch(e){
                    errorlog("STARTEDIT - 100",e);
                }
            });
            
            connect.connect(listeventi, "onEndEdit", null, function(){
                try{
                    showheadingbuttons([newevent,editevent]);
                }catch(e){
                    errorlog("ENDEDIT - 100",e);
                }
            });
            
            connect.connect(listeventi, "onDeleteItem", null, function(widget){
                try {                    
                    createConfirmation("Vuoi cancellare "+widget.label+"?",
                                        function(){
                                            startLoading();
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                            deleteevento(widget, function(){
                                               storeeventi.remove(widget.id);
                                               stopLoading();
                                            });   
                                        }, 
                                        function(dlg){
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                        });                  
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
            });                
      
            /* GESTIONE DELLE IMMAGINI DELL'OFFERTA */
            var icevent = registry.byId("imageeventContainer");
            connect.connect(icevent, "onStartEdit", null, function(){
                try{
                   back.moveTo = "dettaglioEvento";
                   back.transitionDir = -1;
                   showheadingbuttons([back,uneditingeventimage,neweventimagegallery,neweventimagecamera]);
                } catch(e) {
                    errorlog("STARTEDIT - 100",e);
                }
            });
            
            connect.connect(icevent, "onEndEdit", null, function(){
                try{
                    back.moveTo = "dettaglioEvento";
                    back.transitionDir = -1;
                    showheadingbuttons([back,editingeventimage,neweventimagegallery,neweventimagecamera]);
                }catch(e){
                    errorlog("ENDEDIT - 100",e);
                }
            });
                    
            connect.connect(icevent, "onDeleteItem", null, function(widget){
                try{
                    //Elimino l'immagine dall'offerta
                    startLoading();
                    debuglog(widget.image_id);
                    deleteImageEvento(widget.image_id, evento, function(){
                        debuglog("IMMAGINE CANCELLATA");
                        stopLoading();
                    });                 
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
            });
                        
            connect.connect(icevent, "onMoveItem", null, function(widget, from, to){
                try{
                    startLoading();
                    moveImageEvento(widget,storeeventi,evento,from,to,function(defaultimage){
                        stopLoading();                        
                    });
                }catch(e){
                    errorlog("MOVEITEM - 100",e);
                }
            });

            registry.byId("date_from_evento").on("click",function(){
                getDateSpinner("date_from_evento",function(newvalue){
                    evento.date_from = newvalue;
                });
			});
            
            registry.byId("date_to_evento").on("click", function(){
                getDateSpinner("date_to_evento",function(newvalue){
                    evento.date_to = newvalue;
                });
			});   

            /*  RACCOLTA PUNTI */
            registry.byId("qtypunti").on("click",function(){
                getNumericSpinner("qtypunti",function(newvalue){
                    punti.qta = newvalue;
                });
			});
            
            registry.byId("eanpunti").on("click",function(){
               //Apro il barcode scanner e recupero l'ean associato
               /*scan(
                  function (result) {
                      alert("We got a barcode\n" +
                            "Result: " + result.text + "\n" +
                            "Format: " + result.format + "\n" +
                            "Cancelled: " + result.cancelled);
                      punti.ean = result.text;
                      registry.byId("eanpunti").rightText = punti.ean;                     
                  }, 
                  function (error) {
                      errorlog("Scanning failed: " + error);
                  }
                );*/                   
			});

            try{
                //Aggiungo lo spinner
                var spin = new SpinWheelDatePicker({id:'dateSpinner', style:"margin:0 auto; width:312px"});
                dom.byId('dateSpinnerContainer').insertBefore(spin.domNode, dom.byId('dateSpinnerContainer').firstChild);
                spin.startup();
            }catch(e){}

            //TODO DA COMMENTARE PER NATIVA
            //onDeviceReady(); 
	    });
		
        function onDeviceReady() {
            
            //FIX STATUS BAR IOS
            try{
                StatusBar.overlaysWebView(false);
            }catch(e){
               //Non fa nulla 
            } 
                        
            try{
                domStyle.set('sfondo','z-index',-100);
            }catch(e){
                errorlog("ERRORE VIEW APP - 101",e);
            }
                
            try{   
               //Nascondo lo splah screen
              alert("hide!!");
              navigator.splashscreen.hide();                      
               
            } catch(e) {
               errorlog("ERRORE VIEW APP - 100",e);
            }
            
            
          
            
            var devicePlatform = "chrome";
            try{
                devicePlatform = device.platform;
            }catch(e){

            }
            
            setTimeout(function(){
                try{

                    if(devicePlatform.toLowerCase().indexOf('win')==-1){
                       tinymce.init({
                           selector:'textarea#showcasehtmleditor', 
                            statusbar: false,
                            resize: false,
                            width: "100%",
                            height: '100%',
                            autoresize: true                       
                       });                
                       tinymce.init({selector:'textarea#offerhtmleditor',
                            statusbar: false,
                            resize: false,
                            width: "100%",
                            height: '100%',
                            autoresize: true 
                       });                
                       tinymce.init({selector:'textarea#messagehtmleditor',
                            statusbar: false,
                            resize: false,
                            width: "100%",
                            height: '100%',
                            autoresize: true 
                        });                
                        tinymce.init({selector:'textarea#eventhtmleditor',
                            statusbar: false,
                            resize: false,
                            width: "100%",
                            height: '100%',
                            autoresize: true 
                        });                               
                    }
                } catch(e) {
                    errorlog("ERROR INIT TINYMCE",e);
                }  
             
                
            //Inizializzo il Database
            try {
                //Visualizzo il loading
                startLoading();
                window.shopdb.db.init(function () {
                    /* DB CARICATO */
                    /* Lancio processo di sincronizzazione con il server */  
                    //Inizializzo il valore delle variabile di default del file system
                    try{
                        path = cordova.file.dataDirectory;
                        window.resolveLocalFileSystemURL(path,function(entry){
                            var pathimages = "files";                        
                            try{
                                debuglog(entry.isDirectory+" - "+entry.fullPath);
                                entry.getDirectory(pathimages, {create:true, exclusive: false}, function(dirEntry) {
                                    window.rootimages = dirEntry;                                       
                                    debuglog("DIR CREATA:"+dirEntry.toURL());  
                                    //Effettuo login
                                    try{
                                       login(null,null);
                                    }catch(e){
                                        errorlog("ERROR SYNC",e);        
                                    }
                                }, function(e){errorlog("CREATE DIR - 101",e)});
                            }catch(e){
                                errorlog("CREATE DIR - 100",e);
                            } 
                        },function(e){errorlog("ERRORE",e)});
                    }catch(e){
                        //FIX WIN PHONE 8  
                        try{
                        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(entry){
                            var pathimages = "files";
                            try{ 
                                entry.root.getDirectory(pathimages, {create:true, exclusive: false}, function(dirEntry) {
                                        window.rootimages = dirEntry;   
                                        debuglog("DIR CREATA 2:"+dirEntry.toURL());  
                                        //Effettuo login
                                        try{
                                           login(null,null);
                                        }catch(e){
                                            errorlog("ERROR SYNC 2",e);        
                                        }
                                    }, function(e){errorlog("CREATE DIR - 201",e)}); 
                            }catch(e){
                                errorlog("ERRORE CREAZIONE DIR",e);
                            }
                        }, function(e){
                            errorlog("CREATE DIR - 102",e);
                        }); 
                        }catch(e){
                            //Non faccio nulla
                            try{
                               login(null,null);
                            }catch(e){
                                errorlog("ERROR SYNC 2",e);        
                            }
                        }
                    }                                        
                    //Sincronizzo tabella di help
                    synctable(['help'],function(){
                        //Tabelle di help sincronizzate  
                        stopLoading();
                    });
                });           
            }catch(e){
                errorlog("ERROR INIT DB",e);
            } 
            },100);
            document.addEventListener("backbutton", onBackKeyDown, false); 
        };
        


        onBackKeyDown = function(e){
           createConfirmation("Sei sicuro di uscire da Shooopapp?", 
            function(){                
               navigator.app.exitApp(); 
            }, 
            function(dlgconf){
               dlgconf.hide();
               dlgconf.destroyRecursive(false);         
            }); 
        };

        //Verifico i dati di syncronizzazione
        controllsync = function() {                                
            getCountSyncOffer(function(countobj){
                domConstruct.destroy("badgepubblicazioni");
                if(countobj && countobj>0){
                    domConstruct.create("div",{id:"badgepubblicazioni", innerHTML:"<div>"+countobj+"</div>", class:"mblBadge mblDomButtonRedBadge mblDomButton", style:"font-size: 14px; position: absolute; top: 2px; right:35%;"},registry.byId('iconmenupubblicazioni').domNode); 
                }
            });             
            
            getCountSyncMessage(function(countobj){
                domConstruct.destroy("badgemessaggi");
                if(countobj && countobj>0){
                    domConstruct.create("div",{id:"badgemessaggi", innerHTML:"<div>"+countobj+"</div>", class:"mblBadge mblDomButtonRedBadge mblDomButton", style:"font-size: 14px; position: absolute; top: 2px; right:35%;"},registry.byId('iconmenumessaggi').domNode); 
                }
            });
            
            getCountSyncEvent(function(countobj){
                domConstruct.destroy("badgeeventi");
                if(countobj && countobj>0){
                    domConstruct.create("div",{id:"badgeeventi", innerHTML:"<div>"+countobj+"</div>", class:"mblBadge mblDomButtonRedBadge mblDomButton", style:"font-size: 14px; position: absolute; top: 2px; right:35%;"},registry.byId('iconmenueventi').domNode); 
                }
            });
            
            getCountSyncShowcase(function(countobj){
                domConstruct.destroy("badgeshowcase");
                if(countobj && countobj>0){
                    domConstruct.create("div",{id:"badgeshowcase", innerHTML:"<div>"+countobj+"</div>", class:"mblBadge mblDomButtonRedBadge mblDomButton", style:"font-size: 14px; position: absolute; top: 2px; right:35%;"},registry.byId('iconmenushowcase').domNode); 
                }
            });
        };

        opensearch = function(){
            if(actualfilterid){
                var type = domStyle.get(actualfilterid, 'display');
                if(type=='none'){
                    domStyle.set(actualfilterid, 'display', 'block');
                }else{
                    domStyle.set(actualfilterid, 'display', 'none');
                }
            }        
        };

        movetohomepage = function(){
            try{
                registry.byId("homepage").show(false,false); 
                //registry.byId("ViewApplication").performTransition("homepage", -1, "slide");            
            }catch(e){
                
            }
        };

        setContentEditorResize = function(id,tabid) {
            var devicePlatform = "chrome";
            try{
                devicePlatform = device.platform;
            }catch(e){}
            
            var vieweditor = dom.byId(tabid);                
            var viewmargin = domGeometry.getMarginBox(vieweditor);
            
            var vieweheading = dom.byId("heading");
            var viewmarginheading = domGeometry.getMarginBox(vieweheading);
               
            var myheight = viewmargin.h-viewmarginheading.h-3;
            
            if(devicePlatform.toLowerCase().indexOf('win')==-1){
                //Non WIN8 
                //Recupero l'altezza disponibile                
                var nl4 = query(".mce-toolbar");
                var nl5 = query(".mce-toolbar-grp");
            
                var viewmarginh4 = domGeometry.getMarginBox(nl4[0]);
                var viewmarginh5 = domGeometry.getMarginBox(nl5[0]); 

                myheight = myheight-viewmarginh4.h-viewmarginh5.h
        
                var nl2 = query(".mce-tinymce");
                for(i=0;i<nl2.length;i++) {                
                    domStyle.set(nl2[i].id,"height","100%");
                }

                var nl3 = query(".mce-edit-area");
                for(i=0;i<nl3.length;i++) {               
                    domStyle.set(nl3[i].id,"height",myheight+"px");                
                }                 
            } else {
                //WIN 8 FIX  
                domStyle.set(id, 'height', window.innerHeight-92-109); 
            }
        };

        getContentEditor = function(id) {
            var devicePlatform = "chrome";
            try{
                devicePlatform = device.platform;
            }catch(e){
            
            }   
            
            if(devicePlatform.toLowerCase().indexOf('win')==-1){
                //Non WIN8  
                return tinymce.get(id).getContent();
            }else{
                //WIN 8 FIX
                return registry.byId(id).get("value");                
            }
        };

        setContentEditor = function(id,value){
            var devicePlatform = "chrome";
            try{
                devicePlatform = device.platform;
            }catch(e){
            
            }
            if(devicePlatform.toLowerCase().indexOf('win')==-1){
                //Non WIN8 
                 tinymce.get(id).setContent(value);
            }else{
                //WIN 8 FIX
                registry.byId(id).set("value",value); 
            }
        };

        disabledContentEditor = function(id,disabled){
            var devicePlatform = "chrome";
            try{
                devicePlatform = device.platform;
            }catch(e){
            
            }
            if(devicePlatform.toLowerCase().indexOf('win')==-1){
                //Non WIN8 
                //tinymce.get(id).getBody().setAttribute('contenteditable', !disabled);
                            
                if(disabled){
                    tinymce.get(id).hide();
                    domStyle.set(id,'display','none'); 
                    
                    dom.byId('divmessagedetail').innerHTML = getContentEditor(id);
                    domStyle.set('divmessagedetail','display','block'); 
                                
                }else{
                    dom.byId('divmessagedetail').innerHTML = '';
                    domStyle.set('divmessagedetail','display','none'); 
                    
                    domStyle.set(id,'display','block');
                    tinymce.get(id).show();                 
                }
            }else{
                //WIN 8 FIX
                registry.byId(id).set('disabled',disabled); 
            }
        };

        /* Store delle pubblicazione in modalità Observable */
        storepubblicazoni = dojo.store.Observable(new Memory({}));
        storemessage = dojo.store.Observable(new Memory({}));
        storecategory = dojo.store.Observable(new Memory({}));
        storeeventi = dojo.store.Observable(new Memory({}));
        store = dojo.store.Observable(new Memory({}));

        /**
        * Accesso all'app
        * viene passato lo userid
        * se non viene passato prendo quello di default
        */
        acessdemo = function acessdemo() {
            user = new Object();
            user.merchant_id = 'demo';
            user.utente_id = 'demo';
            //Eseguo la chiamata di ricerca
            startLoading();
            searchoffer(storepubblicazoni,function() { 
                try{
                    registry.byId('list').refresh();                            
                    stopLoading();
                }catch(e){
                    alert(e);
                }
            });
            
            //Carico i messaggi
            searchmessage(storemessage,function(){
                registry.byId('listmessage').refresh();  
            });
            
            //Carico showcase
            getShowcase(user, function(result){
                if(result && result.length>0){
                    showcase = result[0];
                }else{
                    showcase = new Object();
                    showcase.description = '';
                }
            });  
        
            //Carico le categorie
            searchcategory(storecategory,function(){
                registry.byId('listcategory').refresh();  
                stopLoading();
            });
            
            //Carico gli eventi
            searcheventi(storeeventi,function(){
               registry.byId('listeventi').refresh();  
               stopLoading();
            });
        };
        
        /**
        * Apro il menu
        */
        openmenu = function(){
            registry.byId('menu').show();
        };

        closemenu = function(){
            registry.byId('menu').hide();
        };
      
        /**
        * Metodo per update della pubblicazione
        */
        salvapubblicazione = function salvapubblicazione(callback){
            try {
                if(pubblicazione){
                    pubblicazione.title = registry.byId("title").get("value");
                    if(pubblicazione.title.length>0){
                        //startLoading();

                        if(registry.byId("prenotable").get("value")=='off'){
                            pubblicazione.prenotable = 0;
                        } else {
                            pubblicazione.prenotable = 1;
                        }

                        if(registry.byId("buyable").get("value")=='off'){
                            pubblicazione.buyable = 0;
                        }else{
                            pubblicazione.buyable = 1;
                        }                 

                        //pubblicazione.description = registry.byId("description").get("label");

                        pubblicazione.description = getContentEditor("offerhtmleditor");
                        if(pubblicazione.id) {
                            /* Recupero il servizio di update */                    
                            try{                                
                                updateoffer(pubblicazione,storepubblicazoni, function(){
                                    
                                    
                                    if(pubblicazione.state=='P' || pubblicazione.state=='M'){
                                        startLoading();
                                        //Effettuo una sincronizzazione delle offerte
                                        synctable(['offer','offer_image','image'], function() {
                                                syncimages(function(){
                                                    //Ricarico i valori
                                                    searchoffer(storepubblicazoni,function(){                            
                                                        registry.byId('list').refresh();                            
                                                        stopLoading();
                                                    });             
                                                });               
                                        });
                                    }else{
                                       if(callback){
                                           callback();
                                       }    
                                    }
                                    
                                    
                                    
                                    //stopLoading();
                                });
                            }catch(e){
                                    errorlog("SALVAPUBBLICAZIONE - 101",e);   
                            }                                      
                        } else {
                            var uuid = getUUID();
                            pubblicazione.offer_id = uuid;
                            pubblicazione.utente_id = user.utente_id;
                            pubblicazione.date_created = new Date();
                            pubblicazione.merchant_id = user.merchant_id;
                            try {
                                addoffer(pubblicazione,storepubblicazoni, function(){
                                    if(callback){
                                        callback();
                                    }
                                    //stopLoading();
                                });
                            }catch(e){
                                 errorlog("SALVAPUBBLICAZIONE - 102",e);   
                            }
                        }
                    }
                }
            }catch(e){
               errorlog("SALVAPUBBLICAZIONE - 100",e);   
            }
        };
        
        /**
        * Pubblica offerta
        */
         pubblicacoffer = function(){
            try {
                if(pubblicazione.title.length>0){
                    
                    pubblicazione.state = 'P';
                    registry.byId("dettaglioPubblicazione").performTransition("tabPubblicazioni", -1, "slide");
                    
                }
            }catch(e){
               errorlog("SALVAPUBBLICAZIONE - 100",e);   
            }
        };

        /**
        * Togli l'offerta dalla pubblicazione
        */
        unpubblicacoffer = function(){
            try {
                if(pubblicazione.title.length>0){
                    
                    pubblicazione.state = 'M';
                    registry.byId("dettaglioPubblicazione").performTransition("tabPubblicazioni", -1, "slide");
                    
                  
                }
            }catch(e){
               errorlog("SALVAPUBBLICAZIONE - 100",e);   
            }
        };
    
        /**
        *   Metodo che effettua un reset del form di pubblicazione
        */
        resetFormPubblicazione = function resetFormPubblicazone(){
            try{
                 registry.byId("title").set("value",'');
                 registry.byId("description").set('label','');
                 registry.byId("date_from").set("rightText",'');
                 registry.byId("date_to").set("rightText",'');
                 registry.byId("quantity").set("rightText",'');
                 registry.byId("price").set("rightText",'');
                 registry.byId("cat1").set("rightText",'');
                 registry.byId("buyable").set("value",'off');
                 registry.byId("prenotable").set("value",'off');
              }catch(e){
               errorlog("RESETFORMPUBBLICAZIONE - 100",e);   
            } 
        }
            
        /**
        * Metodo per la nuova pubblicazione
        *
        */
        nuovapubblicazione = function nuovapubblicazione(){
            try{
                //Reset del form       
                resetFormPubblicazione();
                
                //Inizializzo la Pubblicazione
                pubblicazione = new Object();            

                //Recupero valori di default
                //TODO DA FARE
            }catch(e){
               errorlog("NUOVAPUBBLICAZONE - 100",e);   
            }        
        };
    		
		/**
		 * Gestione del dettaglio della pubblicazione
		 * Caricamento del dettaglio dallo store
		 * 
		 * */
		setDetailPubblicazione = function setDetailPubblicazione(bean) {
            try{
                pubblicazione = bean;                               
                back.moveTo = "tabPubblicazioni";
                back.transitionDir = -1;               
                
                if(pubblicazione && pubblicazione.state != 'P'){                
                    showheadingbuttons([publicoffer,imageoffer,deleteofferbutton,back]);   
                }else{
                    showheadingbuttons([unpublicoffer,imageoffer,back]);   
                }
                
                resetFormPubblicazione();
                registry.byId("title").set("value",bean.title);
                if(bean.description){registry.byId("description").set("label",bean.description);}                
                if(bean.date_from){registry.byId("date_from").set("rightText",locale.format(bean.date_from,{selector: "date", formatLength: "short", datePattern:dateformat}));}
                if(bean.date_to){registry.byId("date_to").set("rightText",locale.format(bean.date_to,{selector: "date", formatLength: "short", datePattern:dateformat}));}
                if(bean.quantity){registry.byId("quantity").set("rightText",(bean.quantity).toString().replace('.',','));}
                if(bean.price){registry.byId("price").set("rightText",(bean.price).toString().replace('.',','));}
                if(bean.cat_1){registry.byId("cat1").set("rightText",bean.cat_1_desc);}
                
                if(bean.buyable){
                    if(bean.buyable == 1){
                        registry.byId("buyable").set("value",'on');    
                    }else{
                        registry.byId("buyable").set("value",'off');
                    }               
                }                
                
                if(bean.prenotable){
                    if(bean.prenotable == 1){
                        registry.byId("prenotable").set("value",'on');    
                    }else{
                        registry.byId("prenotable").set("value",'off');
                    }                   
                }                
            }catch(e){
                errorlog("DETTAGLIO PUBBLICAZIONE - 100",e);                   
            }
		};  
    
        /**
        * Setto la categoria
        */
        setCategoryPubblicazione = function(bean){
            try{
                pubblicazione.cat_1 = bean.category_id;
                //Setto la visualizzazione
                registry.byId("cat1").set("rightText",bean.label);
            }catch(e){
                errolog("SETTING CATEGORIA - 100",e);
            }
        }  
    
        /*
        * Setto l'html dell'offerta
        */
        sethtmldescriptionoffer = function(){
            try{
                startLoading();                
                setContentEditor("offerhtmleditor",registry.byId("description").label);
                stopLoading(); 
            }catch(e){
                errorlog("ERROR",e);
            }            
        };

        /* Delete Offer */
        deleteofferfunction = function(){
             try {                    
                    createConfirmation("Vuoi cancellare "+pubblicazione.label+"?",
                                        function(){
                                            startLoading();
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                            deleteoffer(pubblicazione, function(){
                                               storepubblicazoni.remove(pubblicazione.id);
                                               stopLoading();
                                               pubblicazione = null;
                                               registry.byId("dettaglioPubblicazione").performTransition("tabPubblicazioni", -1, "slide");  
                                               
                                            });   
                                        }, 
                                        function(dlg){
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                        });                  
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
        
        };

        /* Delete Message */
        deletemessagefunction = function() {
             try {  
                    var labelconf = message.label
                    
                    if(labelconf.length>25){
                        labelconf = labelconf.substring(0,22)+"...";
                    }
                 
                    createConfirmation("Vuoi cancellare "+labelconf+"?",
                                        function(dlg){
                                            startLoading();
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                            deletemessage(message, function(){
                                               storemessage.remove(message.id);
                                               stopLoading();
                                               message = null;
                                               registry.byId("dettaglioMessage").performTransition("tabMessaggi", -1, "slide");  
                                               
                                            });   
                                        }, 
                                        function(dlg){
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                        });                  
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
        
        }
        
        
          /* Delete Message */
        deleteeventfunction = function() {
             try {  
                    var labelconf = evento.label;
                    
                    if(labelconf.length>25){
                        labelconf = labelconf.substring(0,22)+"...";
                    }                 
                    createConfirmation("Vuoi cancellare "+labelconf+"?",
                                        function(){
                                            startLoading();
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                            deleteevento(evento, function(){
                                               storeeventi.remove(evento.id);
                                               stopLoading();
                                               evento = null;
                                               registry.byId("dettaglioEvento").performTransition("tabEventi", -1, "slide");  
                                               
                                            });   
                                        }, 
                                        function(dlg){
                                            dlg.hide();
                                            dlg.destroyRecursive(false);
                                        });                  
                }catch(e){
                    errorlog("DELETEITEM - 100",e);
                }
        
        }

    
        /**
         * Metodo che carica le immagini del dettaglio
         * 
         */
        loadofferimage = function loadofferimage() {            
            var container = registry.byId("imageofferContainer");
            container.destroyDescendants();
            getImageOffer(pubblicazione,function(images) {
                try{
                    urlimage = "";
                    if(window.rootimages){
                        urlimage = window.rootimages.toURL();
                    }
                    for(i=0;i<images.length;i++) {
                          
                        var iconitem = new IconItem({icon:urlimage+images[i].full_path_name, offer_image_id:images[i].offer_image_id, image_id:images[i].image_id, moveTo:'swapviewofferimage', clickable:true, callback:loadswapofferimage});     
                        
                         if(images[i].predefined){                   
                            container.addChild(iconitem,0);
                         }else{
                            container.addChild(iconitem);
                         }
                    } 
                    
                    var imgs = query('.mblImageIcon');                    
                    for(y=0;y<imgs.length;y++){
                        dojo.connect(imgs[y],'error', function(){this.src = 'img/defaultimg.jpg'});
                    }
                    
                }catch(e){
                    errorlog("LOADOFFERIMAGE - 100",e);
                }
            });                
        };
            
        /*
        * Gestione del metodo di recupero dell'immagine
        */
        takepictureoffer = function(sourcetype) {
            try{
            var cameraPopoverHandle = navigator.camera.getPicture(
                        function(urlimg){
                            try{
                                var order = registry.byId("imageofferContainer").getChildren().length;
                                order = order+1;
                                addImageOffer(pubblicazione,urlimg,order,storepubblicazoni, function(urlimage,beanentry) {
                                    try{
                                        /* Aggiungo l'immagine in visualizzazone */
                                        var container = registry.byId("imageofferContainer");
                                        container.addChild(new IconItem({icon:urlimage, bean:beanentry, moveTo:'swapviewofferimage', clickable:true, callback:loadswapofferimage}));                                
                                    }catch(error){
                                        errorlog("RECUPERO CAMERA - 102",error);
                                    }
                                })  
                            }catch(error){
                                errorlog("RECUPERO CAMERA - 103",error);
                            }
                        },
                        function(error){
                            //Non recupera la camera, non faccio nulla
                            //if(error.){
                            //    errorlog("RECUPERO CAMERA - 101",error);
                            //}
                        },
                        { destinationType: Camera.DestinationType.FILE_URI,
                          sourceType: sourcetype
                        });
            }catch(e){
                errorlog("RECUPERO CAMERA - 100",e);
            }
        };
        
        /*
        * Caricamento immagini in SwapView
        *
        */
        loadswapofferimage = function(){
            //Recupero le immagini dal contenitore iconcontainer in ordine e creo lo swap
            try{
                startLoading();                
                //Rimuovo le immagini dello swap
                var swapcontainer = registry.byId("swapviewofferimage");
                swapcontainer.destroyDescendants();
                var imagecontainer = registry.byId("imageofferContainer");
                var childrenimage = imagecontainer.getChildren();
                for(i=0;i<childrenimage.length;i++){   
                    view = new SwapView();
                    view.addChild(new Icon({icon:childrenimage[i].icon}));
                    swapcontainer.addChild(view);
                }                 
                page = new PageIndicator();
                swapcontainer.addChild(page,0);
                page.startup();                            
                stopLoading();
            }catch(e){
                errorlog("LOAD SWAP VIEW - 100",e);
            }       
        };
          
        /* Funzione di pull per sincronizzare le offerte */
        onPullOffer = function(view, y, h){
          dom.byId("msg1offer").innerHTML = percent < 100 ? "Tira per aggiornare le offerte" : "Rilascia per aggiornare le offerte";
          y = y > h ? h : y;
          var percent = y / h * 100;
          var deg = -1.8 * percent + 360;
          dom.byId("iconoffer").style.webkitTransform = "rotate(" + deg + "deg)";
        };
        
        /* Funzione di Pulled per sincronizzare */
        onPulledOffer = function(view){
          if(!progoffer){
					progoffer = new ProgressIndicator({size:20, center:false});
				}
			if(progoffer.timer){ return; }
			dom.byId("iconoffer").style.display = "none";
			dom.byId("msg1offer").innerHTML = "Attendere...";
			dom.byId("progoffer").appendChild(progoffer.domNode);
			progoffer.start();
             
            //Effettuo la chiamata di sync con il master                
            synctable(['offer','offer_image','image'], function() {
                dom.byId("msg1offer").innerHTML = "Sincronizzazione Immagini...";
                 syncimages(function(){
                     registry.byId("tabPubblicazioni").slideTo({y:0}, 0.3, "ease-out");
                     progoffer.stop();
                     dom.byId("iconoffer").style.display = "inline";  
                     
                     //Ricarico i valori
                     startLoading();
                     searchoffer(storepubblicazoni,function(){                            
                         registry.byId('list').refresh();                            
                         stopLoading();
                     });             
                 });               
            });            
         };
    
    
        /* Salva il messaggio */
        savemessage = function(callback){
            try{
                if(message){
                    startLoading();
                    message.description = getContentEditor("messagehtmleditor"); 
                    if(message.id){
                        //update messaggio
                        try{
                            updatemessage(message,storemessage, function(){
                                stopLoading();
                                if(callback){
                                    callback();
                                }
                            });
                        }catch(e){
                                errorlog("SALVAPUBBLICAZIONE - 101",e);   
                        }                  
                    } else {
                        if(message.description){
                            //nuovo messaggio
                            var uuid = getUUID();
                            message.message_id = uuid;
                            message.utente_id = user.utente_id;
                            message.date_created = new Date();
                            message.merchant_id = user.merchant_id;
                            try {
                                addmessage(message,storemessage, function(){
                                    stopLoading();
                                    if(callback){
                                        callback();
                                    }
                                });
                            }catch(e){
                                 errorlog("SALVAMESSAGGIO - 102",e);   
                            }  
                        }else{
                             stopLoading();
                        }
                    }
                }
            }catch(e){
                errorlog("ERRORE SALVATAGGIO MESSAGIO - 100",e);
            }
        };   
        
        /* Setto il dettaglio del messaggio */
        setDetailMessage = function(bean){
            try{
                message = bean;
                
                if(message && message.state == 'W'){
                    back.moveTo = "tabMessaggi";
                    back.transitionDir = -1;
                    showheadingbuttons([back,sendmessage,copymessage,deletemessagebutton]);   
                }
                
                setContentEditor("messagehtmleditor",bean.description);
                if(message.state=='W'){
                    //Stato di modifica devo ancora inviare il messaggio   
                    disabledContentEditor("messagehtmleditor",false);
                } else {
                    disabledContentEditor("messagehtmleditor",true);
                    registry.byId("sendmessageid").destroyRecursive();
                }               
            }catch(e){
                errorlog("ERROR",e);
            } 
        };
                
        /**
        * Nuovo messaggio
        */
        nuovomessaggio = function(){
            try{
                //Inizializzo la Pubblicazione
                message = new Object();            
                message.description = '';               
                message.state = 'W';
                //Visualizzo il dettaglio  
                
                setContentEditor("messagehtmleditor","");
                //registry.byId("messagehtmleditor").set("value",""); 
                registry.byId("tabMessaggi").performTransition("dettaglioMessage", 1, "slide");                
            } catch(e) {
               errorlog("NUOVAPUBBLICAZONE - 100",e);   
            }        
        };
        
        /*
        * Copia del messaggio
        */
        copiamessaggio = function(){
            try{
                startLoading();
                //Setto i dati di messaggio
                var uuid = getUUID();
                message = new Object()
                message.state = 'W';                
                savemessage(function(){
                    
                    //Seleziono il messaggio copiato e risetto il dettaglio
                    setDetailMessage(message);
                                                    
                    registry.byId("listmessage").selectItem(registry.byId(message.id));
                    
                    createMessage("Copia avvenuta con successo!", function(dlgms){
                        dlgms.hide();
                        dlgms.destroyDescendants(true);
                    });
                    
                    
                });              
            }catch(e){
               errorlog("COPIA MESSAGGIO - 100",e);   
            }
        };
                
        /*
        * Invio del messaggio
        */
        inviamessaggio = function(){
            try{
                //Setto i dati di messaggio
                message.state = 'S';
                message.description = getContentEditor("messagehtmleditor");
                try {
                    updatemessage(message,storemessage, function(){
                        registry.byId("dettaglioMessage").performTransition("tabMessaggi", -1, "slide");
                        
                        //Aggungi sincronizzazione tabelle messaggi
                        startLoading();
                        //Effettuo una sincronizzazione delle offerte
                        synctable(['message'], function() {
                           //Ricarico i valori
                           searchmessage(storemessage,function(){                            
                                registry.byId('listmessage').refresh();                            
                                stopLoading();
                           });            
                        });
                    });
                }catch(e){
                     errorlog("INVIA MESSAGGIO - 102",e);   
                }                
            }catch(e){
               errorlog("INVIA MESSAGGIO - 100",e);   
            }
        };
                        
        /* Funzione di pull per sincronizzare dei messaggi */
        onPullMessage = function(view, y, h){
          dom.byId("msg1message").innerHTML = percent < 100 ? "Tira per aggiornare i messaggi" : "Rilascia per aggiornare i messaggi";
          y = y > h ? h : y;
          var percent = y / h * 100;
          var deg = -1.8 * percent + 360;
          dom.byId("iconmessage").style.webkitTransform = "rotate(" + deg + "deg)";
        };
        
        /* Funzione di Pulled per sincronizzare */
        onPulledMessage = function(view){
          if(!progmessage){
					progmessage = new ProgressIndicator({size:40, center:false});
			}
			if(progmessage.timer){ return; }
			dom.byId("iconmessage").style.display = "none";
			dom.byId("msg1message").innerHTML = "Attendere...";
            
			dom.byId("progmessage").appendChild(progmessage.domNode);
			progmessage.start();
             
            //Effettuo la chiamata di sync con il master                
            synctable(['message'], function(){
                registry.byId("tabMessaggi").slideTo({y:0}, 0.3, "ease-out");
                progmessage.stop();
                dom.byId("iconmessage").style.display = "inline";  
                
                //Ricarico i valori
                startLoading();
                searchmessage(storemessage,function(){                            
                  registry.byId('listmessage').refresh();                            
                  stopLoading();
                });
                
            });            
         };
    
        /*
        * Gestione del metodo di recupero dell'immagine per la vetrina
        */
        takepictureshowcase = function (sourcetype) {
            try{
            var cameraPopoverHandle = navigator.camera.getPicture(
                        function(urlimg){
                            try{
                                var order = registry.byId("imageshowcaseContainer").getChildren().length;
                                addImageShowcase(showcase,urlimg,order, function(urlimage,beanentry) {
                                    try{
                                        /* Aggiungo l'immagine in visualizzazone */
                                        var container = registry.byId("imageshowcaseContainer");
                                        container.addChild(new IconItem({icon:urlimage, bean:beanentry, moveTo:'swapviewshowcaseimage', clickable:true, callback:loadswapshowcaseimage}));                                
                                    }catch(error){
                                        errorlog("RECUPERO CAMERA - 102",error);
                                    }
                                })  
                            }catch(error){
                                errorlog("RECUPERO CAMERA - 103",error);
                            }
                        },
                        function(error){
                            errorlog("RECUPERO CAMERA - 101",error);
                        },
                        { destinationType: Camera.DestinationType.FILE_URI,
                          sourceType: sourcetype
                        });
            }catch(e){
                errorlog("RECUPERO CAMERA - 100",e);
            }
        };
        
        /**
         * Metodo che carica le immagini della vetrina
         * 
         */
        loadshowcaseimage = function loadofferimage() {            
            var container = registry.byId("imageshowcaseContainer");
            container.destroyDescendants();
            getImageShowcase(showcase,function(images){
                try{
                    for(i=0;i<images.length;i++) { 
                        var iconitem = new IconItem({icon:window.rootimages.toURL()+images[i].full_path_name, image_id:images[i].image_id, moveTo:'swapviewshowcaseimage', clickable:true, callback:loadswapshowcaseimage});
                        container.addChild(iconitem);
                    }
                    
                    var imgs = query('.mblImageIcon');                    
                    for(y=0;y<imgs.length;y++){
                        dojo.connect(imgs[y],'error', function(){this.src = 'img/defaultimg.jpg'});
                    }

                }catch(e){
                    errorlog("LOADSHOWCASEIMAGE - 100",e);
                }
            });                
        };
                             
        /*
        * Caricamento immagini in SwapView della vetrina
        *
        */
        loadswapshowcaseimage = function(){
            //Recupero le immagini dal contenitore iconcontainer in ordine e creo lo swap
            try{
                startLoading();                
                //Rimuovo le immagini dello swap
                var swapcontainer = registry.byId("swapviewshowcaseimage");
                swapcontainer.destroyDescendants();
                var imagecontainer = registry.byId("imageshowcaseContainer");
                var childrenimage = imagecontainer.getChildren();
                for(i=0;i<childrenimage.length;i++){   
                    view = new SwapView();
                    view.addChild(new Icon({icon:childrenimage[i].icon}));
                    swapcontainer.addChild(view);
                }                 
                page = new PageIndicator();
                swapcontainer.addChild(page,0);
                page.startup();                            
                stopLoading();
            }catch(e){
                errorlog("LOAD SWAP VIEW - 100",e);
            }       
        };  




/***************************************************************************************************
*                                           EVENTI                                                 *
****************************************************************************************************/

        /**
        * Metodo per cancellazione pubblicazione
        */
        cancellaevento = function(){
            try{
             storeeventi.remove(evento, function(){
                 try{
                    var children = registry.byId('listeventi').getChildren();
                    var arr = array.filter(children, function(w){
                        return w.selected;
                    });
                    array.forEach(arr, function(listItem){
                        registry.byId('listeventi').removeChild(listItem);
                        //Move to dettaglio
                        //TODO DA FARE
                    }); 
                }catch(e){
                    errorlog("CANCELLA EVENTO - 101",e);   
                }
             });
             }catch(e){
               errorlog("CANCELLA EVENTO - 100",e);   
            }                
        };
      
        /**
        * Metodo per update della publicazione
        */
        salvaevento = function(callback){
            try {
               if(evento){
                    evento.title = registry.byId("title_evento").get("value");
                    if(evento.title.length>0){
                        
                        evento.description = registry.byId("description_evento").get("label");
                        if(evento.id) {
                            /* Recupero il servizio di update */                    
                            try{
                                updateevento(evento,storeeventi, function(){
                                    if(evento.state=='P' || evento.state=='M'){
                                        startLoading();
                                        //Effettuo una sincronizzazione delle offerte
                                        synctable(['event','event_image','image'], function() {
                                                syncimages(function(){
                                                    //Ricarico i valori
                                                    searcheventi(storeeventi,function(){                            
                                                        registry.byId('listeventi').refresh();  
                                                        if(callback){
                                                           callback();
                                                        }
                                                        stopLoading();
                                                    });             
                                                });               
                                        });
                                    }else{
                                       if(callback){
                                           callback();
                                       }                                       
                                    }
                                });
                            }catch(e){
                                    errorlog("SALVA EVENTO - 101",e);   
                            }                                      
                        } else {
                            var uuid = getUUID();
                            evento.event_id = uuid;
                            evento.utente_id = user.utente_id;
                            evento.date_created = new Date();
                            evento.merchant_id = user.merchant_id;
                            try {
                                addevento(evento,storeeventi, function(){
                                    if(callback){
                                        callback();
                                    }                                    
                                });
                            }catch(e){
                                 errorlog("SALVA EVENTO - 102",e);   
                            }
                        }
                    }
                }
            }catch(e){
               errorlog("SALVA EVENTO - 100",e);   
            }
        };
        
        /**
        * Pubblica l'evento
        */
        pubblicaevento = function(){
            try {
                if(evento.title.length>0){
                    evento.state = 'P';
                    salvaevento(function(){
                        registry.byId("dettaglioEvento").performTransition("tabEventi", -1, "slide");
                        stopLoading();
                    });                    
                }
            }catch(e){
               errorlog("PUBBLICA EVENTO - 100",e);   
            }
        };
        
        /**
        * Togli l'evento dalla pubblicazione
        */
        unpubblicaevento = function(){
            try {
                if(evento.title.length>0){
                    evento.state = 'M';
                    salvaevento(function(){
                        registry.byId("dettaglioEvento").performTransition("tabEventi", -1, "slide");
                        stopLoading();
                    });                    
                }
            }catch(e){
               errorlog("PUBBLICA EVENTO - 100",e);   
            }
        };
        
        /**
        *   Metodo che effettua un reset del form di evento
        */
        resetFormEvento = function(){
            try{
                 registry.byId("title_evento").set("value",'');
                 registry.byId("description_evento").set('label','');
                 registry.byId("date_from_evento").set("rightText",'');
                 registry.byId("date_to_evento").set("rightText",'');                 
              }catch(e){
               errorlog("RESET FORM EVENTO - 100",e);   
            } 
        };
            
        /**
        * Metodo per il nuovo evento
        *
        */
        nuovoevento = function(){
            try{
                //Reset del form       
                resetFormEvento();
                
                //Inizializzo la Pubblicazione
                evento = new Object();            

                //Recupero valori di default
                //TODO DA FARE
            }catch(e){
               errorlog("NUOVO EVENTO - 100",e);   
            }        
        };
    		
		/**
		 * Gestione del dettaglio dell'evento
		 * Caricamento del dettaglio dallo store
		 * 
		 * */
		setDetailEvento = function(bean) {
            try{
                evento = bean;                 
                back.moveTo = "tabEventi";
                back.transitionDir = -1;                 
                if(evento && evento.state != 'P'){                
                    showheadingbuttons([publicevent,imageevent,deleteeventbutton,back]);
                }else{
                    showheadingbuttons([unpublicevent,imageevent,back]);
                }                
                resetFormEvento();
                registry.byId("title_evento").set("value",bean.title);
                if(bean.description){registry.byId("description_evento").set("label",bean.description);}                
                if(bean.date_from){registry.byId("date_from_evento").set("rightText",locale.format(bean.date_from,{selector: "date", formatLength: "short", datePattern:dateformat}));}
                if(bean.date_to){registry.byId("date_to_evento").set("rightText",locale.format(bean.date_to,{selector: "date", formatLength: "short", datePattern:dateformat}));}               
            }catch(e){
                errorlog("DETTAGLIO PUBBLICAZIONE - 100",e);                   
            }
		};  
    
        /*
        * Setto l'html dell'evento
        */
        sethtmldescriptionevento = function(){
            try{
                startLoading();
                setContentEditor("eventhtmleditor",registry.byId("description_evento").label);
                stopLoading(); 
            }catch(e){
                errorlog("ERROR",e);
            }            
        };    
    
        /**
         * Metodo che carica le immagini del dettaglio dell'evento
         * 
         */
        loadeventimage = function() {            
            var container = registry.byId("imageeventContainer");
            container.destroyDescendants();
            getImageEvent(evento,function(images) {
                try{
                    urlimage = "";
                    if(window.rootimages){
                        urlimage = window.rootimages.toURL();
                    }
                    for(i=0;i<images.length;i++) {
                                                
                         var iconitem = new IconItem({icon:urlimage+images[i].full_path_name, event_image_id:images[i].event_image_id, image_id:images[i].image_id, moveTo:'swapvieweventimage', clickable:true, callback:loadswapeventimage});
                         if(images[i].predefined){
                             container.addChild(iconitem,0);
                         }else{
                            container.addChild(iconitem);
                         }
                    } 
                    
                    var imgs = query('.mblImageIcon');                    
                    for(y=0;y<imgs.length;y++){
                        dojo.connect(imgs[y],'error', function(){this.src = 'img/defaultimg.jpg'});
                    }
                    
                    
                }catch(e){
                    errorlog("LOAD EVENT IMAGE - 100",e);
                }
            });                
        };
            
        /*
        * Gestione del metodo di recupero dell'immagine
        */
        takepictureevento = function(sourcetype) {
            try{
            var cameraPopoverHandle = navigator.camera.getPicture(
                        function(urlimg){
                            try{
                                var order = registry.byId("imageeventContainer").getChildren().length;
                                order = order+1;
                                addImageEvento(evento,urlimg,order, function(urlimage,beanentry) {
                                    try{
                                        /* Aggiungo l'immagine in visualizzazone */
                                        var container = registry.byId("imageeventContainer");
                                        container.addChild(new IconItem({icon:urlimage, bean:beanentry, moveTo:'swapvieweventimage', clickable:true, callback:loadswapeventimage}));                                
                                    }catch(error){
                                        errorlog("RECUPERO CAMERA - 102",error);
                                    }
                                });
                            }catch(error){
                                errorlog("RECUPERO CAMERA - 103",error);
                            }
                        },
                        function(error){
                            errorlog("RECUPERO CAMERA - 101",error);
                        },
                        { destinationType: Camera.DestinationType.FILE_URI,
                          sourceType: sourcetype
                        });
            }catch(e){
                errorlog("RECUPERO CAMERA - 100",e);
            }
        };
        
        /*
        * Caricamento immagini in SwapView
        *
        */
        loadswapeventimage = function(){
            //Recupero le immagini dal contenitore iconcontainer in ordine e creo lo swap
            try{
                startLoading();                
                //Rimuovo le immagini dello swap
                var swapcontainer = registry.byId("swapvieweventimage");
                swapcontainer.destroyDescendants();
                var imagecontainer = registry.byId("imageeventContainer");
                var childrenimage = imagecontainer.getChildren();
                for(i=0;i<childrenimage.length;i++){   
                    view = new SwapView();
                    view.addChild(new Icon({icon:childrenimage[i].icon}));
                    swapcontainer.addChild(view);
                }                 
                page = new PageIndicator();
                swapcontainer.addChild(page,0);
                page.startup();                            
                stopLoading();
            }catch(e){
                errorlog("LOAD SWAP VIEW - 100",e);
            }       
        };
          
        /* Funzione di pull per sincronizzare le offerte */
        onPullEventi = function(view, y, h){
          dom.byId("msg1eventi").innerHTML = percent < 100 ? "Tira per aggiornare gli eventi" : "Rilascia per aggiornare gli eventi";
          y = y > h ? h : y;
          var percent = y / h * 100;
          var deg = -1.8 * percent + 360;
          dom.byId("iconeventi").style.webkitTransform = "rotate(" + deg + "deg)";
        };
        
        /* Funzione di Pulled per sincronizzare */
        onPulledEventi = function(view){
          if(!progeventi){
					progeventi = new ProgressIndicator({size:20, center:false});
				}
			if(progeventi.timer){ return; }
			dom.byId("iconeventi").style.display = "none";
			dom.byId("msg1eventi").innerHTML = "Attendere...";
			dom.byId("progeventi").appendChild(progeventi.domNode);
			progeventi.start();
             
            //Effettuo la chiamata di sync con il master                
            synctable(['event','event_image','image'], function() {
                dom.byId("msg1eventi").innerHTML = "Sincronizzazione Immagini...";
                 syncimages(function(){
                     registry.byId("tabEventi").slideTo({y:0}, 0.3, "ease-out");
                     progoffer.stop();
                     dom.byId("iconeventi").style.display = "inline";  
                     
                     //Ricarico i valori
                     startLoading();
                     searcheventi(storeventi,function(){                            
                         registry.byId('listeventi').refresh();                            
                         stopLoading();
                     });             
                 });               
            });            
         };




/***************************************************************************************************
*                                           PUNTI                                                 *
****************************************************************************************************/

 savepunti = function(){
            startLoading();
            //nuovo messaggio
            var uuid = getUUID();
            punti.credit_id = uuid;
            punti.utente_id = user.utente_id;
            punti.date_created = new Date();
            punti.merchant_id = user.merchant_id;
            try {
                addpunti(punti, function(){
                    //Sicronizzo la tabella dei punti
                    synctable(['credit'], function(){
                        stopLoading();
                        //Messaggio punti salvati con successo e lancio notifica al cliente
                        createMessage("Punti Registrati con Successo!",function(){
                            //Chiudo e torno alla home
                            registry.byId("tabPunti").performTransition("homepage", -1, "slide");
                        });
                                                
                    });                  
                });
            }catch(e){
                errorlog("SALVA PUNTI - 102",e);   
            }                    
        };

resetpunti = function(){
        
}


/***************************************************************************************************
*                                           HELP                                                   *
****************************************************************************************************/


showhelp = function(group) {        
    //Recupero il mesaggio di help da visualizzare se esiste
    searchhelp(group,function(help){
        //Creo il popup di help
        try{
            if(help){
                helpdialog = new SimpleDialog();
                win.body().appendChild(helpdialog.domNode);
                var msgBox = domConstruct.create("div",
                                         {class: "mblSimpleDialogText",
                                          innerHTML: help.message},
                                          helpdialog.domNode);

                //Creo il check di non vsualizzazione
                var check = new CheckBox({style:"float:left"});




                var yesBtn = new Button({class: "mblSimpleDialogButton mblBlueButton", style:"float:right;width:100px", innerHTML: "OK"});
                yesBtn.connect(yesBtn.domNode, "click", function(e){

                    if(check.get("value")){
                        flaghelp(group,function(){
                            helpdialog.hide();
                            helpdialog.destroyRecursive(false);                    
                        });
                    }else{
                        helpdialog.hide();
                        helpdialog.destroyRecursive(false);
                    }
                });

                check.placeAt(helpdialog.domNode);    
                var mes = domConstruct.create("span",{innerHTML:"Non visualizzare più", class:"notviewlabel"},helpdialog.domNode);

                yesBtn.placeAt(helpdialog.domNode);    


                helpdialog.show(); 
            }
        }catch(e){
            errorlog("CREATE MESSAGE - 100",e);
        }   
    });  
};

/*****************************************************************************************************************/
        
        //sincronizzo tutte le tabelle
        syncall = function() {
            startLoading();
            try{
            synctable(['merchant','message','offer','offer_image','showcase','showcase_image','category','image','event','event_image','credit','help','help_utente'], function(){
                controllsync();
                syncimages(function(){
                    stopLoading();
                });
            });
            }catch(e){
                errorlog("Errore Sincronizzazione Dati!");
            }            
        };

        //Metodo di reset per debug
        resettable = function(){
            startLoading();
            try{                
                resettablefacade(['merchant','message','offer','offer_image','showcase','showcase_image','category','image','image_sync','event','event_image','credit','help','help_utente'], function(){
                    logoutuser();
                    stopLoading();                        
                });               
            }catch(e){
                errorlog("Errore Sincronizzazione Dati!");
            }  
        }                           
        
        /**
        * Sincronizzazione delle tabelle
        */
        synctable = function(tables,callback) {
            try{
                if(user && user.utente_id=='demo'){
                    stopLoading();
                    createMessage("In modalità demo non è possibile sincronizzare i dati!", function(dlgshow){
                        dlgshow.hide();
                        dlgshow.destroyDescendants(true);
                        
                    });
                }else{
                    //Recupero i dati da sincronizzare            
                    var copytable = new Array();
                    var synctable = new Array();
                    copytable = copytable.concat(tables);
                    setloadingvalue("Sincronizzazione dati in corso");
                    getTableDirty(tables,synctable,function(result){
                       getTableLastUpdate(copytable,result, function(){   
                            var syncbean = new Object();
                            syncbean.tables = synctable;                    
                            var datajson = json.stringify(syncbean);
                            requestpost(datajson,callback);
                        });                
                    }); 
                    
                }
            }catch(e){
                if(callback){
                    callback();                
                }
            }
        };
    
        /**
        * Metodo di chiamata alla tabella
        */
        requestpost = function(json,callback) {
            token = "demo";
            if(user){
                token = user.token;
            }
            
            var promise = request.post(url+'FacadeSync/sync',{
                handleAs: "json",
                data: json,
                headers: {
                    "X-Requested-With": null,
                    "Content-Type":"application/json",
                    "token":token
                }           
            });            
            promise.response.then(
                function(response) {
                    try{
                        //Controllo se ci sono errori
                        if(response.data.messageList.length>0){
                            
                            if(response.data.messageList[0]=="E002"){
                                //Errore Token scaduto
                                createMessage("Sessione di lavoro scaduta!", function(dlgmess){
                                    callback();
                                    dlgmess.hide();
                                    dlgmess.destroyDescendants(true);
                                    
                                    //Effettuo logout
                                    logoutuser();
                                });
                                
                            } else {
                                callback();
                            }
                            
                        }else{
                            //Aggiorno le tabelle
                            var tables = response.data.objectList;
                            syncTables(tables, callback);                           
                        }                        
                    }catch(e) {
                        stopLoading();
                        //NON FACCIO NULLA TABELLE NON SINCRONIZZATE
                        //errorlog("RESPONSE 101",e);
                        callback();
                    }
                    
                    //Parse della risposta e sincornizzazione delle tabelle locali               
                },
                function(error){
                    
                    stopLoading();
                    //errorlog("ERROR SYNC",error); 
                    callback();
                }                     
            );   
        
        };
        
		/**
		 * Metodi di gestione della ProgressBar 
		 * Visibile Durante gli accessi al DB
		 */
		startLoading = function startLoading(){
            dom.byId('loadingmessage').innerHTML = "Loading...";
            registry.byId('loading').show();
        };
		
		stopLoading = function stopLoading(){
             registry.byId('loading').hide();
        };	
		
        setloadingvalue = function(value){
            dom.byId('loadingmessage').innerHTML = value;
        }


		/**
		 *  Gestione delle date 
		 *  Metodi per la gestione delle date tramite DateSpinner
		 *  Visualizzazione nel formato della variabile 'dateformat'
		 *  
		 *  */
		setDateSpinner = function setDateSpinner() {
            try{
                date = stamp.fromISOString(registry.byId("dateSpinner").get("value"));
                registry.byId(registry.byId("datePicker").get("iddate")).set("rightText",locale.format(date,{selector: "date", formatLength: "short", datePattern:dateformat}));			  
                registry.byId("datePicker").get("callback")(date);
                registry.byId("datePicker").hide();
            }catch(e){
                errorlog("DATESPINNER - 101");
            }
            
	    };
	    	    
	    getDateSpinner = function getDateSpinner(iddate, callback) {
            try{
                registry.byId("datePicker").set("iddate",iddate);
                registry.byId("datePicker").set("callback",callback);
                try{
                    svalue = registry.byId(registry.byId("datePicker").get("iddate")).get("rightText");
                    date = locale.parse(svalue,{selector: "date", formatLength: "short", datePattern:dateformat});
                    registry.byId("dateSpinner").set("value",stamp.toISOString(date));			
                }catch(e){
                    date = new Date();
                    registry.byId("dateSpinner").set("value",stamp.toISOString(date));
                }
                registry.byId("datePicker").show();
             }catch(e){
                errorlog("DATESPINNER - 102");
            }
	    }; 
    
        /**
        * Gestione dei campi numerici
        */
    
        setNumericSpinner = function setDateSpinner() {
            try {
                value = registry.byId("numericPickerLabel").get("label")
                registry.byId(registry.byId("numericPicker").get("idnumeric")).set("rightText",value);	
                registry.byId("numericPicker").get("callback")(parseFloat(value.replace(',','.')));                
                registry.byId("numericPicker").hide();
            }catch(e){
                errorlog("SETNUMERICSPINNER - 100 ",e);
            }
            
	    };
	    	    
	    getNumericSpinner = function getDateSpinner(idnumeric,callback) {
            try {
                registry.byId("numericPicker").set("idnumeric",idnumeric);
                registry.byId("numericPicker").set("callback",callback);
                registry.byId("numericPicker").show();
                try{
                    svalue = registry.byId(registry.byId("numericPicker").get("idnumeric")).get("rightText");
                    registry.byId("numericPickerLabel").set("label",svalue);			
                }catch(e){
                  registry.byId("numericPickerLabel").set("label","");	
                }   
            }catch(e){
                errorlog("GETNUMERICSPINNER - 100 ",e);
            }
	    }; 
            
        addNumberPicker = function addNumberPicker(num){
            try {
                registry.byId("numericPickerLabel").set("label",registry.byId("numericPickerLabel").get("label")+num);
            }catch(e){
                errorlog("ADDNUMBERPICKER - 100 ",e);
            }
        };
        
        addNumericPointer = function addNumericPointer(){
            try{
                registry.byId("numericPickerLabel").set("label",registry.byId("numericPickerLabel").get("label")+",");
            }catch(e){
                errorlog("ADDNUMBERPOINTER - 100 ",e);
            }
        };
        
        cancelNumberPicker = function cancelNumberPicker() {
            try{
                registry.byId("numericPickerLabel").set("label",registry.byId("numericPickerLabel").get("label").substring(0,registry.byId("numericPickerLabel").get("label").length-1));
            }catch(e){
                //Se non esite la stinga
                //Errore gestito
            }
        };
          
        /**
        *Metodi di utilità di gestione della visualizzazione dei bottoni
        *
        */
        hidebutton = function hidebutton(namesb) {
            try{
                domStyle.set(namesb,"display","none");
            }catch(e){
                errorlog("HIDEBUTTON - 100",e);
            }
        };
    
        showbutton = function showbutton(namesb){
            try{
                domStyle.set(namesb,"display","inline-block");
            }catch(e){
                errorlog("SHOWBUTTON - 100",e);
            }
        }
        
        /**
        * Visualizzo la toolbar corrispondente
        */
        showHeadingButton = function showHeadingButton(displayname){
           try{
               
               
               var children = registry.byId('heading').getChildren();
               var arr = array.filter(children, function(w){
                   if(w.id.indexOf('heading_')==0){
                     domStyle.set(displayname,"display","none"); 
                   }
                   if(w.name = displayname){
                     return true;
                   }else{
                    return false;
                   }
                   
               });
               array.forEach(arr, function(item){
                   domStyle.set(item.id,"display","inline-block"); 
               });             
            }catch(e){
                errorlog("SHOWHEADINGBUTTON - 100",e);
            }  
        }
        
        /**
        * Funzione di utilità di gestione degli errori
        */
        errorlog = function errorlog(message, e){
            if(e && e.code){
                //alert("ERROR:"+message+" - "+e.code);
            }else{
                //alert("ERROR:"+message+" - "+e);
            }
            stopLoading();
        }
        
        
        debuglog = function(message){
            if(debug){
                alert("DEBUG:"+message);
            }
        }
        
        /*Genero UUID*/
        getUUID = function(){
            return dojox.uuid.generateRandomUuid();
        };   
        
        
        /* Creazione Alert di conferma */
        createConfirmation = function(message, callbackok, callbackko) {
            try{
        
                var dlg = new SimpleDialog();
                win.body().appendChild(dlg.domNode);
                var msgBox = domConstruct.create("div",
                                         {class: "mblSimpleDialogText",
                                          innerHTML: message},
                                          dlg.domNode);
         
                var noBtn = new Button({class: "mblSimpleDialogButton", innerHTML: "No"});
                noBtn.connect(noBtn.domNode, "click",function(e){callbackko(dlg)});
                noBtn.placeAt(dlg.domNode);

                var yesBtn = new Button({class: "mblSimpleDialogButton mblBlueButton", innerHTML: "Si"});
                yesBtn.connect(yesBtn.domNode, "click",function(e){callbackok(dlg)});
                yesBtn.placeAt(dlg.domNode);         

                dlg.show();  
            }catch(e){
                errorlog("CREATE CONFIRMATION - 100",e);
            }                
        };
        
        /* Creazione messaggio di Avviso */
        createMessage = function(message, callbackok) {
            try{
        
                var simpledlg = new SimpleDialog();
                win.body().appendChild(simpledlg.domNode);
                var msgBox = domConstruct.create("div",
                                         {class: "mblSimpleDialogText",
                                          innerHTML: message},
                                          simpledlg.domNode);

                var yesBtn = new Button({class: "mblSimpleDialogButton mblBlueButton", innerHTML: "OK"});
                yesBtn.connect(yesBtn.domNode, "click",function(e){callbackok(simpledlg)});
                yesBtn.placeAt(simpledlg.domNode);         

                simpledlg.show();

                
            }catch(e){
                errorlog("CREATE MESSAGE - 100",e);
            }                
        };
        
        /*
        * Login internal
        */
        loginInternal = function(){
            try{
                startLoading();
                login(registry.byId("username").get("value"),registry.byId("password").get("value"));
            }catch(e){
                errorlog("INTERNAL LOGIN ERROR",e);
            }
        };     
        
        /**
        * Effettuo login dell'applicativo
        */
        login = function(username, password) {   
            try{
            startLoading();
            if(username && password){
                //Faccio login online
                var urllogin = url+"Facade/loginUserPasswd?userName="+username+"&password="+password;
                var promise = request.post(urllogin,{
                    handleAs: "json",
                    data: json,
                    headers: {
                        "X-Requested-With": null,
                        "Content-Type":"application/json"                        
                    }           
                });            
                promise.response.then(
                    function(response) {
                        try{
                            
                            //Controllo se ci sono errori
                            if(response.text){
                                
                                var tokentext = response.text.replace(/"/g, "");                                
                                
                                //Effettuo un sync delle tabella utente
                                var objute = new Object();
                                objute.token = tokentext;
                                objute.name = username;
                                user = objute;                               
                                
                                synctable(['utente'],function(){
                                    
                                    debuglog("RETRIEVE TOKEN:"+tokentext);
                                    //Recupero l'utente
                                    retrieveToken(tokentext,function(utente){
                                        if(utente){
                                             user = utente
                                            //Vado alla pagina principale dell'applicazione
                                            /* Carico le ultime offerte */
                                            registry.byId("ViewApplication").show(false,false); 
                                            movetohomepage();
                                            
                                            /* Visualizzo la ricerca */
                                            domStyle.set(registry.byId('filterBoxOffer').domNode, 'display', 'inline');
                                                                                
                                            debuglog("SYNC APPLICATION");                                          
                                            //Sincronizzo tabelle di offerte/messaggi/vetrina
                                            synctable(['merchant','message','offer','offer_image','showcase','showcase_image','category','event','event_image','credit','image','help','help_utente'], function(){
                                                
                                                searchoffer(storepubblicazoni,function(){                            
                                                    registry.byId('list').refresh();                            
                                                    stopLoading();
                                                });
                                                //Carico i messaggi
                                                searchmessage(storemessage,function(){
                                                    registry.byId('listmessage').refresh();  
                                                    stopLoading();
                                                });
                                                
                                                //Carico showcase
                                                getShowcase(user, function(result){
                                                    if(result && result.length>0){
                                                        showcase = result[0];
                                                    }else{
                                                        showcase = new Object();
                                                        showcase.description = '';
                                                    }
                                                }); 
                                                
                                                //Carico le categorie
                                                searchcategory(storecategory,function(){
                                                    registry.byId('listcategory').refresh();  
                                                    stopLoading();
                                                });
                                                                                                
                                                //Carico gli eventi
                                                 searcheventi(storeeventi,function(){
                                                    registry.byId('listeventi').refresh();  
                                                    stopLoading();
                                                });
                                            });
                                        }                           
                                    });                               
                                });                                
                            } else {
                                stopLoading();
                                createMessage("Username e/o Password Errata!", function(dlguser){
                                    dlguser.hide();
                                    dlguser.destroyRecursive(false);
                                   
                                });
                                
                                
                            }                        
                        }catch(e) {
                            errorlog("RESPONSE 100",e);
                        }
                    },
                    function(error){
                        stopLoading();
                        createMessage("Sistema non disponibile riprovare più tardi!", function(dlguser){
                            dlguser.hide();
                            dlguser.destroyRecursive(false);
                        });                    
                        //errorlog("ERROR SYNC",error);            
                    }                     
                );             
            } else {
                
                //Recupero l'unico utente inserito nella tabella utente
                retrieveToken(null,function(utente){
                    if(utente){
                        user = utente
                        //Vado alla pagina principale dell'applicazione
                        searchoffer(storepubblicazoni,function(){                            
                            registry.byId('list').refresh();                            
                            stopLoading();
                        });
                        //Carico i messaggi
                        searchmessage(storemessage,function(){
                            registry.byId('listmessage').refresh();  
                            stopLoading();
                        });

                        //Carico showcase
                        getShowcase(user, function(result){
                            if(result && result.length>0){
                                showcase = result[0];
                            }else{
                                showcase = new Object();
                                showcase.description = '';
                            }
                        });
                        
                        //Carico le categorie
                        searchcategory(storecategory,function(){
                            registry.byId('listcategory').refresh();  
                            stopLoading();
                        });   
                        
                        //Carico gli eventi
                        searcheventi(storeeventi,function(){
                            registry.byId('listeventi').refresh();  
                            stopLoading();
                        });
                        registry.byId("ViewApplication").show(false,false);
                        movetohomepage();
                        
                    }else{
                        stopLoading();
                    }
                });   
            }
            }catch(e){
                errorlog("LOGIN ERROR",e);
            }
        };     
        
        /**
        * Effettuo logout dell'applicativo / anche in modalità offline
        */
        logoutuser = function(){
            deleteconfiguration('LAST_USER_LOG',function(){
                user = null;
                 registry.byId("ViewLogin").show(false,false);    
            });   
        }; 
        
        
        /**
        * Sync delle immagini in background
        */
        syncimages = function(callback) {            
            //Recupero le immagini di cui fare upload
            try{
                getUploadImage(function(uploadimages) {
                    totimg = uploadimages.length;
                    uploadimage(uploadimages, function(){
                        //Recupero le immagini di cui fare download 
                        getDownloadImage(function(downloadimages){
                            totimg = downloadimages.length;
                            downloadimage(downloadimages,function(){
                                if(callback){
                                    callback();        
                                }
                            });
                        });                
                    });
                }); 
            }catch(e){
                errorlog("ERRORE SYNC IMAGE - 100",e);
            }
        };
        
        /**
        * Upload dell'immagine
        */
        uploadimage = function(images,callback) {
            try{
                setloadingvalue("Upload immagine "+((totimg-images.length)+1)+" di "+totimg);
                
                if(images.length==0){
                    callback();
                    return;
                }            
                var image = images.pop(); 
                fileURI = window.rootimages.toURL()+image.full_path_name;
                
                var options = new FileUploadOptions();
                options.fileKey="file";
                options.fileName=image.full_path_name;
                options.mimeType="image/jpeg";                

                //Upload dell'immagine
                var filetransfer = new FileTransfer();
                filetransfer.upload(fileURI, url+"FacadeSync/upload", function(){

                    //Elimino la riga di upload
                    deleteSyncImage(image,function(){
                        //Chiamo il metodo in ricorsione
                        uploadimage(images,callback);
                    });         
                }, function(){
                    //Errore di upload dell'immgine passo alla successiva
                    uploadimage(images,callback);
                }, options);
            }catch(e){
                //errorlog("UPLOAD IMAGE - 100",e);
                stopLoading();
            }
        }; 
    
        /**
        * Download dell'immagine
        */
        downloadimage = function(images,callback){
            try{
                setloadingvalue("Download immagine "+((totimg-images.length)+1)+" di "+totimg);
                if(images.length==0){
                    callback();
                    return;
                }            
                var image = images.pop(); 
                var urldownload = "";
                if(window.rootimages){
                    urldownload =  window.rootimages.toURL()
                
                    fileURI = urldownload+image.full_path_name;

                    //Upload dell'immagine
                    var filetransfer = new FileTransfer();                            
                    filetransfer.download(url+"FacadeSync/download?pathname="+encodeURI(image.full_path_name), fileURI, function(fileentry){

                        //alert("FILE ENTRY:"+fileentry);

                        //Elimino la riga di upload
                        deleteSyncImage(image,function(){
                            //Chiamo il metodo in ricorsione
                            downloadimage(images,callback);
                        });         
                    }, function(error){

                        //console.log("download error source " + error.source);
                        //console.log("download error target " + error.target);
                        //console.log("upload error code" + error.code);

                        //alert("download error source " + error.source);
                        //alert("download error target " + error.target);
                        //alert("upload error code" + error.code);


                        //Errore nel download non cancello l'immagine ma passo alla successiva
                        downloadimage(images,callback);                                         
                    });
                }else{
                    if(callback){
                        callback();
                    }
                }
            }catch(e) { 
                //alert(e);
                //if(callback){
                //    callback();
                //}
                stopLoading();
                //errorlog("DOWNLOAD IMAGE - 100",e);
            }
        };        
	});