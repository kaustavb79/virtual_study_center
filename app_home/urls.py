from django.urls import path, re_path


app_name = 'app_home'

urlpatterns = [

    # Base URLs
    # path('', views.HomePageView.as_view(), name='home'),

    # path('terms-conditions/', views.TermsConditionsView.as_view(), name='terms'),

    # Contact Us URLs
    # path('contact-us/', views.contact_us_view, name='contact-us'),
    # path('query-mail-sent/', views.contact_us_success_view, name='query-mail-sent'),

    # Account Activation URLs
    # path('account_activation_sent/', views.account_activation_sent, name='account_activation_sent'),
    # re_path(r'^activate/(?P<uidb64>[0-9A-Za-z_\-]+)/(?P<token>[0-9A-Za-z]{1,13}-[0-9A-Za-z]{1,20})/$', views.activate,
    #         name='activate'),
    # path('account-activated/', views.AccountActivatedView.as_view(), name='account-activated'),

    # Sitemap URL
    # path('sitemap/', views.SiteMap.as_view(), name='sitemap'),
    # path('faq/', views.faq_page_view, name='faq'),

]
