(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{"qCZ/":function(e,t,r){"use strict";r.d(t,"a",function(){return d});var a=r("t/Na"),n=r("F/XL"),s=r("67Y/"),o=r("9Z1F"),i=r("AytR"),p=r("CcnG"),u=i.a.url+"/v1/users",c={headers:new a.g({"Content-Type":"application/json"})},d=function(){function e(e){this.http=e}return e.prototype.parseUser=function(e){return{id:e.id,email:e.attributes.email,enabled:e.attributes.enabled,lastname:e.attributes.lastname,name:e.attributes.name,password:e.attributes.password}},e.prototype.parseUsers=function(e){for(var t=[],r=0;r<e.length;r++)t[r]=this.parseUser(e[r]);return t},e.prototype.getUsers=function(){var e=this;return this.http.get(""+u).pipe(Object(s.a)(function(t){return e.parseUsers(t.data)}),Object(o.a)(this.handleError("getUsers",[])))},e.prototype.getProfessionals=function(){var e=this;return this.http.get(u+"/professionals").pipe(Object(s.a)(function(t){return e.parseUsers(t.data)}),Object(o.a)(this.handleError("getProfessionals",[])))},e.prototype.getUser=function(e){var t=this;return this.http.get(u+"/"+e).pipe(Object(s.a)(function(e){return t.parseUser(e.data)}),Object(o.a)(this.handleError("getUser id="+e)))},e.prototype.searchUsers=function(e){var t=this;return e.trim()?(e=e.toLowerCase(),e=encodeURI(e),this.http.get(u+"/search/"+e).pipe(Object(s.a)(function(e){return t.parseUsers(e.data)}),Object(o.a)(this.handleError("searchusers",[])))):Object(n.a)([])},e.prototype.addUser=function(e){var t=this;return this.http.post(u,{data:{attributes:{email:e.email,enabled:e.enabled,lastname:e.lastname,name:e.name,password:e.password},type:"user"}},c).pipe(Object(s.a)(function(e){return t.parseUser(e.data)}),Object(o.a)(this.handleError("addUser")))},e.prototype.updateUser=function(e){return this.http.patch(u+"/"+("number"==typeof e?e:e.id),{data:{attributes:{email:e.email,enabled:e.enabled,lastname:e.lastname,name:e.name},id:e.id,type:"user"}},c).pipe(Object(s.a)(function(e){return e.data}),Object(o.a)(this.handleError("updateUser")))},e.prototype.deleteUser=function(e){return this.http.delete(u+"/"+e,c).pipe(Object(o.a)(this.handleError("deleteUser")))},e.prototype.handleError=function(e,t){return void 0===e&&(e="operation"),function(r){return console.error(e+" failed: "+r.message),Object(n.a)(t)}},e.ngInjectableDef=p.V({factory:function(){return new e(p.Z(a.c))},token:e,providedIn:"root"}),e}()}}]);