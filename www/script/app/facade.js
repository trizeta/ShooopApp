/**
* Metodo di ricerca delle pubblicazione di offerte ordinate per data
*/
searchoffer = function(store, callback) {
    try{
        var service = new OfferService();
        service.query("select *, (select full_path_name from image join offer_image using (image_id) where offer_id = offerimg.offer_id and predefined = 1 and offer_image.deleted = 0 limit 1) as full_path_name, (select desc2 from category where offerimg.cat_1 = category_id) as cat_1_desc from offer as offerimg where merchant_id = '"+user.merchant_id+"' and deleted != 1", function(offer) { 
            debuglog("SEARCH OFFER --"+offer);
            for(i=0;i<offer.length;i++){
                bean = offer[i];  
                bean.id = 'offer'+bean.id;
                bean.label = offerToString(bean);
                if(offer[i].full_path_name) {
                    try {                                            
                        bean.icon = window.rootimages.toURL() + offer[i].full_path_name;
                        //Controllo se esite il file altrimenti immagine di default                                           
                    } catch(e) {
                        bean.icon = "img/defaultimg.jpg";  
                    }
                } else {
                    bean.icon = "img/defaultimg.jpg";                    
                }    
                //bean.rightText = offerstateToString(bean);
                bean.moveTo = "dettaglioPubblicazione";
                bean.variableHeight = true;                                
                bean.class = 'offer_'+bean.state;
                bean.rightIcon = "mblDomButtonOrange ion-arrow-right-b size-48";
                bean.callback = function() {setDetailPubblicazione(this)};        
            }            
            store.setData(offer);
            if(callback){
                callback();
            }
       },[{name:'full_path_name', type:'string'},{name:'cat_1_desc', type:'string'}]);  
    }catch(e){
        errorlog("FACACE -  102",e);
    }
};

/* Metodo di Update dell'offerta */
updateoffer = function(bean,store, callback){
    try{
        var service = new OfferService(); 
        var id = bean.id.replace("offer", ""); 
        //Controllo se ci sono stati cambiamenti
        service.get(id, function(oldbean){
                
            if( !oldbean  ||
                oldbean.title != bean.title ||
                oldbean.description != bean.description ||
                oldbean.cat1 != oldbean.cat1 ||
                oldbean.quantity != oldbean.quantity ||
                !datecompare(oldbean.date_from,bean.date_from) ||
                !datecompare(oldbean.date_to,bean.date_to) ||
                oldbean.price != bean.price ||
                oldbean.buyable != bean.buyable ||
                oldbean.prenotable != bean.prenotable
            ){
                bean.id = id;
                bean.dirty = true;
                bean.deleted = false;
                bean.id = bean.id.replace("offer", ""); 
                if(!bean.state) {
                   bean.state = 'D';
                }  

                service.update(bean, function(){
                    var tmp = store.get("offer"+bean.id);
                    tmp.label = offerToString(bean);
                    tmp.cat_1 = bean.cat_1;
                    tmp.title = bean.title;
                    tmp.description = bean.description;
                    tmp.date_from = bean.date_from;
                    tmp.date_to = bean.date_to;
                    tmp.quantity = bean.quantity;
                    tmp.required = bean.required;
                    //tmp.rightText = offerstateToString(bean);
                    tmp.state =  bean.state;
                    tmp.price = bean.price;
                    tmp.buyable = bean.buyable;
                    tmp.prenotable = bean.prenotable;      
                    tmp.merchant_id = bean.merchant_id;
                    tmp.last_modified = bean.last_modified;
                    tmp.id = "offer"+bean.id;
                    tmp.class = 'offer_'+bean.state;
                    store.put(tmp);            
                    if(callback){
                       callback(true);
                    }
                }); 
            } else {
                
                if(callback){
                       callback(false);
                }
            }
        }
        );
      
    }catch(e){
        errorlog("UPDATE OFFER - 100",e);
    }
};


datecompare = function(date1, date2){

    if(!date1 && !date2){
        return true;
    }
        
    if(date1 && date2){
        return date1.getTime() == date2.getTime();
    } else {
        return false
    }   
}


/* Metodo che aggiunge l'offerta */
addoffer = function(bean,store, callback) {
    try{
        bean.dirty = true;
        bean.deleted = false;
        bean.state = 'D';
        bean.last_modified = null;
        var service = new OfferService();
        service.add(bean, function() {            
            bean.id = 'offer'+bean.id;
            bean.label = offerToString(bean);            
            bean.icon = "img/defaultimg.jpg";            
            //bean.rightText = offerstateToString(bean);      
            bean.moveTo = "dettaglioPubblicazione";
            bean.variableHeight = true;
            bean.class = 'offer_'+bean.state;
            bean.callback = function() {setDetailPubblicazione(this)}; 
            store.add(bean);
            if(callback){
                callback();
            }
        });   
    }catch(e){
        errorlog("ADDOFFER - 100",e);
    }
};


/* Elimino l'offerta */
deleteoffer = function(offer,callback){
    try{
        //Cancello riferimento all'immagine   
        var service = new OfferService();
        debuglog("DELETE OFFER"+offer);
        service.query("update offer set deleted = 1, dirty = 1 where offer_id = '"+offer.offer_id+"'", callback); 
    }catch(e){
        errorlog("DELETE IMAGE OFFER - 100",e);
    }
};


