define([
    "dojo/_base/declare",  
    "dojo/dom",
    "dojo/dom-geometry",
    "dojo/dom-style",
    "dojo/window",
    "dojox/mobile/View",
], function( declare,dom,domGeometry, domStyle, win,View){

    return declare("dojox.mobile.FixedView", View, {
        tabName:"outertabbar",

        resize: function(){
            //this is for a fixed tabbar 
            //if you dont have one remove this and the tabbox
            //alert(this);
            try{
                var tabBar = dom.byId("headingtop");
                var tabBox = domGeometry.getMarginBox(tabBar);
                
                var tabBar2 = dom.byId("heading");
                var tabBox2 = domGeometry.getMarginBox(tabBar2);
                
            }catch(e){
                alert(e);
            }
            var winBox = win.getBox();
            var height=winBox.h - tabBox.h - tabBox2.h + "px";
            //var height=winBox.h + "px";
            domStyle.set(this.domNode, "height",height);
            // summary:
            //      Calls resize() of each child widget.
            this.inherited(arguments); // scrollable#resize() will be called

        }
    });
});