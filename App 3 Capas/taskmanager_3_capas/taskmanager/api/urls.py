from django.urls import include, path
from rest_framework import routers
from taskmanager.api.views import ListViewSet, TaskViewSet, CommentViewSet, TagViewSet

router = routers.DefaultRouter()
router.register(r'list', ListViewSet, basename='list')
router.register(r'task', TaskViewSet, basename='task')
router.register(r'comment', CommentViewSet, basename='comment')
router.register(r'tag', TagViewSet, basename='tag')

urlpatterns = router.urls