/* Convert bean to string */
offerToString = function(bean) {
    try{
        var str = bean.title;
       
        /*
        if(bean.price){
            str += " - €"+bean.price;
        }
        str += "</h1></br>";
        if(bean.date_from){
            str+= "Dal "+new Date(bean.date_from).toLocaleDateString();
        }
        
        if(bean.date_to){
            str+= " Fino Al "+new Date(bean.date_to).toLocaleDateString();
        }
        
        if(bean.quantity){
            str += "</br> Quantità: "+bean.quantity+" Pz";
        }*/        
        return str;
    }catch(e){
        errorlog("OFFER TO STRING - 100",e);
    }
};

/* Convert bean to string */
offerstateToString = function(bean) {
    try{
        var str = ''
        if(bean.state=='P'){
            str = 'Pubblicata';  
        }else if(bean.state=='D'){
            str = 'Bozza';  
        }else if(bean.state=='M'){
            str = 'In Modifica';  
        }else if(bean.state=='C'){
            str = 'Chiusa';  
        } else{
            str = 'Bozza';
        }
        return str;
    }catch(e){
        errorlog("OFFER TO STRING - 100",e);
    }
};

/* Search category */
searchcategory = function(store, callback) {
    try{
        var service = new CategoryService();
        service.query("select * from category where deleted != 1 order by desc1,desc2 ", function(category) { 
        for(i=0;i<category.length;i++){
                bean = category[i];  
                bean.id = 'category'+bean.id;
                bean.label = categoryToString(bean);
                if(!bean.desc2){
                    bean.header = true;
                } else {
                    bean.moveTo = "dettaglioPubblicazione";
                    bean.transitionDir = -1;
                    bean.callback = function() {setCategoryPubblicazione(this)};        
                }
            }      
            store.setData(category);
            if(callback){
                callback();
            }
       });  
    }catch(e){
        errorlog("FACACE -  102",e);
    }
};

categoryToString = function(bean) {
    try{
        var str = ''
        if(bean.desc2){
            str = bean.desc2;
        }else{
            str = bean.desc1;
        }
        return str;
    }catch(e){
        errorlog("CATEGORY TO STRING - 100",e);
    }
};

/* Recupero le immagini della pubblicazione */
getImageOffer = function(bean,callback) {
   try{
       var serviceimage = new ImageService();
      serviceimage.query("select image.*, offer_image.offer_image_id, offer_image.predefined from image join offer_image using (image_id) where offer_id = '"+bean.offer_id+"' and offer_image.deleted = 0 order by ordine asc", callback,[{name:'offer_image_id', type:'string'},{name:'predefined', type:'boolean'}]); 
   }catch(e){
       errorlog("GETIMAGEOFFER - 100",e);
   }   
};

/* Aggiunge l'immagine all'offerta */
addImageOffer = function(offer,imageURI,order,storeoffer,callback){
    try{
        window.resolveLocalFileSystemURL(imageURI, function(targetEntry){
            debuglog("ADDIMAGEOFFER-START 2");
                try{
                    //Copio e rinomino l'immagine con merchant_id_timestamp.estensione
                    var date = new Date();                    
                    var nameimage = user.merchant_id+"_"+date.getTime()+".jpg";
                                        
                    targetEntry.copyTo(window.rootimages, nameimage, function(){ 
                        var serviceimage = new ImageService();
                        var imagebean = new Image();
                        imagebean.image_id = getUUID();
                        imagebean.full_path_name = nameimage;  
                        imagebean.deleted = false;
                        imagebean.dirty = true;
                        imagebean.last_modified = null;
                        serviceimage.add(imagebean, function(){
                            /* Aggancio l'immagine all'offerta */ 
                            var serviceimageoffer = new Offer_imageService();
                            var offerimage = new Offer_image();
                            offerimage.offer_image_id = getUUID();
                            offerimage.image_id = imagebean.image_id;
                            offerimage.offer_id = offer.offer_id;                    
                            offerimage.ordine = order;
                            offerimage.last_modified = null;
                            if(order==1){
                               offerimage.predefined = true;  
                            }else{
                                offerimage.predefined = false;  
                            }
                            offerimage.deleted = false;
                            offerimage.dirty = true;
                            serviceimageoffer.add(offerimage,
                                                    function(){  
                                                        if(offerimage && offerimage.ordine==0){
                                                            order.icon = window.rootimages.toURL() + nameimage;
                                                            storeoffer.put(order);
                                                        }
                                                        callback(targetEntry.toURL(),offerimage);
                                                    }
                                                );
                            
                            /* Aggiungo l'immagine come da sincronizzare */
                            var serviceimagesync = new Image_syncService();                                                
                            var imagesync = new Image_sync();
                            imagesync.image_id = imagebean.image_id;
                            imagesync.type = 'U';
                            serviceimagesync.add(imagesync, function(){
                                //Non fa nulla, immagine inserita nella tabella di appoggio image_sync
                            });                      
                            
                        });            
                    }, function(e){errorlog("ADDIMAGEOFFER - 102",e)});       
                }catch(e){
                    errorlog("ADDIMAGEOFFER - 103",e)
                }              
        }, function(e){errorlog("ADDIMAGEOFFER - 101",e)}); 
    }catch(e){
        errorlog("ADDIMAGEOFFER - 104",e)
    }
};

/* Elimina l'immagine dell'offerta */
deleteImageOffer = function(image_id,offer,callback){
    try{
        //Cancello riferimento all'immagine   
        var service = new Offer_imageService();
        debuglog("DELETE IMAGE OFFER"+offer);
        service.query("update offer_image set deleted = 1, dirty = 1 where image_id = '"+image_id+"' and offer_id = '"+offer.offer_id+"'", callback); 
    }catch(e){
        errorlog("DELETE IMAGE OFFER - 100",e);
    }
};

