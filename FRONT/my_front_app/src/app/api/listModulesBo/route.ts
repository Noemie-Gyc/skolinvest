// appel de la méthode pour visualiser la list de modules admin path('admin/', EditableModuleListView.as_view(), name='module-admin-list'), GET
// appel pour la méthode Delete Module path('<int:pk>/delete/', ModuleDeleteView.as_view(), name='module-delete'), DELETE
// appel pour la méthode  path('<int:pk>/', ModuleDetailView.as_view(), name='module-detail'),