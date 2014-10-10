/*
* AUTOGENERATE NOT MODIFY
*/
 (function() {
    window.shopdb = {
        pages:{},
        db: {
            _instance: null,
            init: function (callback) {
                try{
                    alert("INIT CALL");
                    if (this._instance == null) {
                        var db = new ShooopitDBContext();
                        alert("INIT CALL 2");
                        try {
                            db.init(function () {
                                alert("INIT CALL 3");
                                window.shopdb.db._instance = db;
                                callback && callback();
                            });
                        } catch (ex) {
                            alert(ex);
                        }
                    } else {
                        callback();
                    }
                }catch(e){
                    alert("ERROR INIT",e);
                }
            },
            getInstance: function () {
                return this._instance;
            }
        }
    };
})();


ShooopitDBContext = function () {
    nova.data.DbContext.call(this, "ShoopIt", 1, "ShoopIt", 1000000);
    this.logSqls = true;
    this.alertErrors = true;
	this.app_msg = new nova.data.Repository(this, App_msg, "app_msg");
	this.category = new nova.data.Repository(this, Category, "category");
	this.client = new nova.data.Repository(this, Client, "client");
	this.client_merchant = new nova.data.Repository(this, Client_merchant, "client_merchant");
	this.client_offer = new nova.data.Repository(this, Client_offer, "client_offer");
	this.comune = new nova.data.Repository(this, Comune, "comune");
	this.credit = new nova.data.Repository(this, Credit, "credit");
	this.credit_history = new nova.data.Repository(this, Credit_history, "credit_history");
	this.device = new nova.data.Repository(this, Device, "device");
	this.ean = new nova.data.Repository(this, Ean, "ean");
	this.event = new nova.data.Repository(this, Event, "event");
	this.event_image = new nova.data.Repository(this, Event_image, "event_image");
	this.image = new nova.data.Repository(this, Image, "image");
	this.merchant = new nova.data.Repository(this, Merchant, "merchant");
	this.message = new nova.data.Repository(this, Message, "message");
	this.offer = new nova.data.Repository(this, Offer, "offer");
	this.offer_history = new nova.data.Repository(this, Offer_history, "offer_history");
	this.offer_image = new nova.data.Repository(this, Offer_image, "offer_image");
	this.preferences = new nova.data.Repository(this, Preferences, "preferences");
	this.showcase = new nova.data.Repository(this, Showcase, "showcase");
	this.showcase_history = new nova.data.Repository(this, Showcase_history, "showcase_history");
	this.showcase_image = new nova.data.Repository(this, Showcase_image, "showcase_image");
	this.utente = new nova.data.Repository(this, Utente, "utente");
	this.configuration = new nova.data.Repository(this, Configuration, "configuration");
	this.image_sync = new nova.data.Repository(this, Image_sync, "image_sync");
    
    
};

ShooopitDBContext.prototype = new nova.data.DbContext();
ShooopitDBContext.constructor = ShooopitDBContext;

ShooopitDBContext.prototype.initData = function(callback) {
    nova.data.DbContext.prototype.initData.call(this, callback);
    // override this method to intialize custom data on database creation
};

ShooopitDBContext.prototype.getMigrations = function() {
    var obj = this;
    return [];
    return [
        {
            version: 2,
            migrate:function(callback) {
                //var sql = "alter table ..., or update existing data, any updates to schema or data on upgrading";
                //obj.executeSql(sql, callback);
            }
        }
    ];
};