/* Modifica l'ordinamento dell'immagine */
moveImageOffer = function(imageoffer,store,offer,from,to,callback) {
    try{
        //Setto l'immagine di default
        var service = new Offer_imageService();
                

        if(to==0){
            service.query("update offer_image set dirty=1, predefined = 0 where offer_id = '"+offer.offer_id+"'", function(){
                service.query("update offer_image set dirty=1, predefined = 1 where offer_image_id = '"+imageoffer.offer_image_id+"'",function(){
                    try{
                        tmp = store.get(offer.id);
                        tmp.icon = imageoffer.icon;
                        store.put(tmp);
                    } catch(e) {
                        errorlog("ERRORE",e);
                    }
                    callback();                                
                });              
            });      
        }else{
            callback();
        } 
    }catch(e){
        errorlog("FACADE - 101",e);
    }
};


getCountSyncOffer = function(callback){
    try{
        var service = new OfferService();
        service.query("select count(*) as countoffer from offer where dirty = 1 and deleted = 0 and merchant_id = '"+user.merchant_id+"'", function(result) {
            callback(result[0].countoffer);                 
        },[{name:'countoffer', type:'integer'}]);
            
    }catch(e){
        errorlog("ERRORE COUNT SYNC OFFER - 100",e);
    }
};


getCountSyncMessage = function(callback){
    try{
        var service = new MessageService();
        service.query("select count(*) as countmessage from message where dirty = 1 and deleted = 0 and merchant_id = '"+user.merchant_id+"'", function(result) {
            callback(result[0].countmessage);                 
        },[{name:'countmessage', type:'integer'}]);
            
    }catch(e){
        errorlog("ERRORE COUNT SYNC MESSAGE - 100",e);
    }
};

getCountSyncEvent = function(callback){
    try{
        var service = new EventService();
        service.query("select count(*) as countevent from event where dirty = 1 and deleted = 0 and merchant_id = '"+user.merchant_id+"'", function(result) {
            callback(result[0].countevent);                 
        },[{name:'countevent', type:'integer'}]);
            
    }catch(e){
        errorlog("ERRORE COUNT SYNC EVENT - 100",e);
    }
};

getCountSyncShowcase = function(callback){
    try{
        var service = new OfferService();
        service.query("select count(*) as countshowcase from showcase where dirty = 1 and deleted = 0 and merchant_id = '"+user.merchant_id+"'", function(result) {
            callback(result[0].countshowcase);                 
        },[{name:'countshowcase', type:'integer'}]);
            
    }catch(e){
        errorlog("ERRORE COUNT SYNC SHOWCASE - 100",e);
    }
};


/* Metodo di login */
retrieveToken = function(token,callback) {
   try{   
       var serviceconf = new ConfigurationService();
       if(token){
           var service = new UtenteService();
           service.query("select * from utente where token = '"+token+"'", function(result){    
               if(result.length==1) {
                   //Cancello l'ultimo LAST_USER
                   serviceconf.query("delete from configuration where chiave = 'LAST_USER_LOG'", function(){                   
                   conf = new Object();
                   conf.valore = result[0].utente_id;
                   conf.chiave = "LAST_USER_LOG";
                   serviceconf.add(conf,function() {
                        //Token valido 
                        callback(result[0]);
                   });
                });   
               } else {
                  callback(null);
               }
           });  
       }else{
           //Recupero se esiste l'ultimo login
           serviceconf.query("select * from configuration where chiave = 'LAST_USER_LOG'", function(resultconf){
                if(resultconf.length==1) {
                    var service = new UtenteService();
                    service.query("select * from utente where utente_id = '"+resultconf[0].valore+"'", function(result){    
                        if(result.length==1) {
                            callback(result[0]);
                        }else{
                            //Token non valido
                            callback(null);
                        }
                    });            
                } else {
                    //Utente non trovato
                    callback(null);
                }
           });
       }
    }catch(e){
        errorlog("retrieveToken - 101",e);
    } 
};


/*
* Elimina una configurazione
*/
deleteconfiguration = function(chiave, callback){
    try{   
       var serviceconf = new ConfigurationService();
       serviceconf.query("delete from configuration where chiave = 'LAST_USER_LOG'", callback);   
    }catch(e){
        errorlog("ERRORE DELETE CONF - 100",e);
    }
}


/**
* Ricerca dei messaggi
**/
searchmessage = function(store, callback) {
    try{
        var service = new MessageService();
        service.query("select * from message where merchant_id = '"+user.merchant_id+"' and deleted != 1 order by last_modified desc", function(messages) { 
        for(i=0;i<messages.length;i++){
                bean = messages[i]; 
                bean.id = 'message'+bean.id;
                bean.label = messageToString(bean);
                bean.rightText = messagestateToString(bean);
                bean.moveTo = "dettaglioMessage";
                bean.variableHeight = true;
                bean.class = 'message_'+bean.state;
                bean.callback = function() {setDetailMessage(this)};        
            }            
            store.setData(messages);
                        
            if(callback){
                callback();
            }
       });  
    }catch(e){
        errorlog("FACADE SERACH MESSAGE -  102",e);
    }
};


/* Convert bean to string */
messageToString = function(bean) {
    try{
        var str = '';
        if(bean.description.length>30){
            str = bean.description.substring(0,25)+"....";         
        }else{
            str = bean.description;
        }
        return str;
    }catch(e){
        errorlog("MESSAGE TO STRING - 100",e);
    }
};


