"use strict";function Router(e,r){e.state("splash",{url:"/",templateUrl:"/templates/splash.html",controller:"LoginController as login"}).state("profile",{url:"/profile/:id",templateUrl:"/templates/profile.html",controller:"ProfileController as profile"}).state("groupsNew",{url:"/group/new",templateUrl:"/templates/groupNew.html",controller:"GroupsNewController as groupsNew"}).state("groupProfile",{url:"/group/profile/:id",templateUrl:"/templates/groupProfile.html",controller:"GroupsShowController as groupsShow"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("groupJoin",{url:"/join/:groupId",templateUrl:"/templates/login.html",controller:"GroupsJoinController as groupsJoin"}).state("profileEdit",{url:"/profile/:id/edit",templateUrl:"/templates/profileEdit.html",controller:"ProfileEditController as profileEdit"}).state("groupEdit",{url:"/group/:id/edit",templateUrl:"/templates/groupEdit.html",controller:"GroupEditController as groupEdit"}),r.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1117238161723560"}),console.log(e)}function RegisterController(e,r){function o(){e.signup(t.user).then(function(){r.go("login")}).catch(function(e){console.log(e),e.data.error.code&&11e3===e.data.error.code&&t.form.email.$setValidity("taken",!1),e.data.error.errors.passwordConfirmation&&t.form.passwordConfirmation.$setValidity("match",!1)}).catch(function(e){console.log(e)})}var t=this;t.user={},t.submit=o}function LoginController(e,r,o,t){function l(){r.login(i.credentials).then(function(){var e=r.getPayload(),l=t.localStorage.getItem("groupId");t.localStorage.setItem("userId",e._id),l?(t.localStorage.removeItem("groupId"),o.go("groupJoin",{groupId:l})):o.go("profile")})}function n(e){r.authenticate(e).then(function(){o.go("profile")})}var i=this;i.credentials={},r.isAuthenticated()&&o.go("profile"),i.submit=l,i.authenticate=n}function dragDrop(){var e=new FileReader;return{restrict:"E",replace:!0,templateUrl:"templates/dragDrop.html",scope:{base64:"="},link:function(r,o){r.base64=null,r.active=!1,e.onload=function(){r.base64=e.result,r.$apply()},o.on("dragover",function(){r.active=!0,r.$apply(),console.log("yo you are hovering")}).on("dragover",function(e){e.preventDefault()}).on("dragleave",function(){r.active=!1,r.$apply()}).on("drop",function(r){r.preventDefault(),console.log("you dropped");var o=(r.dataTransfer.files||r.target.files)[0];e.readAsDataURL(o)})}}}function Group(e){return new e("/groups/:id",{id:"@_id"},{update:{method:"PUT"},getGroups:{method:"GET",isArray:!0}})}function GroupsNewController(e,r,o){function t(){n.group.groupAdmin=o.getPayload()._id,n.group.groupMembers.push(o.getPayload()._id),e.save(n.group,function(e){r.go("groupProfile",{id:e._id})})}function l(){event.preventDefault(),n.emailArray.push(n.emailToAddToArray)}var n=this;n.group={},n.group.groupMembers=[],n.createGroupProfile=t,n.add=l}function GroupsShowController(e,r,o,t){function l(){var e="Bearer "+o.getToken(),r={method:"PUT",url:"/groups/"+s.group._id+"/draw",headers:{authorizaton:e}};t(r).then(function(){return alert("members matched - check your email!")})}function n(){return console.log("Group admin ID:",s.group.groupAdmin._id,"Users ID",p),console.log(s.group.groupAdmin._id===p),s.group.groupAdmin._id===p}function i(){s.message="",s.emailArray.includes(s.emailToAddToArray)?s.message="Email already added":(s.emailArray.push(s.emailToAddToArray),s.emailToAddToArray="")}function a(){console.log(s);var e="Bearer "+o.getToken(),r={method:"POST",url:"/sendEmail",headers:{authorizaton:e},data:{emailArray:s.emailArray,groupName:s.group.groupName,groupId:s.group._id}};t(r).then(function(e){s.emailArray=[],s.message="Your Invites Have Been Sent!",console.log(e)})}function u(){s.group.$remove(function(){r.go("groupsNew")})}var s=this;s.group=e.get(r.params),s.emailToAddToArray="",s.emailArray=[];var d=o.getPayload(),p=d._id;s.delete=u,s.isLoggedIn=o.isAuthenticated,s.addEmail=i,s.sendEmail=a,s.drawMatches=l,s.isGroupAdmin=n}function GroupsEditController(e,r){function o(){t.group.$update(function(){r.go("groupEdit",r.params)})}var t=this;t.group=e.get(r.params),this.update=o}function GroupsJoinController(e,r,o,t,l){t.isAuthenticated()?!function(){var r=t.getPayload()._id,l=o.params.groupId;e.get({id:l},function(e){var t=e.groupMembers.filter(function(e){return e._id===r});0===t.length?(e.groupMembers.push(r),e.$update(function(){o.go("groupProfile",{id:l})})):o.go("groupProfile",{id:l})})}():(console.log("hey"),l.localStorage.setItem("groupId",o.params.groupId),o.go("register"))}function MainController(e,r,o,t){function l(){i.menuVisible=!i.menuVisible}function n(){e.logout().then(function(){localStorage.removeItem("userId"),r.go("splash")})}var i=this;i.isLoggedIn=e.isAuthenticated,i.message=null,i.menuVisible=!1,o.$on("$stateChangeStart",function(){i.menuVisible=!1}),i.logout=n,i.toggleMenu=l}function UploadController(){var e=this;e.data={}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UsersIndexController(e){var r=this;r.all=e.query()}function ProfileController(e,r,o,t,l,n){function i(){C.menuVisible=!C.menuVisible}function a(){return A===v}function u(){event.preventDefault(),C.user.likes.includes(C.likeToAddToArray)?C.message="You already like that":(C.user.likes.push(C.likeToAddToArray),C.likeToAddToArray="",C.user.$update(function(e){return e}),C.message="")}function s(){event.preventDefault(),C.user.dislikes.includes(C.dislikeToAddToArray)?C.message="You already dislike that":(C.user.dislikes.push(C.dislikeToAddToArray),C.dislikeToAddToArray="",C.user.$update(function(e){return e}),C.message="")}function d(e,o){var t=C.user.likes.indexOf(e);C.user.likes.splice(t,1),C.user.$update(function(){r.reload()})}function p(e,o){var t=C.user.dislikes.indexOf(e);C.user.dislikes.splice(t,1),C.user.$update(function(){r.reload()})}function c(){C.user.profileImage=C.imageToAdd,C.user.$update(function(){r.reload()})}function g(){C.usersGroups=[];var e="users/groups/"+v;t({url:e,method:"GET"}).then(function(e){C.usersGroups=e.data},function(e){console.log(e)})}function f(e,r){for(var o=0;o<r.length;o++)if(r[o].match===e)return r[o]}function m(){C.usersCurrentMatches={},C.usersMatches=[];var e="users/groups/"+v;t({url:e,method:"GET"}).then(function(e){C.usersCurrentMatches=e.data,C.usersCurrentMatches.forEach(function(e){var r=f(v,e.matches);void 0!==r&&C.usersMatches.push(r)})},function(e){console.log(e)})}function h(e,r){C.loaded=!1,C.giftArray=[],C.site=r;var o="/gifts/"+r+"/"+e;return"amazon"===r?t({url:o,method:"GET"}).then(function(e){C.giftArray=e.data.Items.Item.splice(0,12),C.loaded=!0},function(e){console.log(e)}):"etsy"===r?t({url:o,method:"GET"}).then(function(e){C.loaded=!0;for(var r=0;r<12&&r<e.data.results.length;r++){var o={DetailPageURL:e.data.results[r].url,MediumImage:{URL:e.data.results[r].MainImage.url_170x135},ItemAttributes:{ListPrice:{FormattedPrice:e.data.results[r].price}}};C.giftArray.push(o)}console.log(C.giftArray)},function(e){console.log(e)}):void 0}var C=this,$=o.getPayload();C.menuVisible=!1,n.$on("$stateChangeStart",function(){C.menuVisible=!1}),C.toggleMenu=i;var v=r.params.id;C.usersMatches;var A=$._id;""===v&&(v=A),e.get({id:v},function(e){C.user=e;var r=C.user.likes[Math.floor(Math.random()*C.user.likes.length)];h(r,"etsy")}),C.isLoggedIn=o.isAuthenticated,g(),m(),C.add=u,C.getGifts=h,C.addDislikes=s,C.removeLike=d,C.removeDislike=p,C.isOwnProfile=a,C.giftArray=[],C.loaded=!1,C.addImage=c}function ProfileEditController(e,r){function o(){e.update(t.profile,function(){r.go("profile",r.params)})}var t=this;t.profile=e.get(r.params),this.update=o}function UserEditController(e,r){function o(){t.user.$update(function(){r.go("usersShow",r.params)})}var t=this;t.user=e.get(r.params),this.update=o}angular.module("elfyApp",["ngMessages","ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("elfyApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["User","$auth","$state","$window"],angular.module("elfyApp").directive("dragDrop",dragDrop),angular.module("elfyApp").factory("Group",Group),Group.$inject=["$resource"],angular.module("elfyApp").controller("GroupsNewController",GroupsNewController).controller("GroupsShowController",GroupsShowController).controller("GroupsEditController",GroupsEditController).controller("GroupsJoinController",GroupsJoinController),GroupsNewController.$inject=["Group","$state","$auth"],GroupsShowController.$inject=["Group","$state","$auth","$http"],GroupsEditController.$inject=["Group","$state"],GroupsJoinController.$inject=["Group","User","$state","$auth","$window"],angular.module("elfyApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope","$http"],angular.module("elfyApp").controller("UploadController",UploadController),angular.module("elfyApp").factory("User",User),User.$inject=["$resource"],angular.module("elfyApp").controller("UsersIndexController",UsersIndexController).controller("ProfileController",ProfileController).controller("UserEditController",UserEditController).controller("ProfileEditController",ProfileEditController),UsersIndexController.$inject=["User"],ProfileController.$inject=["User","$state","$auth","$http","$scope","$rootScope"],ProfileEditController.$inject=["User","$state"],UserEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
