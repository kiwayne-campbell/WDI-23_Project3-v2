"use strict";function Router(e,r){e.state("splash",{url:"/",templateUrl:"/templates/splash.html",controller:"LoginController as login"}).state("profile",{url:"/profile/:id",templateUrl:"/templates/profile.html",controller:"ProfileController as profile"}).state("groupsNew",{url:"/group/new",templateUrl:"/templates/groupNew.html",controller:"GroupsNewController as groupsNew"}).state("groupProfile",{url:"/group/profile/:id",templateUrl:"/templates/groupProfile.html",controller:"GroupsShowController as groupsShow"}).state("register",{url:"/register",templateUrl:"/templates/register.html",controller:"RegisterController as register"}).state("login",{url:"/login",templateUrl:"/templates/login.html",controller:"LoginController as login"}).state("groupJoin",{url:"/join/:groupId",templateUrl:"/templates/login.html",controller:"GroupsJoinController as groupsJoin"}).state("profileEdit",{url:"/profile/:id/edit",templateUrl:"/templates/profileEdit.html",controller:"ProfileEditController as profileEdit"}),r.otherwise("/")}function Auth(e){e.loginUrl="/login",e.signupUrl="/register",e.tokenPrefix="",e.facebook({clientId:"1117238161723560"}),console.log(e)}function RegisterController(e,r){function o(){e.signup(t.user).then(function(){r.go("login")})}var t=this;t.user={},t.submit=o}function LoginController(e,r,o,t){function l(){r.login(i.credentials).then(function(){var e=r.getPayload(),l=t.localStorage.getItem("groupId");t.localStorage.setItem("userId",e._id),l?(t.localStorage.removeItem("groupId"),o.go("groupJoin",{groupId:l})):o.go("profile")})}function n(e){r.authenticate(e).then(function(){o.go("profile")})}var i=this;i.credentials={},r.isAuthenticated()&&o.go("profile"),i.submit=l,i.authenticate=n}function dragDrop(){var e=new FileReader;return{restrict:"E",replace:!0,templateUrl:"templates/dragDrop.html",scope:{base64:"="},link:function(r,o){r.base64=null,r.active=!1,e.onload=function(){r.base64=e.result,r.$apply()},o.on("dragover",function(){r.active=!0,r.$apply(),console.log("yo you are hovering")}).on("dragover",function(e){e.preventDefault()}).on("dragleave",function(){r.active=!1,r.$apply()}).on("drop",function(r){r.preventDefault(),console.log("you dropped");var o=(r.dataTransfer.files||r.target.files)[0];e.readAsDataURL(o)})}}}function Group(e){return new e("/groups/:id",{id:"@_id"},{update:{method:"PUT"},getGroups:{method:"GET",isArray:!0}})}function GroupsNewController(e,r,o){function t(){n.group.groupAdmin=o.getPayload()._id,n.group.groupMembers.push(o.getPayload()._id),e.save(n.group,function(e){r.go("groupProfile",{id:e._id})})}function l(){event.preventDefault(),n.emailArray.push(n.emailToAddToArray)}var n=this;n.group={},n.group.groupMembers=[],n.createGroupProfile=t,n.add=l}function GroupsShowController(e,r,o,t){function l(){var e="Bearer "+o.getToken(),r={method:"PUT",url:"/groups/"+u.group._id+"/draw",headers:{authorizaton:e}};t(r).then(function(e){return alert("drawn group")})}function n(){u.message="",u.emailArray.includes(u.emailToAddToArray)?u.message="Email already added":(u.emailArray.push(u.emailToAddToArray),u.emailToAddToArray="")}function i(){console.log(u);var e="Bearer "+o.getToken(),r={method:"POST",url:"/sendEmail",headers:{authorizaton:e},data:{emailArray:u.emailArray,groupName:u.group.groupName,groupId:u.group._id}};t(r).then(function(e){u.emailArray=[],u.message="Your Invites Have Been Sent!",console.log(e)})}function a(){u.group.$remove(function(){r.go("groupsNew")})}var u=this;u.group=e.get(r.params),u.emailToAddToArray="",u.emailArray=[],u.delete=a,u.isLoggedIn=o.isAuthenticated,u.addEmail=n,u.sendEmail=i,u.drawMatches=l}function GroupsEditController(e,r){function o(){t.group.$update(function(){r.go("groupProfile",r.params)})}var t=this;t.group=e.get(r.params),this.update=o}function GroupsJoinController(e,r,o,t,l){t.isAuthenticated()?!function(){var r=t.getPayload()._id,l=o.params.groupId;e.get({id:l},function(e){var t=e.groupMembers.filter(function(e){return e._id===r});0===t.length?(e.groupMembers.push(r),e.$update(function(){o.go("groupProfile",{id:l})})):o.go("groupProfile",{id:l})})}():(console.log("hey"),l.localStorage.setItem("groupId",o.params.groupId),o.go("register"))}function MainController(e,r,o,t){function l(){e.logout().then(function(){localStorage.removeItem("userId"),r.go("splash")})}var n=this;n.isLoggedIn=e.isAuthenticated,n.message=null,n.logout=l}function UploadController(){var e=this;e.data={}}function User(e){return new e("/users/:id",{id:"@_id"},{update:{method:"PUT"}})}function UsersIndexController(e){var r=this;r.all=e.query()}function ProfileController(e,r,o,t,l){function n(){return C===v}function i(){event.preventDefault(),m.user.likes.includes(m.likeToAddToArray)?m.message="You already like that":(m.user.likes.push(m.likeToAddToArray),m.likeToAddToArray="",m.user.$update(function(e){return e}),m.message="")}function a(){event.preventDefault(),m.user.dislikes.includes(m.dislikeToAddToArray)?m.message="You already dislike that":(m.user.dislikes.push(m.dislikeToAddToArray),m.dislikeToAddToArray="",m.user.$update(function(e){return e}),m.message="")}function u(e,o){var t=m.user.likes.indexOf(e);m.user.likes.splice(t,1),m.user.$update(function(e){r.reload()})}function s(e,o){var t=m.user.dislikes.indexOf(e);m.user.dislikes.splice(t,1),m.user.$update(function(e){r.reload()})}function d(){m.user.profileImage=m.imageToAdd,m.user.$update(function(e){r.reload()})}function p(){m.usersGroups=[];var e="users/groups/"+v;t({url:e,method:"GET"}).then(function(e){m.usersGroups=e.data},function(e){console.log(e)})}function g(e,r){for(var o=0;o<r.length;o++)if(r[o].match===e)return r[o]}function c(){m.usersCurrentMatches={},m.usersMatches=[];var e="users/groups/"+v;t({url:e,method:"GET"}).then(function(e){m.usersCurrentMatches=e.data,m.usersCurrentMatches.forEach(function(e){var r=g(v,e.matches);void 0!==r&&m.usersMatches.push(r)})},function(e){console.log(e)})}function f(e,r){m.loaded=!1,m.giftArray=[],m.site=r;var o="/gifts/"+r+"/"+e;return"amazon"===r?t({url:o,method:"GET"}).then(function(e){m.giftArray=e.data.Items.Item.splice(0,12),m.loaded=!0},function(e){console.log(e)}):"etsy"===r?t({url:o,method:"GET"}).then(function(e){m.loaded=!0;for(var r=0;r<12&&r<e.data.results.length;r++){var o={DetailPageURL:e.data.results[r].url,MediumImage:{URL:e.data.results[r].MainImage.url_170x135},ItemAttributes:{ListPrice:{FormattedPrice:e.data.results[r].price}}};m.giftArray.push(o)}console.log(m.giftArray)},function(e){console.log(e)}):void 0}var m=this,h=o.getPayload(),v=r.params.id;m.usersMatches;var C=h._id;""===v&&(v=C),e.get({id:v},function(e){m.user=e;var r=m.user.likes[Math.floor(Math.random()*m.user.likes.length)];f(r,"etsy")}),m.isLoggedIn=o.isAuthenticated,p(),c(),m.add=i,m.getGifts=f,m.addDislikes=a,m.removeLike=u,m.removeDislike=s,m.isOwnProfile=n,m.giftArray=[],m.loaded=!1,m.addImage=d}function ProfileEditController(e,r){function o(){e.update(t.profile,function(){r.go("profile",r.params)})}var t=this;t.profile=e.get(r.params),this.update=o}function UserEditController(e,r){function o(){t.user.$update(function(){r.go("usersShow",r.params)})}var t=this;t.user=e.get(r.params),this.update=o}angular.module("elfyApp",["ngResource","ui.router","satellizer"]).config(Router).config(Auth),Router.$inject=["$stateProvider","$urlRouterProvider"],Auth.$inject=["$authProvider"],angular.module("elfyApp").controller("RegisterController",RegisterController).controller("LoginController",LoginController),RegisterController.$inject=["$auth","$state"],LoginController.$inject=["User","$auth","$state","$window"],angular.module("elfyApp").directive("dragDrop",dragDrop),angular.module("elfyApp").factory("Group",Group),Group.$inject=["$resource"],angular.module("elfyApp").controller("GroupsNewController",GroupsNewController).controller("GroupsShowController",GroupsShowController).controller("GroupsEditController",GroupsEditController).controller("GroupsJoinController",GroupsJoinController),GroupsNewController.$inject=["Group","$state","$auth"],GroupsShowController.$inject=["Group","$state","$auth","$http"],GroupsEditController.$inject=["Group","$state"],GroupsJoinController.$inject=["Group","User","$state","$auth","$window"],angular.module("elfyApp").controller("MainController",MainController),MainController.$inject=["$auth","$state","$rootScope","$http"],angular.module("elfyApp").controller("UploadController",UploadController),angular.module("elfyApp").factory("User",User),User.$inject=["$resource"],angular.module("elfyApp").controller("UsersIndexController",UsersIndexController).controller("ProfileController",ProfileController).controller("UserEditController",UserEditController).controller("ProfileEditController",ProfileEditController),UsersIndexController.$inject=["User"],ProfileController.$inject=["User","$state","$auth","$http","$scope"],ProfileEditController.$inject=["User","$state"],UserEditController.$inject=["User","$state"];
//# sourceMappingURL=app.js.map