/* Convert bean to string */
messagestateToString = function(bean) {
    try{
        var str = '';
        if(bean.state=='W'){
            str = "Bozza";
        }else if(bean.state=='S'){
            str = "In Invio";
        }else if(bean.state=='G'){
            str = "Inviato";
        }
        return str;
    }catch(e){
        errorlog("MESSAGE TO STRING - 100",e);
    }
};

/* Metodo che aggiunge il messaggio */
addmessage = function(bean,store, callback) {
    try{
        bean.dirty = true;
        bean.deleted = false;
        bean.state = 'W';
        bean.last_modified = null;
        var service = new MessageService();
        service.add(bean, function() {            
            bean.id = 'message'+bean.id;
            bean.label = messageToString(bean);            
            bean.rightText = messagestateToString(bean);           
            bean.moveTo = "dettaglioMessage";
            bean.variableHeight = true;
            bean.class = 'message_'+bean.state;
            bean.callback = function() {setDetailMessage(this)}; 
            store.add(bean);
            if(callback){
                callback();
            }
        });   
    }catch(e){
        errorlog("ADDMESSAGE - 100",e);
    }
};

/* Metodo di Update del messaggio */
updatemessage = function(bean,store, callback){
    try{
        bean.dirty = true;
        bean.deleted = false;
        bean.id = bean.id.replace("message", ""); 
        var service = new MessageService();
        service.update(bean, function(){
            var tmp = store.get("message"+bean.id);            
            tmp.label = messageToString(bean);
            tmp.description = bean.description;
            tmp.utente_id = bean.utente_id;
	        tmp.date_created = bean.date_created;
	        tmp.date_sent = bean.date_sent;
            tmp.state = bean.state;
            tmp.rightText = messagestateToString(bean);  
            tmp.merchant_id = bean.merchant_id;
            tmp.id = "message"+bean.id;
            tmp.class = 'message_'+bean.state;
            store.put(tmp);            
            if(callback){
               callback();
            }
        }); 
    }catch(e){
        errorlog("UPDATE MESSAGE - 100",e);
    }
};


deletemessage = function(message,callback){
    try{
        //Cancello riferimento all'immagine   
        var service = new MessageService();        
        service.query("update message set deleted = 1, dirty= 1 where message_id = '"+message.message_id+"'", callback); 
    }catch(e){
        errorlog("DELETE MESSAGE - 100",e);
    }
};

/******************************************************************************************************
/*                          VETRINA                                                                   *
/******************************************************************************************************/


//Recupero la vetrina
getShowcase = function(user,callback){
    try{
        var showcaseservice = new ShowcaseService();
        showcaseservice.query("select * from showcase where merchant_id = '"+user.merchant_id+"'",function(results){
            
            if(results){
                for(i=0;i<results.length;i++){
                    results[i].id = 'message'+results[i].id;
                }
            }
            callback(results);
        
        });       
    }catch(e){
        errorlog("GET SHOWCASE - 100",e);
    }
};

//Update della vetrina
updateShowcase = function(bean, callback){
    try{
        
        var service = new ShowcaseService();
        bean.id = bean.id.replace("message", ""); 
        service.get(bean.id, function(beanold){
            
            if(beanold.description != bean.description){
                bean.dirty = true;
                bean.deleted = false;
                service.update(bean, function(){
                    bean.id = 'message'+bean.id;
                    if(callback){
                       callback();
                    }
                });  
            }else{
                if(callback){
                    callback();
                }
            }
        });
    }catch(e){
        errorlog("UPDATE SHOWCASE - 100",e);
    }
};

//Aggiungo la vetrina
addShowcase = function(bean, callback){
    try{
        bean.dirty = true;
        bean.deleted = false; 
        bean.last_modified = null;
        var service = new ShowcaseService();
        service.add(bean, function() {            
            if(callback){
                callback();
            }
        });   
    } catch(e) {
        errorlog("ADDMESSAGE - 100",e);
    }
};

/* Aggiunge l'immagine alla vetrina */
addImageShowcase = function(showcase,imageURI,order,callback){
    try{
        window.resolveLocalFileSystemURL(imageURI, function(targetEntry){
            debuglog("ADDIMAGESHOWCASE-START 2");
                try{
                    //Copio e rinomino l'immagine con merchant_id_timestamp.estensione
                    var date = new Date();                    
                    var nameimage = user.merchant_id+"_"+date.getTime()+".jpg";
                                        
                    targetEntry.copyTo(window.rootimages, nameimage, function(){ 
                        var serviceimage = new ImageService();
                        var imagebean = new Image();
                        imagebean.image_id = getUUID();
                        imagebean.full_path_name = nameimage;  
                        imagebean.deleted = false;
                        imagebean.dirty = true;
                        imagebean.last_modified = null;
                        serviceimage.add(imagebean, function(){
                            /* Aggancio l'immagine alla vetrina */
                            var serviceimageshowcase = new Showcase_imageService();
                            var showcaseimage = new Showcase_image();
                            showcaseimage.image_id = imagebean.image_id;
                            showcaseimage.showcase_id = showcase.showcase_id;                    
                            showcaseimage.ordine = order;
                            showcaseimage.deleted = false;
                            showcaseimage.dirty = true;
                            showcaseimage.last_modified = null;
                            serviceimageshowcase.add(showcaseimage,callback(targetEntry.toURL()));

                            /* Aggiungo l'immagine come da sincronizzare */
                            var serviceimagesync = new Image_syncService();                                                
                            var imagesync = new Image_sync();
                            imagesync.image_id = imagebean.image_id;
                            imagesync.type = 'U';
                            serviceimagesync.add(imagesync, function(){
                                //Non fa nulla, immagine inserita nella tabella di appoggio image_sync
                            });                      
                            
                        });            
                    }, function(e){errorlog("ADDIMAGESHOWCASE - 102",e)});       
                }catch(e){
                    errorlog("ADDIMAGESHOWCASE - 103",e)
                }              
        }, function(e){errorlog("ADDIMAGESHOWCASE - 101",e)}); 
    }catch(e){
        errorlog("ADDIMAGESHOWCASE - 104",e)
    }
};