/*
* AUTOGENERATE NOT MODIFY
*/
var App_msg = function () {
    nova.data.Entity.call(this);
	this.app_msg_id = '';
	this.code = 0;
	this.description = '';
	this.code_detail = '';
	this.class_name = '';
	this.method_name = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

App_msg.prototype = new nova.data.Entity();
App_msg.constructor = App_msg;

App_msg.prototype.updateFrom = function(bean) {
	this.app_msg_id = bean.app_msg_id;
	this.code = bean.code;
	this.description = bean.description;
	this.code_detail = bean.code_detail;
	this.class_name = bean.class_name;
	this.method_name = bean.method_name;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var App_msgService = function() {};

App_msgService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().app_msg.toArray(callback);
    },
    add: function(app_msg, callback) {
        var db = shopdb.db.getInstance();
        db.app_msg.add(app_msg);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.app_msg.removeByWhere("id=" + id, callback);
    },
    update: function(app_msg, callback) {
        var db = shopdb.db.getInstance();
        db.app_msg.where("id=" + app_msg.id).firstOrDefault(function(dbapp_msg) {
            dbapp_msg.updateFrom(app_msg);
            db.app_msg.update(dbapp_msg);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().app_msg.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().app_msg.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Category = function () {
    nova.data.Entity.call(this);
	this.category_id = '';
	this.category_master_id = '';
	this.level = 0;
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
	this.desc1 = '';
	this.desc2 = '';
	this.desc3 = '';
	this.ordine = 0;
};

Category.prototype = new nova.data.Entity();
Category.constructor = Category;

Category.prototype.updateFrom = function(bean) {
	this.category_id = bean.category_id;
	this.category_master_id = bean.category_master_id;
	this.level = bean.level;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
	this.desc1 = bean.desc1;
	this.desc2 = bean.desc2;
	this.desc3 = bean.desc3;
	this.ordine = bean.ordine;
};/*
* AUTOGENERATE NOT MODIFY
*/

var CategoryService = function() {};

CategoryService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().category.toArray(callback);
    },
    add: function(category, callback) {
        var db = shopdb.db.getInstance();
        db.category.add(category);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.category.removeByWhere("id=" + id, callback);
    },
    update: function(category, callback) {
        var db = shopdb.db.getInstance();
        db.category.where("id=" + category.id).firstOrDefault(function(dbcategory) {
            dbcategory.updateFrom(category);
            db.category.update(dbcategory);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
    getCategoryWithcategorymasterids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.category.where("category_master_id=" +bean.category_id).toArray(callback);
},
    getOfferWithcat1s: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.offer.where("cat_1=" +bean.category_id).toArray(callback);
},
    getOfferWithcat2s: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.offer.where("cat_2=" +bean.category_id).toArray(callback);
},
    getOfferWithcat3s: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.offer.where("cat_3=" +bean.category_id).toArray(callback);
},
        
    get: function(id, callback) {
        shopdb.db.getInstance().category.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().category.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Client = function () {
    nova.data.Entity.call(this);
	this.client_id = '';
	this.ean_id = '';
	this.name = false;
	this.surname = false;
	this.email = false;
};

Client.prototype = new nova.data.Entity();
Client.constructor = Client;

Client.prototype.updateFrom = function(bean) {
	this.client_id = bean.client_id;
	this.ean_id = bean.ean_id;
	this.name = bean.name;
	this.surname = bean.surname;
	this.email = bean.email;
};/*
* AUTOGENERATE NOT MODIFY
*/

var ClientService = function() {};

ClientService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().client.toArray(callback);
    },
    add: function(client, callback) {
        var db = shopdb.db.getInstance();
        db.client.add(client);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.client.removeByWhere("id=" + id, callback);
    },
    update: function(client, callback) {
        var db = shopdb.db.getInstance();
        db.client.where("id=" + client.id).firstOrDefault(function(dbclient) {
            dbclient.updateFrom(client);
            db.client.update(dbclient);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */        
    get: function(id, callback) {
        shopdb.db.getInstance().client.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().client.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Client_merchant = function () {
    nova.data.Entity.call(this);
	this.client_merchant_id = '';
	this.merchant_id = '';
	this.ean = '';
	this.date_from = new Date();
	this.date_to = new Date();
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
	this.type = '';
};

Client_merchant.prototype = new nova.data.Entity();
Client_merchant.constructor = Client_merchant;

Client_merchant.prototype.updateFrom = function(bean) {
	this.client_merchant_id = bean.client_merchant_id;
	this.merchant_id = bean.merchant_id;
	this.ean = bean.ean;
	this.date_from = bean.date_from;
	this.date_to = bean.date_to;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
	this.type = bean.type;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Client_merchantService = function() {};

Client_merchantService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().client_merchant.toArray(callback);
    },
    add: function(client_merchant, callback) {
        var db = shopdb.db.getInstance();
        db.client_merchant.add(client_merchant);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.client_merchant.removeByWhere("id=" + id, callback);
    },
    update: function(client_merchant, callback) {
        var db = shopdb.db.getInstance();
        db.client_merchant.where("id=" + client_merchant.id).firstOrDefault(function(dbclient_merchant) {
            dbclient_merchant.updateFrom(client_merchant);
            db.client_merchant.update(dbclient_merchant);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().client_merchant.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().client_merchant.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Client_offer = function () {
    nova.data.Entity.call(this);
	this.client_offer_id = '';
	this.offer_id = '';
	this.ean = '';
	this.type = '';
	this.data = new Date();
	this.deleted = false;
	this.dirty = true;
	this.price = 0;
};

Client_offer.prototype = new nova.data.Entity();
Client_offer.constructor = Client_offer;

Client_offer.prototype.updateFrom = function(bean) {
	this.client_offer_id = bean.client_offer_id;
	this.offer_id = bean.offer_id;
	this.ean = bean.ean;
	this.type = bean.type;
	this.data = bean.data;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
	this.price = bean.price;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Client_offerService = function() {};

Client_offerService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().client_offer.toArray(callback);
    },
    add: function(client_offer, callback) {
        var db = shopdb.db.getInstance();
        db.client_offer.add(client_offer);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.client_offer.removeByWhere("id=" + id, callback);
    },
    update: function(client_offer, callback) {
        var db = shopdb.db.getInstance();
        db.client_offer.where("id=" + client_offer.id).firstOrDefault(function(dbclient_offer) {
            dbclient_offer.updateFrom(client_offer);
            db.client_offer.update(dbclient_offer);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().client_offer.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().client_offer.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Comune = function () {
    nova.data.Entity.call(this);
	this.comune_id = '';
	this.description = '';
	this.provincia = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Comune.prototype = new nova.data.Entity();
Comune.constructor = Comune;

Comune.prototype.updateFrom = function(bean) {
	this.comune_id = bean.comune_id;
	this.description = bean.description;
	this.provincia = bean.provincia;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var ComuneService = function() {};

ComuneService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().comune.toArray(callback);
    },
    add: function(comune, callback) {
        var db = shopdb.db.getInstance();
        db.comune.add(comune);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.comune.removeByWhere("id=" + id, callback);
    },
    update: function(comune, callback) {
        var db = shopdb.db.getInstance();
        db.comune.where("id=" + comune.id).firstOrDefault(function(dbcomune) {
            dbcomune.updateFrom(comune);
            db.comune.update(dbcomune);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().comune.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().comune.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Credit = function () {
    nova.data.Entity.call(this);
	this.credit_id = '';
	this.utente_id = '';
	this.merchant_id = '';
	this.ean = '';
	this.data = new Date();
	this.qta = 0;
	this.causale = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Credit.prototype = new nova.data.Entity();
Credit.constructor = Credit;

Credit.prototype.updateFrom = function(bean) {
	this.credit_id = bean.credit_id;
	this.utente_id = bean.utente_id;
	this.merchant_id = bean.merchant_id;
	this.ean = bean.ean;
	this.data = bean.data;
	this.qta = bean.qta;
	this.causale = bean.causale;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var CreditService = function() {};

CreditService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().credit.toArray(callback);
    },
    add: function(credit, callback) {
        var db = shopdb.db.getInstance();
        db.credit.add(credit);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.credit.removeByWhere("id=" + id, callback);
    },
    update: function(credit, callback) {
        var db = shopdb.db.getInstance();
        db.credit.where("id=" + credit.id).firstOrDefault(function(dbcredit) {
            dbcredit.updateFrom(credit);
            db.credit.update(dbcredit);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().credit.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().credit.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Credit_history = function () {
    nova.data.Entity.call(this);
	this.credit_id = '';
	this.ean128 = '';
	this.data = new Date();
	this.qta = 0;
	this.causale = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Credit_history.prototype = new nova.data.Entity();
Credit_history.constructor = Credit_history;

Credit_history.prototype.updateFrom = function(bean) {
	this.credit_id = bean.credit_id;
	this.ean128 = bean.ean128;
	this.data = bean.data;
	this.qta = bean.qta;
	this.causale = bean.causale;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Credit_historyService = function() {};

Credit_historyService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().credit_history.toArray(callback);
    },
    add: function(credit_history, callback) {
        var db = shopdb.db.getInstance();
        db.credit_history.add(credit_history);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.credit_history.removeByWhere("id=" + id, callback);
    },
    update: function(credit_history, callback) {
        var db = shopdb.db.getInstance();
        db.credit_history.where("id=" + credit_history.id).firstOrDefault(function(dbcredit_history) {
            dbcredit_history.updateFrom(credit_history);
            db.credit_history.update(dbcredit_history);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().credit_history.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().credit_history.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Device = function () {
    nova.data.Entity.call(this);
	this.device_id = '';
	this.ean = '';
	this.brand = '';
	this.model = '';
	this.op_system = '';
	this.op_system_ver = '';
};

Device.prototype = new nova.data.Entity();
Device.constructor = Device;

Device.prototype.updateFrom = function(bean) {
	this.device_id = bean.device_id;
	this.ean = bean.ean;
	this.brand = bean.brand;
	this.model = bean.model;
	this.op_system = bean.op_system;
	this.op_system_ver = bean.op_system_ver;
};/*
* AUTOGENERATE NOT MODIFY
*/

var DeviceService = function() {};

DeviceService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().device.toArray(callback);
    },
    add: function(device, callback) {
        var db = shopdb.db.getInstance();
        db.device.add(device);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.device.removeByWhere("id=" + id, callback);
    },
    update: function(device, callback) {
        var db = shopdb.db.getInstance();
        db.device.where("id=" + device.id).firstOrDefault(function(dbdevice) {
            dbdevice.updateFrom(device);
            db.device.update(dbdevice);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().device.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().device.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Ean = function () {
    nova.data.Entity.call(this);
	this.ean = '';
	this.description = '';
};

Ean.prototype = new nova.data.Entity();
Ean.constructor = Ean;

Ean.prototype.updateFrom = function(bean) {
	this.ean = bean.ean;
	this.description = bean.description;
};/*
* AUTOGENERATE NOT MODIFY
*/

var EanService = function() {};

EanService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().ean.toArray(callback);
    },
    add: function(ean, callback) {
        var db = shopdb.db.getInstance();
        db.ean.add(ean);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.ean.removeByWhere("id=" + id, callback);
    },
    update: function(ean, callback) {
        var db = shopdb.db.getInstance();
        db.ean.where("id=" + ean.id).firstOrDefault(function(dbean) {
            dbean.updateFrom(ean);
            db.ean.update(dbean);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().ean.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().ean.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Event = function () {
    nova.data.Entity.call(this);
	this.event_id = '';
	this.utente_id = '';
	this.merchant_id = '';
	this.title = '';
	this.description = '';
	this.date_created = new Date();
	this.date_from = new Date();
	this.date_to = new Date();
	this.state = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
	this.price = 0;
};

Event.prototype = new nova.data.Entity();
Event.constructor = Event;

Event.prototype.updateFrom = function(bean) {
	this.event_id = bean.event_id;
	this.utente_id = bean.utente_id;
	this.merchant_id = bean.merchant_id;
	this.title = bean.title;
	this.description = bean.description;
	this.date_created = bean.date_created;
	this.date_from = bean.date_from;
	this.date_to = bean.date_to;
	this.state = bean.state;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
	this.price = bean.price;
};/*
* AUTOGENERATE NOT MODIFY
*/

var EventService = function() {};

EventService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().event.toArray(callback);
    },
    add: function(event, callback) {
        var db = shopdb.db.getInstance();
        db.event.add(event);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.event.removeByWhere("id=" + id, callback);
    },
    update: function(event, callback) {
        var db = shopdb.db.getInstance();
        db.event.where("id=" + event.id).firstOrDefault(function(dbevent) {
            dbevent.updateFrom(event);
            db.event.update(dbevent);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().event.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().event.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Event_image = function () {
    nova.data.Entity.call(this);
	this.event_image = '';
	this.image_id = '';
	this.event_id = '';
	this.predefined = false;
	this.ordine = 0;
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Event_image.prototype = new nova.data.Entity();
Event_image.constructor = Event_image;

Event_image.prototype.updateFrom = function(bean) {
	this.event_image = bean.event_image;
	this.image_id = bean.image_id;
	this.event_id = bean.event_id;
	this.predefined = bean.predefined;
	this.ordine = bean.ordine;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Event_imageService = function() {};

Event_imageService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().event_image.toArray(callback);
    },
    add: function(event_image, callback) {
        var db = shopdb.db.getInstance();
        db.event_image.add(event_image);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.event_image.removeByWhere("id=" + id, callback);
    },
    update: function(event_image, callback) {
        var db = shopdb.db.getInstance();
        db.event_image.where("id=" + event_image.id).firstOrDefault(function(dbevent_image) {
            dbevent_image.updateFrom(event_image);
            db.event_image.update(dbevent_image);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().event_image.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().event_image.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Image = function () {
    nova.data.Entity.call(this);
	this.image_name = '';
	this.image_id = '';
	this.full_path_name = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Image.prototype = new nova.data.Entity();
Image.constructor = Image;

Image.prototype.updateFrom = function(bean) {
	this.image_name = bean.image_name;
	this.image_id = bean.image_id;
	this.full_path_name = bean.full_path_name;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var ImageService = function() {};

ImageService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().image.toArray(callback);
    },
    add: function(image, callback) {
        var db = shopdb.db.getInstance();
        db.image.add(image);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.image.removeByWhere("id=" + id, callback);
    },
    update: function(image, callback) {
        var db = shopdb.db.getInstance();
        db.image.where("id=" + image.id).firstOrDefault(function(dbimage) {
            dbimage.updateFrom(image);
            db.image.update(dbimage);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
    getOffer_imageWithimageids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.offer_image.where("image_id=" +bean.image_id).toArray(callback);
},
    getShowcase_imageWithimageids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.showcase_image.where("image_id=" +bean.image_id).toArray(callback);
},
        
    get: function(id, callback) {
        shopdb.db.getInstance().image.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().image.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Merchant = function () {
    nova.data.Entity.call(this);
	this.search_key = '';
	this.merchant_id = '';
	this.comune_id = '';
	this.address = '';
	this.email = '';
	this.tel = '';
	this.fax = '';
	this.web = '';
	this.google_link = '';
	this.facebook = '';
	this.twitter = '';
	this.pinterest = '';
	this.instagram = '';
	this.google_plus = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
	this.rag_soc = '';
	this.piva = '';
	this.qr_code = '';
};

Merchant.prototype = new nova.data.Entity();
Merchant.constructor = Merchant;

Merchant.prototype.updateFrom = function(bean) {
	this.search_key = bean.search_key;
	this.merchant_id = bean.merchant_id;
	this.comune_id = bean.comune_id;
	this.address = bean.address;
	this.email = bean.email;
	this.tel = bean.tel;
	this.fax = bean.fax;
	this.web = bean.web;
	this.google_link = bean.google_link;
	this.facebook = bean.facebook;
	this.twitter = bean.twitter;
	this.pinterest = bean.pinterest;
	this.instagram = bean.instagram;
	this.google_plus = bean.google_plus;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
	this.rag_soc = bean.rag_soc;
	this.piva = bean.piva;
	this.qr_code = bean.qr_code;
};/*
* AUTOGENERATE NOT MODIFY
*/

var MerchantService = function() {};

MerchantService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().merchant.toArray(callback);
    },
    add: function(merchant, callback) {
        var db = shopdb.db.getInstance();
        db.merchant.add(merchant);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.merchant.removeByWhere("id=" + id, callback);
    },
    update: function(merchant, callback) {
        var db = shopdb.db.getInstance();
        db.merchant.where("id=" + merchant.id).firstOrDefault(function(dbmerchant) {
            dbmerchant.updateFrom(merchant);
            db.merchant.update(dbmerchant);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
    getMessageWithmerchantids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.message.where("merchant_id=" +bean.merchant_id).toArray(callback);
},
    getOfferWithmerchantids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.offer.where("merchant_id=" +bean.merchant_id).toArray(callback);
},
    getShowcaseWithmerchantids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.showcase.where("merchant_id=" +bean.merchant_id).toArray(callback);
},
    getUtenteWithmerchantids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.utente.where("merchant_id=" +bean.merchant_id).toArray(callback);
},
        
    get: function(id, callback) {
        shopdb.db.getInstance().merchant.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().merchant.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Message = function () {
    nova.data.Entity.call(this);
	this.message_id = '';
	this.utente_id = '';
	this.date_created = new Date();
	this.date_sent = new Date();
	this.description = '';
	this.state = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
	this.merchant_id = '';
};

Message.prototype = new nova.data.Entity();
Message.constructor = Message;

Message.prototype.updateFrom = function(bean) {
	this.message_id = bean.message_id;
	this.utente_id = bean.utente_id;
	this.date_created = bean.date_created;
	this.date_sent = bean.date_sent;
	this.description = bean.description;
	this.state = bean.state;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
	this.merchant_id = bean.merchant_id;
};/*
* AUTOGENERATE NOT MODIFY
*/

var MessageService = function() {};

MessageService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().message.toArray(callback);
    },
    add: function(message, callback) {
        var db = shopdb.db.getInstance();
        db.message.add(message);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.message.removeByWhere("id=" + id, callback);
    },
    update: function(message, callback) {
        var db = shopdb.db.getInstance();
        db.message.where("id=" + message.id).firstOrDefault(function(dbmessage) {
            dbmessage.updateFrom(message);
            db.message.update(dbmessage);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().message.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().message.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Offer = function () {
    nova.data.Entity.call(this);
	this.offer_id = '';
	this.utente_id = '';
	this.cat_1 = '';
	this.cat_2 = '';
	this.cat_3 = '';
	this.title = '';
	this.description = '';
	this.date_created = new Date();
	this.date_from = new Date();
	this.date_to = new Date();
	this.quantity = 0;
	this.required = 0;
	this.state = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
	this.price = 0;
	this.buyable = false;
	this.prenotable = false;
	this.merchant_id = '';
};

Offer.prototype = new nova.data.Entity();
Offer.constructor = Offer;

Offer.prototype.updateFrom = function(bean) {
	this.offer_id = bean.offer_id;
	this.utente_id = bean.utente_id;
	this.cat_1 = bean.cat_1;
	this.cat_2 = bean.cat_2;
	this.cat_3 = bean.cat_3;
	this.title = bean.title;
	this.description = bean.description;
	this.date_created = bean.date_created;
	this.date_from = bean.date_from;
	this.date_to = bean.date_to;
	this.quantity = bean.quantity;
	this.required = bean.required;
	this.state = bean.state;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
	this.price = bean.price;
	this.buyable = bean.buyable;
	this.prenotable = bean.prenotable;
	this.merchant_id = bean.merchant_id;
};/*
* AUTOGENERATE NOT MODIFY
*/

var OfferService = function() {};

OfferService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().offer.toArray(callback);
    },
    add: function(offer, callback) {
        var db = shopdb.db.getInstance();
        db.offer.add(offer);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.offer.removeByWhere("id=" + id, callback);
    },
    update: function(offer, callback) {
        var db = shopdb.db.getInstance();
        db.offer.where("id=" + offer.id).firstOrDefault(function(dboffer) {
            dboffer.updateFrom(offer);
            db.offer.update(dboffer);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
    getOffer_imageWithofferids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.offer_image.where("offer_id=" +bean.offer_id).toArray(callback);
},
        
    get: function(id, callback) {
        shopdb.db.getInstance().offer.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().offer.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Offer_history = function () {
    nova.data.Entity.call(this);
	this.offer_id = '';
	this.utente_id = '';
	this.cat_1 = 0;
	this.cat_2 = 0;
	this.cat_3 = 0;
	this.title = '';
	this.description = '';
	this.date_created = new Date();
	this.date_from = new Date();
	this.date_to = new Date();
	this.quantity = 0;
	this.required = 0;
	this.state = 0;
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Offer_history.prototype = new nova.data.Entity();
Offer_history.constructor = Offer_history;

Offer_history.prototype.updateFrom = function(bean) {
	this.offer_id = bean.offer_id;
	this.utente_id = bean.utente_id;
	this.cat_1 = bean.cat_1;
	this.cat_2 = bean.cat_2;
	this.cat_3 = bean.cat_3;
	this.title = bean.title;
	this.description = bean.description;
	this.date_created = bean.date_created;
	this.date_from = bean.date_from;
	this.date_to = bean.date_to;
	this.quantity = bean.quantity;
	this.required = bean.required;
	this.state = bean.state;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Offer_historyService = function() {};

Offer_historyService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().offer_history.toArray(callback);
    },
    add: function(offer_history, callback) {
        var db = shopdb.db.getInstance();
        db.offer_history.add(offer_history);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.offer_history.removeByWhere("id=" + id, callback);
    },
    update: function(offer_history, callback) {
        var db = shopdb.db.getInstance();
        db.offer_history.where("id=" + offer_history.id).firstOrDefault(function(dboffer_history) {
            dboffer_history.updateFrom(offer_history);
            db.offer_history.update(dboffer_history);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().offer_history.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().offer_history.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Offer_image = function () {
    nova.data.Entity.call(this);
	this.offer_image_id = '';
	this.offer_id = '';
	this.image_id = '';
	this.predefined = false;
	this.ordine = 0;
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Offer_image.prototype = new nova.data.Entity();
Offer_image.constructor = Offer_image;

Offer_image.prototype.updateFrom = function(bean) {
	this.offer_image_id = bean.offer_image_id;
	this.offer_id = bean.offer_id;
	this.image_id = bean.image_id;
	this.predefined = bean.predefined;
	this.ordine = bean.ordine;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Offer_imageService = function() {};

Offer_imageService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().offer_image.toArray(callback);
    },
    add: function(offer_image, callback) {
        var db = shopdb.db.getInstance();
        db.offer_image.add(offer_image);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.offer_image.removeByWhere("id=" + id, callback);
    },
    update: function(offer_image, callback) {
        var db = shopdb.db.getInstance();
        db.offer_image.where("id=" + offer_image.id).firstOrDefault(function(dboffer_image) {
            dboffer_image.updateFrom(offer_image);
            db.offer_image.update(dboffer_image);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().offer_image.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().offer_image.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Preferences = function () {
    nova.data.Entity.call(this);
	this.app_version = '';
	this.opt_1 = '';
	this.opt_2 = '';
	this.opt_3 = '';
	this.opt_4 = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Preferences.prototype = new nova.data.Entity();
Preferences.constructor = Preferences;

Preferences.prototype.updateFrom = function(bean) {
	this.app_version = bean.app_version;
	this.opt_1 = bean.opt_1;
	this.opt_2 = bean.opt_2;
	this.opt_3 = bean.opt_3;
	this.opt_4 = bean.opt_4;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var PreferencesService = function() {};

PreferencesService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().preferences.toArray(callback);
    },
    add: function(preferences, callback) {
        var db = shopdb.db.getInstance();
        db.preferences.add(preferences);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.preferences.removeByWhere("id=" + id, callback);
    },
    update: function(preferences, callback) {
        var db = shopdb.db.getInstance();
        db.preferences.where("id=" + preferences.id).firstOrDefault(function(dbpreferences) {
            dbpreferences.updateFrom(preferences);
            db.preferences.update(dbpreferences);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().preferences.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().preferences.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Showcase = function () {
    nova.data.Entity.call(this);
	this.showcase_id = '';
	this.utente_id = '';
	this.merchant_id = '';
	this.customer_code = '';
	this.description = '';
	this.data_mod = new Date();
	this.active = 0;
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Showcase.prototype = new nova.data.Entity();
Showcase.constructor = Showcase;

Showcase.prototype.updateFrom = function(bean) {
	this.showcase_id = bean.showcase_id;
	this.utente_id = bean.utente_id;
	this.merchant_id = bean.merchant_id;
	this.customer_code = bean.customer_code;
	this.description = bean.description;
	this.data_mod = bean.data_mod;
	this.active = bean.active;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var ShowcaseService = function() {};

ShowcaseService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().showcase.toArray(callback);
    },
    add: function(showcase, callback) {
        var db = shopdb.db.getInstance();
        db.showcase.add(showcase);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.showcase.removeByWhere("id=" + id, callback);
    },
    update: function(showcase, callback) {
        var db = shopdb.db.getInstance();
        db.showcase.where("id=" + showcase.id).firstOrDefault(function(dbshowcase) {
            dbshowcase.updateFrom(showcase);
            db.showcase.update(dbshowcase);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
    getShowcase_imageWithshowcaseids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.showcase_image.where("showcase_id=" +bean.showcase_id).toArray(callback);
},
        
    get: function(id, callback) {
        shopdb.db.getInstance().showcase.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().showcase.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Showcase_history = function () {
    nova.data.Entity.call(this);
	this.showcase_id = '';
	this.utente_id = '';
	this.customer_code = '';
	this.description = '';
	this.data_mod = new Date();
	this.active = 0;
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Showcase_history.prototype = new nova.data.Entity();
Showcase_history.constructor = Showcase_history;

Showcase_history.prototype.updateFrom = function(bean) {
	this.showcase_id = bean.showcase_id;
	this.utente_id = bean.utente_id;
	this.customer_code = bean.customer_code;
	this.description = bean.description;
	this.data_mod = bean.data_mod;
	this.active = bean.active;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Showcase_historyService = function() {};

Showcase_historyService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().showcase_history.toArray(callback);
    },
    add: function(showcase_history, callback) {
        var db = shopdb.db.getInstance();
        db.showcase_history.add(showcase_history);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.showcase_history.removeByWhere("id=" + id, callback);
    },
    update: function(showcase_history, callback) {
        var db = shopdb.db.getInstance();
        db.showcase_history.where("id=" + showcase_history.id).firstOrDefault(function(dbshowcase_history) {
            dbshowcase_history.updateFrom(showcase_history);
            db.showcase_history.update(dbshowcase_history);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().showcase_history.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().showcase_history.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Showcase_image = function () {
    nova.data.Entity.call(this);
	this.showcase_image_id = '';
	this.showcase_id = '';
	this.image_id = '';
	this.predefined = false;
	this.ordine = 0;
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
};

Showcase_image.prototype = new nova.data.Entity();
Showcase_image.constructor = Showcase_image;

Showcase_image.prototype.updateFrom = function(bean) {
	this.showcase_image_id = bean.showcase_image_id;
	this.showcase_id = bean.showcase_id;
	this.image_id = bean.image_id;
	this.predefined = bean.predefined;
	this.ordine = bean.ordine;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Showcase_imageService = function() {};

Showcase_imageService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().showcase_image.toArray(callback);
    },
    add: function(showcase_image, callback) {
        var db = shopdb.db.getInstance();
        db.showcase_image.add(showcase_image);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.showcase_image.removeByWhere("id=" + id, callback);
    },
    update: function(showcase_image, callback) {
        var db = shopdb.db.getInstance();
        db.showcase_image.where("id=" + showcase_image.id).firstOrDefault(function(dbshowcase_image) {
            dbshowcase_image.updateFrom(showcase_image);
            db.showcase_image.update(dbshowcase_image);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().showcase_image.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().showcase_image.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Utente = function () {
    nova.data.Entity.call(this);
	this.utente_id = '';
	this.merchant_id = '';
	this.pin = '';
	this.imei = '';
	this.token = '';
	this.ean128 = '';
	this.last_modified = new Date();
	this.deleted = false;
	this.dirty = true;
	this.name = '';
};

Utente.prototype = new nova.data.Entity();
Utente.constructor = Utente;

Utente.prototype.updateFrom = function(bean) {
	this.utente_id = bean.utente_id;
	this.merchant_id = bean.merchant_id;
	this.pin = bean.pin;
	this.imei = bean.imei;
	this.token = bean.token;
	this.ean128 = bean.ean128;
	this.last_modified = bean.last_modified;
	this.deleted = bean.deleted;
	this.dirty = bean.dirty;
	this.name = bean.name;
};/*
* AUTOGENERATE NOT MODIFY
*/

var UtenteService = function() {};

UtenteService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().utente.toArray(callback);
    },
    add: function(utente, callback) {
        var db = shopdb.db.getInstance();
        db.utente.add(utente);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.utente.removeByWhere("id=" + id, callback);
    },
    update: function(utente, callback) {
        var db = shopdb.db.getInstance();
        db.utente.where("id=" + utente.id).firstOrDefault(function(dbutente) {
            dbutente.updateFrom(utente);
            db.utente.update(dbutente);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
    getMessageWithutenteids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.message.where("utente_id=" +bean.utente_id).toArray(callback);
},
    getOfferWithutenteids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.offer.where("utente_id=" +bean.utente_id).toArray(callback);
},
    getShowcaseWithutenteids: function(bean, callback){
		var db = shopdb.db.getInstance();
       	db.showcase.where("utente_id=" +bean.utente_id).toArray(callback);
},
        
    get: function(id, callback) {
        shopdb.db.getInstance().utente.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().utente.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Configuration = function () {
    nova.data.Entity.call(this);
	this.chiave = '';
	this.valore = '';
};

Configuration.prototype = new nova.data.Entity();
Configuration.constructor = Configuration;

Configuration.prototype.updateFrom = function(bean) {
	this.chiave = bean.chiave;
	this.valore = bean.valore;
};/*
* AUTOGENERATE NOT MODIFY
*/

var ConfigurationService = function() {};

ConfigurationService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().configuration.toArray(callback);
    },
    add: function(configuration, callback) {
        var db = shopdb.db.getInstance();
        db.configuration.add(configuration);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.configuration.removeByWhere("id=" + id, callback);
    },
    update: function(configuration, callback) {
        var db = shopdb.db.getInstance();
        db.configuration.where("id=" + configuration.id).firstOrDefault(function(dbconfiguration) {
            dbconfiguration.updateFrom(configuration);
            db.configuration.update(dbconfiguration);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().configuration.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().configuration.query(sql,callback,extrafields);
    }
    
    
    
      
};
/*
* AUTOGENERATE NOT MODIFY
*/
var Image_sync = function () {
    nova.data.Entity.call(this);
	this.image_id = '';
	this.type = '';
};

Image_sync.prototype = new nova.data.Entity();
Image_sync.constructor = Image_sync;

Image_sync.prototype.updateFrom = function(bean) {
	this.image_id = bean.image_id;
	this.type = bean.type;
};/*
* AUTOGENERATE NOT MODIFY
*/

var Image_syncService = function() {};

Image_syncService.prototype = {
    getAll: function(callback) {
        shopdb.db.getInstance().image_sync.toArray(callback);
    },
    add: function(image_sync, callback) {
        var db = shopdb.db.getInstance();
        db.image_sync.add(image_sync);
        db.saveChanges(callback);
    },
    deleteUser: function(id, callback) {
        var db = shopdb.db.getInstance();
        db.image_sync.removeByWhere("id=" + id, callback);
    },
    update: function(image_sync, callback) {
        var db = shopdb.db.getInstance();
        db.image_sync.where("id=" + image_sync.id).firstOrDefault(function(dbimage_sync) {
            dbimage_sync.updateFrom(image_sync);
            db.image_sync.update(dbimage_sync);
            db.saveChanges(function() {
               callback && callback();
            });
        });
    },
    
    
    /* Metodi per foreingkey */
        
    get: function(id, callback) {
        shopdb.db.getInstance().image_sync.firstOrDefault(callback, "id=" + id);
    },
    
    query: function(sql, callback, extrafields){
    	 shopdb.db.getInstance().image_sync.query(sql,callback,extrafields);
    }
    
    
    
      
};