app = angular.module('Chutter')
app.factory 'PostResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
  $resource API.makeURL('/posts/:id'), { id: '@id' },
    get:
      isArray: false
      url: API.makeURL('/posts/:id')
    query:
      isArray: false
    comments:
      transformRequest: []
      url: API.makeURL('/posts/:id/comments')
      isArray: true
    vote:
      method: 'PUT'
      url: API.makeURL('/posts/:id/vote')
    report:
      url: API.makeURL('/posts/:id/report')
      method: 'POST'
    #regular save is reserved for #create
    save_post: 
      url: API.makeURL('/posts/:id/save')
      method: 'POST'     
    unsave_post: 
      url: API.makeURL('/posts/:id/unsave')
      method: 'POST'  
    notifications:
      url: API.makeURL('/posts/:id/notifications')
      method: 'GET'
      isArray: true
    saved:
      url: API.makeURL('/posts/saved')
      isArray: true
      interceptor: 'response': (response) ->
        Page.posts = response.data
]

app.factory 'CommentResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/comments/:id'), {id: '@id'},
      vote:
        method: 'PUT'
        url: API.makeURL('/comments/:id/vote')
      notifications:
        url: API.makeURL('/comments/:id/notifications')
        method: 'GET'
        isArray: true
        interceptor: 'response': (response) ->
          Page.comments = response.data
]

app.factory 'NetworkResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
  $resource API.makeURL('/networks/:id'), { id: '@id' },
    query:
      isArray: true
    show:
      method: 'GET'
      url: API.makeURL('/networks/:id')
      interceptor: 'response': (response) ->
        Page.network = response.data
    posts:
      method: 'GET'
      url: API.makeURL('/networks/:id/posts')
    news:
      url: API.makeURL("/networks/news")
    list:
      method: 'GET'
      url: API.makeURL('/networks/list')
      isArray: true
      transformResponse: (response) ->
        data = undefined
        data = angular.fromJson(response)
        _.each data, (item) ->
          if item.network_subscription_id
            item.subscribed = true
    communities:
      url: API.makeURL('/networks/:id/communities')
      isArray: true
    list_communities:
      url: API.makeURL('/networks/:id/list_communities')
      isArray: true
      transformResponse: (response) ->
        data = undefined
        data = angular.fromJson(response)
        _.each data, (item) ->
          if item.community_subscription_id
            item.subscribed = true
    subscribe:
      url: API.makeURL('/networks/:id/subscribe')
      method: 'PUT'
      isArray: true
    unsubscribe:
      url: API.makeURL('/networks/:id/unsubscribe')
      method: 'PUT'
      isArray: true
]
app.factory 'CommunityResource', ['$resource', 'Page', 'API', ($resource, Page, API) ->
    $resource API.makeURL('/communities/:id'), { id: '@id' },
      query:
        isArray: true
      show:
        method: 'GET'
        url: API.makeURL('/communities/:id')
        interceptor: 'response': (response) ->
          Page.community = response.data
          Page.title = 
            text: Page.community.network.name
            slug: Page.community.network.slug
          Page.secondary_title = 
            text: Page.community.name
            slug: Page.community.slug
      posts:
        method: 'GET'
        url: API.makeURL('/communities/:id/posts')
      subscribe:
        url: API.makeURL('/communities/:id/subscribe')
        method: 'PUT'
        isArray: true
      unsubscribe:
        url: API.makeURL('/communities/:id/unsubscribe')
        method: 'PUT'
        isArray: true
      rules:
        url: API.makeURL('/communities/:id/rules')
        isArray: true  
      reportableRules:
        url: API.makeURL('/communities/:id/reportable_rules')
        isArray: true  
      activityLog:
        url: API.makeURL('/communities/:id/activity_log')
      moderators:
        url: API.makeURL('/communities/:id/moderators')
        isArray: true
      moderator:
        url: API.makeURL('/communities/:id/moderator')
      updateModerator:
        method: "PUT"
        url: API.makeURL('/communities/:id/update_moderator')
      banList:
        url: API.makeURL('/communities/:id/ban_list')
        isArray: true
      modwatch:
        url: API.makeURL('/communities/:id/modwatch')
        isArray: true   
      update:
        url: API.makeURL('/communities/:id')
        method: "PUT"
      requestModerationPosition:
        url: API.makeURL('/communities/:id/request_moderation_position')
        method: "POST"
      moderationRequests:
        url: API.makeURL('/communities/:id/moderation_requests')
        isArray: true
      addModerator:
        url: API.makeURL('/communities/:id/add_moderator')
        method: "POST"
      dismissModerationPositionRequest:
        url: API.makeURL('/communities/:id/dismiss_moderation_position_request')
        method: "POST"
      reportedItems:
        url: API.makeURL('/communities/:id/reported_items')
        isArray: true
      search:
        url: API.makeURL('/communities/search')
        method: "POST"
        isArray: true
]

app.factory 'UserResource', ['$resource', 'API', "Page", ($resource, API, Page) ->
  $resource API.makeURL('/users/:id'), { id: '@id' },
    submissions:
      url: API.makeURL('/users/submissions')
      interceptor: 'response': (response) ->
        Page.posts = response.data
    notificationSubscriptions:
      url: API.makeURL('/users/notification_subscriptions')
      isArray: true
      interceptor: 'response': (response) ->
        Page.notificationSubscriptions = response.data
        console.log Page
    notifications:
      url: API.makeURL('/users/notifications/:id')
      isArray: true
    stats:
      url: API.makeURL('/users/stats')
      isArray: true
    user_exists:
      url: API.makeURL('/users/user_exists')
]

class AudioInterface
  constructor: (src, $document) ->
    @audioElement  = $document[0].createElement('audio')
    @audioElement.src = src 
  
  play: () ->
    @audioElement.play()
  toggle: () ->
    if @audioElement.paused
      @audioElement.play()
    else
      @audioElement.pause()
  pause: () ->
    @audioElement.pause()
  updateTime: () => 
    @currentTime = @audioElement.currentTime

app.factory 'audio', ($document) ->
  (src) -> 
    new AudioInterface(src, $document)