/* Elimina l'immagine dell'offerta */
deleteImageShowcase = function(image_id,showcase,callback){
    try{
        //Cancello riferimento all'immagine   
        var service = new Showcase_imageService();
        debuglog("DELETE IMAGE SHOWCASE"+showcase);
        service.query("update showcase_image set deleted = 1 where image_id = '"+image_id+"' and showcase_id = '"+showcase.showcase_id+"'", callback); 
    }catch(e){
        errorlog("DELETE IMAGE SHOWCASE - 100",e);
    }
};

/* Modifica l'ordinamento dell'immagine */
moveImageShowcase = function(image,showcase,from,to,callback){
    try{
        //Cancello riferimento all'immagine   
        var service = new Showcase_imageService();
        if(to==0){
            service.query("update showcase_image set dirty=1, predefined = 0 where showcase_id = '"+showcase.showcase_id+"'", function(){
                service.query("update showcase_image set dirty=1, predefined = 1 where showcase_image_id = '"+image.showcase.showcase_id+"'",function(){
                    callback();                                
                });              
            });      
        }else{
            callback();
        }
    }catch(e){
        errorlog("FACADE - 101",e);
    }
};

/* Recupero le immagini della vetrina */
getImageShowcase = function(bean,callback) {
   try{
       var serviceimage = new ImageService();
      serviceimage.query("select image.*, showcase_image.showcase_image_id, showcase_image.predefined from image join showcase_image using (image_id) where showcase_id = '"+bean.showcase_id+"' and showcase_image.deleted = 0 order by ordine asc", callback,[{name:'showcase_image_id', type:'string'},{name:'predefined', type:'boolean'}]); 
   }catch(e){
       errorlog("GETIMAGESHOWCASE - 100",e);
   }   
};

/******************************************************************************************************
/*                          EVENTI                                                                    *
/******************************************************************************************************/


/**
* Ricerca degli eventi
**/
searcheventi = function(store, callback) {
    try{
        var service = new EventService();
        service.query("select * from event where merchant_id = '"+user.merchant_id+"' and deleted != 1 order by date_from desc", function(events) { 
        for(i=0;i<events.length;i++){
                bean = events[i]; 
                bean.id = 'evento'+bean.id;
                bean.label = eventToString(bean);
                bean.moveTo = "dettaglioEvento";
                bean.variableHeight = true;
                bean.class = 'evento_'+bean.state;
                bean.callback = function() {setDetailEvento(this)};        
            }            
            store.setData(events);
                        
            if(callback){
                callback();
            }
       });  
    }catch(e){
        errorlog("FACADE SERACH EVENT -  102",e);
    }
};


/* Convert bean to string */
eventToString = function(bean) {
    try{
        var str = '';
        if(bean.title.length>100){
            str = bean.title.substring(0,100)+"....";         
        }else{
            str = bean.title;
        }
        return str;
    }catch(e){
        errorlog("EVENT TO STRING - 100",e);
    }
};

/* Metodo che aggiunge il messaggio */
addevento = function(bean,store, callback) {
    try{
        bean.dirty = true;
        bean.deleted = false;
        bean.state = 'D';
        bean.last_modified = null;
        var service = new EventService();
        service.add(bean, function() {            
            bean.id = 'evento'+bean.id;
            bean.label = eventToString(bean);
            bean.moveTo = "dettaglioEvento";
            bean.variableHeight = true;
            bean.class = 'evento_'+bean.state;
            bean.callback = function() {setDetailEvento(this)}; 
            store.add(bean);
            if(callback){
                callback();
            }
        });   
    }catch(e){
        errorlog("ADDEVENTO - 100",e);
    }
};

/* Metodo di Update del messaggio */
updateevento = function(bean,store, callback){
    try{
        bean.dirty = true;
        bean.deleted = false;
        bean.id = bean.id.replace("evento", ""); 
        var service = new EventService();
        service.update(bean, function(){
            try{
                var tmp = store.get("evento"+bean.id);            
                tmp.title = bean.title;                
                tmp.label = eventToString(bean);
                tmp.description = bean.description;
                tmp.utente_id = bean.utente_id;
                tmp.date_created = bean.date_created;
                tmp.date_from = bean.date_from;
                tmp.date_to = bean.date_to;
                tmp.state = bean.state;
                tmp.merchant_id = bean.merchant_id;
                tmp.id = "evento"+bean.id;
                tmp.class = 'evento_'+bean.state;
                store.put(tmp);            
                if(callback){
                   callback();
                }
            }catch(e){
                errorlog("EVENTO ERROR UPDATE - 101",e);
            }
        }); 
    }catch(e){
        errorlog("UPDATE EVENT - 100",e);
    }
};


deleteevento = function(evento,callback){
    try{
        //Cancello riferimento all'immagine   
        var service = new EventService();        
        service.query("update event set deleted = 1, dirty = 1 where event_id = '"+evento.event_id+"'", callback); 
    }catch(e){
        errorlog("DELETE EVENT - 100",e);
    }
};



