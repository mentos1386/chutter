angular.module('templates-moderation', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("../app/partials/moderation/dashboard.html",
    "<md-toolbar md-scroll-shrink=true layout-align=center layout=column class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><md-tabs flex=flex class=\"md-primary md-hue-2\"><md-tab><md-tab-label>Overview</md-tab-label></md-tab></md-tabs></div></md-toolbar><ui-view></ui-view>");
  $templateCache.put("../app/partials/moderation/index.html",
    "<!DOCTYPE html><html lang=en ng-app=ModerationApp xmlns:ng=http://angularjs.org><head><base href=\"/moderation/\"><link rel=icon type=image/png href=\"favicon.ico\"><link rel=\"shortcut icon\" type=image/png href=\"favicon.ico\"><meta name=fragment content=\"!\"><meta charset=\"utf-8\"><meta content=\"telephone=no\" name=\"format-detection\"><meta content=\"width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no\" name=\"viewport\"><meta content=ZYCtjzD0MQsstNXtDL7ZQyRzkj61deTZWYgEeMmCGdY name=\"google-site-verification\"><link href=\"https://www.chutter.co/\" rel=\"canonical\"><link href=/vendor/fontawesome/css/font-awesome.min.css rel=stylesheet><link href=/vendor/fontawesome/css/font-awesome.css.map rel=stylesheet><link href=/vendor/angular-material/angular-material.css rel=stylesheet><link href=/vendor/angular-chart.js/dist/angular-chart.css rel=stylesheet><link href=/css/compiled/application.css rel=stylesheet><link href=/css/moderation.css rel=stylesheet><title>Chutter &mdash;</title></head><body layout=row layout-fill=layout-fill><ui-view layout=column layout-fill=layout-fill></ui-view><script src=/js/compiled/application.min.js></script><script src=/js/compiled/moderation.min.js></script><script src=//platform.twitter.com/widgets.js></script></body></html>");
  $templateCache.put("../app/partials/moderation/layout.html",
    "<md-content layout=row flex=flex layout-align=\"end end\"><md-toolbar class=\"md-whiteframe-z1 md-tall\" id=moderation-toolbar><div ng-hide=\"user &amp;&amp; user.id\" layout=row class=md-toolbar-tools><div layout=row layout-align=\"center center\" class=toolbar-container><div class=nav-list-item><md-button style=\"background-color: transparent\" href=\"/\" layout=column layout-align=\"center center\" id=logo><img ng-src=/img/logo.png hide-sm=\"true\"></md-button></div></div><span flex=flex></span><div layout=row layout-align=\"end end\" class=toolbar-container><md-button ng-click=signIn()>Sign In</md-button></div></div><div ng-show=\"user &amp;&amp; user.id\" layout=row flex=100 class=md-toolbar-tools><div layout=row layout-align=\"center center\" class=\"toolbar-container no-padding\"><div class=nav-list-item><md-button style=\"background-color: transparent\" href=\"/\" layout=column layout-align=\"center center\" id=logo><img ng-src=/img/logo.png hide-sm=\"true\"></md-button></div></div><span flex=flex></span><div hide-sm=hide-sm hide-md=hide-md layout=row layout-align=\"end end\" class=toolbar-container><md-button ng-if=user.moderator href=/moderation target=_self>moderation</md-button><md-button ng-if=user.manager href=/management target=_self>management</md-button><md-button href=/me/notifications ng-bind=user.username target=_self></md-button><md-button href=/me/conversations target=_self hide-sm=hide-sm><i class=\"fa fa-envelope-o fa-fw\"></i><md-tooltip>Messages</md-tooltip></md-button><md-button ng-click=logout() hide-sm=hide-sm><i class=\"fa fa-sign-out fa-fw\"></i><md-tooltip>Log out</md-tooltip></md-button></div></div><div layout=row class=\"md-toolbar-tools md-toolbar-tools-bottom\"><div layout=row layout-align=\"start center\" class=toolbar-container><a>Moderation</a></div><span flex=flex></span><div layout=row layout-align=\"center center\" class=toolbar-container id=titles><a href=# ng-bind=page.title.text ng-class=\"{'active': page.secondary_title}\" id=primary-title></a><a ng-if=page.secondary_title ui-sref=\"home.community({id: page.secondary_title.slug})\" ng-bind=page.secondary_title.text id=secondary-title></a></div></div></md-toolbar><md-sidenav md-component-id=left md-is-locked-open=\"$mdMedia('gt-md')\" class=md-sidenav-left><md-content flex=flex role=navigation layout-fill=layout-fill layout=column class=nav-list><div ng-repeat=\"community in communities\" layout=row class=nav-list-item><md-button ui-sref-active=active ui-sref=\"home.community.dashboard({id: community.slug})\" layout=row layout-align=\"center start\"><p ng-bind=::community.name></p></md-button></div></md-content></md-sidenav><div flex=flex layout=row class=md-whiteframe-z1 id=content><ui-view layout=column layout-fill=true></ui-view></div><md-sidenav md-component-id=right md-is-locked-open=\"$mdMedia('gt-md')\" class=md-sidenav-right><div layout=column ui-view=right-rail></div></md-sidenav></md-content>");
  $templateCache.put("../app/partials/moderation/community/activity-log.html",
    "<md-content><table><tr><th>moderator</th><th>action</th><th>what</th><th>entity</th><th>cited rule</th></tr><tr ng-repeat=\"entry in activityLog.activity_log_entries\" ng-switch=entry.entityable_type><td ng-bind=entry.user.username></td><td ng-bind=entry.action></td><td ng-bind=entry.entityable_type></td><td ng-switch-when=Post ng-bind=entry.entityable.title></td><td ng-switch-when=Comment ng-bind=entry.entityable.body></td><td ng-switch-when=User ng-bind=entry.entityable.username></td><td ng-bind=::entry.rule.category></td></tr></table></md-content>");
  $templateCache.put("../app/partials/moderation/community/community.html",
    "<md-toolbar md-scroll-shrink=true layout-align=center layout=column class=\"md-primary md-hue-2\"><div class=md-toolbar-tools><md-tabs flex=flex class=\"md-primary md-hue-2\"><md-tab ui-sref=\"home.community.dashboard({id: page.community.slug})\"><md-tab-label>Dashboard</md-tab-label></md-tab><md-tab ui-sref=\"home.community.modwatch({id: page.community.slug})\"><md-tab-label>Modwatch</md-tab-label></md-tab><md-tab ui-sref=\"home.community.inbox({id: page.community.slug})\"><md-tab-label>Inbox</md-tab-label></md-tab><md-tab ui-sref=\"home.community.queue({id: page.community.slug})\"><md-tab-label>Queue</md-tab-label></md-tab><md-tab ui-sref=\"home.community.policyGroups({id: page.community.slug})\"><md-tab-label>Policy Groups</md-tab-label></md-tab><md-tab ui-sref=\"home.community.settings({id: page.community.slug})\"><md-tab-label>Settings</md-tab-label></md-tab><md-tab ui-sref=\"home.community.rules({id: page.community.slug})\"><md-tab-label>Rules</md-tab-label></md-tab><md-tab ui-sref=\"home.community.activityLog({id: page.community.slug})\"><md-tab-label>Activity Log</md-tab-label></md-tab><md-tab ui-sref=\"home.community.moderators({id: page.community.slug})\"><md-tab-label>Moderators</md-tab-label></md-tab></md-tabs></div></md-toolbar><ui-view></ui-view>");
  $templateCache.put("../app/partials/moderation/community/inbox.html",
    "<h1>hi 2</h1>");
  $templateCache.put("../app/partials/moderation/community/policy-groups.html",
    "<div class=md-padding><h3>Banned Users</h3></div>");
  $templateCache.put("../app/partials/moderation/community/queue.html",
    "<h1>hi3</h1>");
  $templateCache.put("../app/partials/moderation/community/rules.html",
    "<div layout=column><md-list><md-list-item ng-repeat=\"rule in communityRules\" class=md-3-line><div class=md-list-item-text><h3 ng-bind=rule.category></h3><h4 ng-bind=rule.detailed_explanation></h4><p ng-if=rule.general>Applies To: The General Community</p><p ng-if=rule.posts>Applies To: Posts</p><p ng-if=rule.comments>Applies To: Comments</p><p ng-if=rule.discouraged>Severity: Discouraged</p><p ng-if=rule.removal>Severity: Removal</p><p ng-if=rule.ban>Severity: Ban</p></div></md-list-item></md-list></div>");
  $templateCache.put("../app/partials/moderation/community/settings.html",
    "<md-content layout=column class=md-padding><form><div layout=row><md-input-container flex=50><label>Name</label><input ng-model=\"page.community.name\"></md-input-container></div><div><md-input-container><label>Description</label><textarea rows=10 ng-model=page.community.description></textarea></md-input-container></div><div><span flex=flex></span><md-button ng-click=update() class=\"md-primary md-raised\">Save</md-button></div></form></md-content>");
}]);
