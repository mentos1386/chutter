angular.module('templates-me', []).run(['$templateCache', function($templateCache) {
  $templateCache.put("../app/partials/me/dashboard.html",
    "<div layout=row layout-fill=layout-fill flex=flex><md-grid-list flex=flex md-cols-gt-md=6 md-cols-md=2 md-cols-sm=1 md-gutter=12px md-gutter-gt-sm=8px md-row-height=2:2 md-row-height-gt-md=1:1><md-grid-tile md-colspan=2 md-colspan-sm=1 md-rowspan=3 class=gray><md-grid-tile-header><h3>Notifications</h3></md-grid-tile-header><md-list><md-list-item>/u/bob commented on your post</md-list-item><md-list-item>/u/jim has fucked you in the ass</md-list-item><md-list-item>You've been banned from shilling in /c/conspiracy</md-list-item></md-list></md-grid-tile><md-grid-tile class=green><md-grid-tile-header><h3>MirrorNinja</h3></md-grid-tile-header></md-grid-tile><md-grid-tile md-colspan=2 md-colspan-sm=1 md-rowspan=2 class=red><md-grid-tile-header><h3>Message the admin</h3></md-grid-tile-header></md-grid-tile><md-grid-tile md-rowspan=2 class=green><md-grid-tile-footer><h3>#6: (2r x 1c)</h3></md-grid-tile-footer></md-grid-tile><md-grid-tile md-rowspan=2 class=blue><md-grid-tile-footer><h3>#4: (2r x 1c)</h3></md-grid-tile-footer></md-grid-tile></md-grid-list></div>");
  $templateCache.put("../app/partials/me/index.html",
    "<!DOCTYPE html><html lang=en ng-app=MeApp xmlns:ng=http://angularjs.org><head><base href=\"/me/\"><link rel=icon type=image/png href=\"favicon.ico\"><link rel=\"shortcut icon\" type=image/png href=\"favicon.ico\"><meta name=fragment content=\"!\"><meta charset=\"utf-8\"><meta content=\"telephone=no\" name=\"format-detection\"><meta content=\"width=device-width,minimum-scale=1,maximum-scale=1,user-scalable=no\" name=\"viewport\"><meta content=ZYCtjzD0MQsstNXtDL7ZQyRzkj61deTZWYgEeMmCGdY name=\"google-site-verification\"><link href=\"https://www.chutter.co/\" rel=\"canonical\"><link href=/vendor/fontawesome/css/font-awesome.min.css rel=stylesheet><link href=/vendor/fontawesome/css/font-awesome.css.map rel=stylesheet><link href=/vendor/angular-material/angular-material.css rel=stylesheet><link href=/css/application.css rel=stylesheet><link href=/css/me.css rel=stylesheet><link href=/css/comments.css rel=stylesheet><link href=/css/post.css rel=stylesheet><link href=/css/mediaPlayer.css rel=stylesheet><link href=/css/notifications.css rel=stylesheet><title>Chutter &mdash;</title></head><body layout=row layout-fill=layout-fill><ui-view layout=column layout-fill=layout-fill></ui-view><script src=/js/compiled/application.min.js></script><script src=/js/compiled/me.min.js></script><script src=//platform.twitter.com/widgets.js></script></body></html>");
  $templateCache.put("../app/partials/me/layout.html",
    "<md-toolbar class=\"md-whiteframe-z1 md-tall\" id=me-toolbar><div ng-show=\"user &amp;&amp; user.id\" layout=row flex=100 class=md-toolbar-tools><div class=toolbar-container><img ng-src=vendor/mr-chutter.png style=\"width: 35px\" hide-sm=\"hide-sm\"><md-button ng-click=toggleLeft() hide-gt-sm=hide-gt-sm class=md-icon-button><i class=\"fa fa-align-justify fa-fw\"></i></md-button><a ui-sref=home.all flex=flex ng-click=toggleLeft() hide-sm=hide-sm id=brand>chutter</a></div><span flex=flex></span><div hide-sm=hide-sm hide-md=hide-md layout=row layout-align=\"end end\" class=toolbar-container><md-button ng-if=user.moderator href=/moderation target=_self>moderation</md-button><md-button ng-if=user.manager href=/management target=_self>management</md-button><md-button href=/me/notifications ng-bind=user.username target=_self></md-button><md-button href=/me/conversations target=_self hide-sm=hide-sm><i class=\"fa fa-envelope-o fa-fw\"></i><md-tooltip>Messages</md-tooltip></md-button><md-button ng-click=logout() hide-sm=hide-sm><i class=\"fa fa-sign-out fa-fw\"></i><md-tooltip>Log out</md-tooltip></md-button></div></div><div layout=row class=\"md-toolbar-tools md-toolbar-tools-bottom\"><div layout=row layout-align=\"start center\" class=toolbar-container><a ng-bind=user.username></a></div><span flex=flex></span><div layout=row layout-align=\"start center\" class=toolbar-container><span flex=flex></span></div></div></md-toolbar><md-content layout=row flex=flex><md-sidenav md-component-id=left md-is-locked-open=\"$mdMedia('gt-md')\" class=md-sidenav-left><md-content class=nav-menu id=scrolly-left><md-list class=nav-list><md-list-item><md-button aria-label=Inbox ui-sref=home.notifications ui-sref-active=md-primary><i class=\"fa fa-comments fa-fw\"></i>Notifications</md-button></md-list-item><md-list-item><md-button aria-label=Inbox ui-sref=home.conversations ui-sref-active=md-primary><i class=\"fa fa-envelope-o fa-fw\"></i>Inbox</md-button></md-list-item><md-list-item><md-button aria-label=Inbox ui-sref=home.submissions ui-sref-active=md-primary><i class=\"fa fa-navicon fa-fw\"></i>Submissions</md-button></md-list-item><md-list-item><md-button aria-label=Saved ui-sref=home.saved ui-sref-active=md-primary><i class=\"fa fa-star fa-fw\"></i>Saved</md-button></md-list-item><md-list-item><md-button aria-label=Preferences ui-sref=home.preferences ui-sref-active=md-primary><i class=\"fa fa-cog fa-fw\"></i>Preferences</md-button></md-list-item><md-list-item><md-button aria-label=Stats ui-sref=home.stats ui-sref-active=md-primary><i class=\"fa fa-line-chart fa-fw\"></i>Stats</md-button></md-list-item></md-list></md-content></md-sidenav><md-content flex=flex layout=row class=md-whiteframe-z1 id=content><ui-view layout-fill=true layout=column></ui-view><media-player layout=column id=player></media-player></md-content><md-sidenav md-component-id=right md-is-locked-open=\"$mdMedia('gt-md')\" class=\"md-sidenav-right gray\" id=right-rail><md-content id=scrolly-right><div layout=column ui-view=right-rail></div></md-content></md-sidenav></md-content>");
  $templateCache.put("../app/partials/me/preferences.html",
    "");
  $templateCache.put("../app/partials/me/saved.html",
    "");
  $templateCache.put("../app/partials/me/stats.html",
    "");
  $templateCache.put("../app/partials/me/submissions.html",
    "<md-content flex=flex class=md-whiteframe-z2><media-player layout=column id=player></media-player><md-list><post ng-repeat=\"post in page.posts\" post=post post-index=$index layout=row></post></md-list></md-content><md-sidenav md-component-id=right md-is-locked-open=\"$mdMedia('gt-md')\" class=\"md-sidenav-right gray md-whiteframe-z1\"><div layout=column layout-padding=layout-padding layout-margin=layout-margin><div><h4 class=md-title>Your Submissions</h4></div><div><md-input-container><label>Filter</label><input ng-model=\"searchPredicate\"></md-input-container></div></div></md-sidenav>");
  $templateCache.put("../app/partials/me/conversations/compose.html",
    "<div><div layout=column layout-padding=layout-padding><form ng-submit=submit()><div layout=row><md-input-container flex=flex><label>recipient's username</label><input ng-model=newConversation.recipient_username required></md-input-container></div><div layout=row><md-input-container flex=flex><label>Say something nice...</label><textarea ng-model=newConversation.messages_attributes[0].body type=text rows=10></textarea></md-input-container></div><div layout=row><span flex=flex></span><md-button type=submit class=\"md-raised md-priary\">Submit</md-button></div></form></div></div>");
  $templateCache.put("../app/partials/me/conversations/conversation.html",
    "<md-toolbar class=md-hue-2><div class=md-toolbar-tools><div class=toolbar-container>conversation with user</div><span flex=flex></span></div></md-toolbar><md-content flex=flex id=content><div ng-repeat=\"message in conversationState.conversation\" id=conversation><div ng-if=message.other_participant layout=row flex=flex layout-padding=layout-padding><md-button ng-bind=message.username.charAt(0) class=\"md-fab md-accent md-hue-2\"><md-tooltip>{{message.username}}</md-tooltip></md-button><div layout-padding=layout-padding layout=column class=\"message grey md-whiteframe-z1\"><div ng-bind=message.body class=body></div></div></div><div ng-if=!message.other_participant layout=row flex=flex layout-padding=layout-padding layout-align=\"end start\"><div layout-padding=layout-padding layout=column class=\"message md-whiteframe-z1\"><div flex=flex class=body><p ng-bind=message.body></p></div></div><md-button ng-bind=message.username.charAt(0) class=\"md-fab md-primary\"><md-tooltip>{{message.username}}</md-tooltip></md-button></div></div></md-content><div class=md-padding id=reply><form ng-submit=reply() class=reply><md-input-container flex=flex><label>Reply</label><textarea ng-model=replyText type=text></textarea></md-input-container><div layout=row><span flex=flex></span><md-button type=submit class=\"md-raised md-primary\">Send</md-button></div></form></div>");
  $templateCache.put("../app/partials/me/conversations/conversationList.html",
    "<div layout=row flex=flex id=conversation-header><md-button ui-sref=home.conversations.compose class=md-icon-button><i class=\"fa fa-edit fa-fw\"></i></md-button></div><md-content><md-list><md-list-item ng-repeat=\"convo in conversationState.conversations\" class=md-3-line><a ui-sref=\"home.conversations.conversation({id: convo.id})\"><div class=md-avatar></div><div class=md-list-item-text><h3 ng-bind=convo.recipient_name></h3><p ng-bind=\"convo.lru_message | truncate:50\"></p></div></a></md-list-item></md-list></md-content>");
  $templateCache.put("../app/partials/me/conversations/conversations.html",
    "<div layout=column flex=flex><div layout=row layout-padding=layout-padding class=md-whiteframe-z1 id=conversation-header><span>conversation with \"username\"</span><span flex=flex></span><md-input-container><label>Filter messages</label><input></md-input-container></div><md-content ui-view=middle layout-margin=true id=content-container><div flex=flex layout-fill=layout-fill><h1>this needs to be styled with some landing page text, and a short cut to the compose page (see button in right rail)</h1></div></md-content></div>");
  $templateCache.put("../app/partials/me/notifications/comment.html",
    "<div ng-click=open() class=context><md-button class=\"md-fab md-mini md-hue-2\"><i class=\"fa fa-comments fa-fw\"></i></md-button></div><div layout=row layout-sm=column ng-click=open() class=content><div class=mentionable><h4 ng-bind=\"'Re: ' + entity.body\"></h4></div><div flex=flex ng-switch=entity.notifications.length class=tagline><p ng-switch-when=1 ng-bind=notifications[0].body></p><p ng-switch-default=true ng-bind=\"entity.notifications.length + ' new notifications'\"></p></div></div>");
  $templateCache.put("../app/partials/me/notifications/notification-view.html",
    "<div ng-switch=viewer.entity.entityable layout=column flex=flex><div ng-switch-when=comment></div><div ng-switch-when=post><div layout=row layout-align=\"start center\" layout-padding=layout-padding class=entity-header><a ng-bind=\"'Re: ' + viewer.entity.title\" href=#></a><span flex=flex></span><md-button ng-click=close() class=md-icon-button><i class=\"fa fa-close fa-fw\"></i></md-button></div><md-content class=notifications-list-content><div ng-repeat=\"notification in viewer.notifications\" ng-switch=notification.entityable class=notifications-list><div ng-switch-when=comment layout=row class=notification-list-item><div class=context><md-button class=\"md-fab md-mini md-primary\"><i class=\"fa fa-comments fa-fw\"></i></md-button></div><div layout=row layout-align=\"start center\" class=content><div class=mentionable><h4 ng-bind=notification.username></h4></div><div flex=flex class=tagline><p ng-bind=notification.body></p></div></div></div><div ng-switch-when=removed layout=row class=notification-list-item><div class=context><md-button class=\"md-fab md-mini md-warn\"><i class=\"fa fa-ban fa-fw\"></i></md-button></div><div layout=row layout-align=\"start center\" class=content><div class=mentionable><h4 ng-bind=notification.community_name></h4></div><div flex=flex class=tagline><p ng-bind=\"'your post was removed from /c/' +notification.community_slug\"></p></div></div></div><md-divider></md-divider><div ng-switch-when=mention><span>hi</span></div></div></md-content></div></div>");
  $templateCache.put("../app/partials/me/notifications/notifications.html",
    "<div layout-padding=layout-padding layout-margin=layout-margin layout=column layout-fill=layout-fill id=notifications-container><notification-view layout=row class=md-whiteframe-z1></notification-view><notification ng-repeat=\"entity in notifiable_entities\" entity=entity></notification></div>");
  $templateCache.put("../app/partials/me/notifications/post.html",
    "<div class=context><md-button class=\"md-fab md-mini md-primary\"><i class=\"fa fa-align-justify fa-fw\"></i></md-button></div><div layout=row layout-sm=column layout-align=\"start center\" flex=flex class=content><div flex=25 class=mentionable><h4 ng-bind=\"'Re: ' + entity.title | truncate: 40\"></h4></div><div flex=50 class=tagline><p ng-bind=\"entity.notifications.length + ' new notifications'\"></p></div></div>");
}]);