/* Aggiunge l'immagine all'evento */
addImageEvento = function(evento,imageURI,order,callback){
    try{
        window.resolveLocalFileSystemURL(imageURI, function(targetEntry){
            debuglog("ADDIMAGEEVENTO-START 2");
                try{
                    //Copio e rinomino l'immagine con merchant_id_timestamp.estensione
                    var date = new Date();                    
                    var nameimage = user.merchant_id+"_"+date.getTime()+".jpg";
                                        
                    targetEntry.copyTo(window.rootimages, nameimage, function(){ 
                        var serviceimage = new ImageService();
                        var imagebean = new Image();
                        imagebean.image_id = getUUID();
                        imagebean.full_path_name = nameimage;  
                        imagebean.deleted = false;
                        imagebean.dirty = true;
                        imagebean.last_modified = null;
                        serviceimage.add(imagebean, function(){
                            /* Aggancio l'immagine alla vetrina */
                            var serviceimageevent = new Event_imageService();
                            var eventimage = new Event_image();
                            eventimage.image_id = imagebean.image_id;
                            eventimage.event_id = evento.event_id;                    
                            eventimage.ordine = order;
                            eventimage.deleted = false;
                            eventimage.dirty = true;
                            eventimage.last_modified = null;
                            serviceimageevent.add(eventimage,
                                                   function(){  
                                                        callback(targetEntry.toURL(),eventimage);
                                                    }
                                                 );

                            /* Aggiungo l'immagine come da sincronizzare */
                            var serviceimagesync = new Image_syncService();                                                
                            var imagesync = new Image_sync();
                            imagesync.image_id = imagebean.image_id;
                            imagesync.type = 'U';
                            serviceimagesync.add(imagesync, function(){
                                //Non fa nulla, immagine inserita nella tabella di appoggio image_sync
                            });                      
                            
                        });            
                    }, function(e){errorlog("ADDIMAGEEVENT - 102",e)});       
                }catch(e){
                    errorlog("ADDIMAGEEVENT - 103",e)
                }              
        }, function(e){errorlog("ADDIMAGEEVENT - 101",e)}); 
    }catch(e){
        errorlog("ADDIMAGEEVENT - 104",e)
    }
};

/* Elimina l'immagine dell'evento */
deleteImageEvento = function(image_id,evento,callback){
    try{
        //Cancello riferimento all'immagine   
        var service = new Event_imageService();
        debuglog("DELETE IMAGE EVENT"+evento);
        service.query("update event_image set deleted = 1 where image_id = '"+image_id+"' and event_id = '"+evento.event_id+"'", callback); 
    }catch(e){
        errorlog("DELETE IMAGE EVENT - 100",e);
    }
};

/* Modifica l'ordinamento dell'immagine */
moveImageEvento = function(imageevento,store,evento,from,to,callback) {
    try{
        //Setto l'immagine di default
        var service = new Event_imageService();
                

        if(to==0){
            service.query("update event_image set dirty=1, predefined = 0 where event_id = '"+evento.event_id+"'", function(){
                service.query("update event_image set dirty=1, predefined = 1 where event_image_id = '"+imageevento.event_image_id+"'",function(){
                    try{
                        tmp = store.get(evento.id);
                        tmp.icon = imageevento.icon;
                        store.put(tmp);
                    } catch(e) {
                        errorlog("ERRORE",e);
                    }
                    callback();                                
                });              
            });      
        }else{
            callback();
        } 
    }catch(e){
        errorlog("FACADE - 101",e);
    }
};

/* Recupero le immagini dell'evento */
getImageEvent = function(bean,callback) {
   try{
       var serviceimage = new ImageService();
      serviceimage.query("select image.*, event_image.event_image_id, event_image.predefined from image join event_image using (image_id) where event_id = '"+bean.event_id+"' and event_image.deleted = 0 order by ordine asc", callback,[{name:'event_image_id', type:'string'},{name:'predefined', type:'boolean'}]); 
   }catch(e){
       errorlog("GETIMAGEEVENT - 100",e);
   }   
};


/******************************************************************************************************
/*                          PUNTI                                                                    *
/******************************************************************************************************/

addpunti = function(bean,callback){
   try{
        bean.dirty = true;
        bean.deleted = false;
        bean.last_modified = null;
        var service = new CreditService();
        service.add(bean, function() {            
            if(callback){
                callback();
            }
        });   
    }catch(e){
        errorlog("ADDEVENTO - 100",e);
    }  
}

/********/

//Reset delle tabelle passate in ingresso
resettablefacade = function(tables, callback){
    try{
        if(tables.length==0) {
            callback();
            return;
        }              
        var table = tables.pop(); 
        service = getServiceToTableName(table);
        service.query("delete from "+table, function(){    
            resettablefacade(tables,callback);            
        });      
    }catch(e){
        errorlog("RESET ERROR - 100",e);
    }
}


/******************************************************************************************************
/*                                      HELP                                                          *
/******************************************************************************************************/

searchhelp = function(message_group,callback) {
    try{
        var service = new HelpService();
        service.query("select * from help left join help_utente using (help_id) where help.deleted != 1 and help_utente.active is null and help.message_group = '"+message_group+"';", function(helps) { 
        if(callback) {
           callback(helps[getRandomInt(0,helps.length-1)]);
        }
       });  
    }catch(e){
        errorlog("FACACE -  125",e);
    }
};


flaghelp = function(message_group,callback){
    try{
        var service = new Help_utenteService();
        
        var servicehelp = new Help_utenteService();
       
        //Elimino le righe di gruppo dell'utente
        service.query("delete from help_utente where utente_id = '"+user.utente_id+"' and help_id in (select help_id from help where message_group = '"+message_group+"')", function(){
            //Recupero gli help del gruppo
            servicehelp.query("select * from help where message_group = '"+message_group+"'",function(helps) {
                    last = false;
                    for(i=0;i<helps.length;i++){                        
                        var utente = new Help_utente();
                        utente.utente_id = user.utente_id;
                        utente.dirty = true;
                        utente.active = false;
                        utente.help_id = helps[i].help_id;
                        utente.help_utente_id = getUUID(); 
                        if(!last){
                             last = (i==(helps.length-1));
                        }
                        servicehelp.add(utente, function() { 
                            if(last){
                                if(callback){
                                   callback();
                                }
                            }                           
                        });
                    }
            });           
        });        
        
    }catch(e){
        errorlog("FACACE -  126",e);
    }    
};

function getRandomInt(min, max) {       
    // Create byte array and fill with 1 random number
    var byteArray = new Uint8Array(1);
    window.crypto.getRandomValues(byteArray);

    var range = max - min + 1;
    var max_range = 256;
    if (byteArray[0] >= Math.floor(max_range / range) * range)
        return getRandomInt(min, max);
    return min + (byteArray[0] % range);
};

/******************************************************************************************************
/*                          METODI DI SINCRONIZZAZIONE                                                *
/******************************************************************************************************/


/**
* Recupero tutte le offerte,eventi,messaggi, vetrina da sincornizzare (immagini fanno parte dell'offerta)
*/
/*
getCountSyncObject = function(callback){
    try{
        alert("QUIIII");
        var service = new UtenteService();
        var tot = 5;            
        service.query("select count(1) as countoffer from offer where dirty = 1", function(result) {
              service.query("select count(1) as countmessage from message where dirty = 1", function(result) {              
                    service.query("select count(1) as countevent from event where dirty = 1", function(result) { 
                        if(result.countevent){
                            tot += result.countevent; 
                        }
                        if(callback){
                            alert(tot);
                            callback(tot);
                        }
                 },[{name:'countevent', type:'integer'}]);
                  if(result.countmessage){
                    tot += result.countmessage;                                               
                  }
              },[{name:'countmessage', type:'integer'}]);
                if(result.countoffer){
                    tot += result.countoffer;                                               
                  }
                
        },[{name:'countoffer', type:'integer'}]);
            
    }catch(e){
        errorlog("ERRORE COUNT SYNC OBJECT - 100",e);
    }
}*/




/**
* Recupero le immagini di cui fare upload
*/
getUploadImage = function(callback){
    try {
        var imageservice = new ImageService();        
        imageservice.query("select image.* from image join image_sync using (image_id) where type = 'U'" ,callback);           
    } catch(e) {
        errorlog("GET UPLOAD IMAGE - 100",e);
    }
};

/**
* Recupero le immagini di cui fare download
*/
getDownloadImage = function(callback){
    try{
        var imageservice = new ImageService();        
        imageservice.query("select image.* from image join image_sync using (image_id) where type = 'D'" ,callback);
    }catch(e){
        errorlog("GET DOWNLOAD IMAGE - 100",e);
    }
};


/**
* Elimino la riga in tabella
*/ 
deleteSyncImage = function(image, callback){
    try{
        var imageservice = new Image_syncService();        
        imageservice.query("delete from image_sync where image_id = '"+image.image_id+"'",callback); 
    }catch(e){
        errorlog("GET DOWNLOAD IMAGE - 100",e);
    }
};


/**
* Elabora il result della query
*/
elaborateTableDirty = function(result,table,order,synctable){
    try{
         var tablebean = new Object();
         tablebean.order = order;
         tablebean.tablename = table;                                            
         var records = new Array();
         for(i=0;i<result.length;i++){
               var recordbean = new Object();
               recordbean.values = result[i];
               records.push(recordbean);
         }
         tablebean.records = records;
         synctable.push(tablebean);  
    }catch(e){
        errorlog("ELABORATE TABLE DIRTY - 100",e);
    }
};

/* Recupera i dati modificati delle tabelle */
getTableDirty = function(tables, synctable, callback){
    try {            
            if(tables.length==0) {
                callback(synctable);
                return;
            }              
            var table = tables.pop(); 
            service = getServiceToTableName(table);
        
             var sql = " dirty = 1";
            if(table=="offer" || table == "message" || table == "showcase" || table == "event" || table == "credit"){
                sql += " and merchant_id = '"+user.merchant_id+"'";
            }else if(table=="offer_image"){
                sql += " and offer_id in (select offer_id from offer where merchant_id = '"+user.merchant_id+"')";
            }else if(table == "utente") {
                sql += " and utente_id = '"+user.utente_id+"'";
            }else if(table=="showcase_image"){
                sql += " and showcase_id in (select showcase_id from showcase where merchant_id = '"+user.merchant_id+"')";                
            }else if(table=="event_image"){
                sql += " and event_id in (select event_id from event where merchant_id = '"+user.merchant_id+"')";                
            }
            
            service.query("select * from "+table+" where "+sql, function(result){    
                elaborateTableDirty(result,table,1,synctable);
                getTableDirty(tables,synctable,callback);
            });           
    } catch(e) {
        errorlog("FACEDE - 110A",e);
    }
};


/**
* Elabora il result della query
*/
elaborateTableLastUpdate = function(result,table,synctable){
   try{
       for(i=0;i<synctable.length;i++){
            if(synctable[i].tablename==table) {
                if(result[0] && result[0].last_modified){
                    synctable[i].lastupdate = result[0].last_modified;
                }else{
                    synctable[i].lastupdate = null;
                }                
                break;
            }        
        }   
   }catch(e){
    errorlog("elaborateTableLastUpdate - 100",e);
   }
};

/* Recupera il lastupdate delle tabelle filtrato per utente e merchant */
getTableLastUpdate = function(tables, synctable, callback){
    try {   
            if(tables.length==0){
                callback(synctable);
                return;
            }              
            var table = tables.pop();
            service = getServiceToTableName(table);
        
            //Aggiungo filtro per userid e merchant
            var sql = "";
            if(table=="offer" || table == "message" || table == "showcase" || table == "event" || table == "credit"){
                sql += " where merchant_id = '"+user.merchant_id+"'";
            }else if(table=="offer_image"){
                sql += " where offer_id in (select offer_id from offer where merchant_id = '"+user.merchant_id+"')";
            }else if(table == "utente") {
                sql += " where utente_id = '"+user.utente_id+"'";
            }else if(table=="showcase_image"){
                sql += " where showcase_id in (select showcase_id from showcase where merchant_id = '"+user.merchant_id+"')";                
            }else if(table=="event_image"){
                sql += " where event_id in (select event_id from event where merchant_id = '"+user.merchant_id+"')";                
            }
        
            service.query("select max(last_modified) as last_modified from "+table+""+sql, function(result){    
                    elaborateTableLastUpdate(result,table,synctable);
                    getTableLastUpdate(tables,synctable,callback);
            });
    } catch(e) {
        errorlog("FACEDE - 112",e);
    }
};



/* Aggiorna i dati modificati delle tabelle */
syncTables = function(tables, callback) {
    try {            
            if(tables.length==0) {               
                callback(synctable);
                return;
            }              
            var table = tables.pop();     
            debuglog("SYNC TABELLA"+table);
            syncRecords(table.records,table.tablename,function(){
                syncTables(tables,callback);
            });            
    } catch(e) {
        errorlog("FACEDE - 115",e);
    }
};



syncRecords = function(records,table,callback){
    try{
        service = getServiceToTableName(table);        
        if(records.length==0) {
            //Cancello tutti i record di delete
            service.query("delete from "+table+" where deleted = 1", function(){
                callback(synctable);                
            }); 
            return;
            
        }              
        var record = records.pop();   
        debuglog("SYNC RECORD : "+table+"--"+record.values[table+"_id"]);
        
        service.query("select * from "+table+" where "+table+"_id = '"+record.values[table+"_id"]+"'", function(result) {
            try{
                if(result.length>0 && result[0].id) {
                    record.values.id = result[0].id;
                    record.values.deleted = (record.values.deleted == 'Y');
                    record.values.dirty = (record.values.dirty == 'Y');

                    //Per tabella offer
                    if(table=='offer'){
                        record.values.prenotable = (record.values.prenotable == 'Y')
                        record.values.buyable = (record.values.buyable == 'Y')
                    }
                    
                    if(table=='offer_image' || table=='showcase_image'|| table=='event_image'){
                        record.values.predefined = (record.values.predefined == 'Y')
                    }               
                    
                    if(table=='help_utente'){
                        record.values.active = (record.values.active == 'Y')
                    }
                    
                    
                    service.update(record.values, function(){
                       syncRecords(records,table,callback);  
                    });

                } else {
                    record.values.deleted = (record.values.deleted == 'Y');
                    record.values.dirty = false;
                    service.add(record.values, function() {
                       //Se tabella == 'image' allora inserisco nella tabella di sync il download delle immagini
                        if(table == 'image') {                                            
                            /* Aggiungo l'immagine come da sincronizzare */
                            var serviceimagesync = new Image_syncService();                                                
                            var imagesync = new Image_sync();
                            imagesync.image_id = record.values[table+"_id"];
                            imagesync.type = 'D';
                            serviceimagesync.add(imagesync, function(){
                                syncRecords(records,table,callback); 
                            });                    
                        } else {
                            syncRecords(records,table,callback);   
                        }

                    });
                } 
            }catch(e){
                errorlog("ERROR SYNC RECORD - 105",e);
            }
        });
    } catch(e) {
        errorlog("FACEDE - 118",e);
    }
}

/**
* Ritorna il servizio DB dal nome della tabella
*/ 
getServiceToTableName = function(tablename){
    var service = null;
     switch(tablename) {                
                case "app_msg":
                    service = new App_msgService();                    
                                  
                    
                    break;
                case "category":
                    service = new CategoryService();
                    
                    break;
                case "comune":
                    service = new ComuneService();
                    
                    break;
                case "credit":
                    service = new CreditService();
                    
                    break;
                case "image":
                    service = new ImageService();
                    
                    break;
                case "merchant":
                    service = new MerchantService();
                  
                    break;
                case "message":
                    service = new MessageService();
                   
                    break;
                case "offer":
                    service = new OfferService();
                   
                    break;
                case "offer_image":
                    service = new Offer_imageService();
                  
                    break;
                case "preferences":
                    service = new PreferencesService();
                    
                    break;
                case "showcase":
                    service = new ShowcaseService();
                    
                    break;
                case "showcase_image":
                    service = new Showcase_imageService();
                    
                    break;
                case "utente":
                    service = new UtenteService();
                    
                    break;    
              
                case "image_sync":
                    service = new Image_syncService();
                    
                    break;    
                case "event":
                    service = new EventService();
                   
                    break;
                case "event_image":
                    service = new Event_imageService();
                  
                    break;
             
             case "help":
                    service = new HelpService();
                  
                    break;
             
             case "help_utente":
                    service = new Help_utenteService();
                  
                    break;
             
             
            } 
    return service;
    
}





