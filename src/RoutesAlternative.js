import React, {
  lazy,
  Suspense
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import AdminLayout from 'src/layouts/AdminLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthRoute from 'src/components/AuthRoute';
import AdminAuthRoute from 'src/components/AdminRoute';
import GuestRoute from 'src/components/GuestRoute';
import AdminGuestRoute from 'src/components/AdminGuestRoute';

function Routes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/home"
        />
        <Route
          exact
          path="/404"
          component={lazy(() => import('src/views/pages/Error404View'))}
        />
        <GuestRoute
          exact
          path="/login"
          component={lazy(() => import('src/views/auth/LoginView'))}
        />
        <AdminGuestRoute
        exact
        path="/admin-login"
        component = {
          lazy(() => import('src/views/Admin/AdminLoginView'))
        }
        />
        <Route
          exact
          path="/login-unprotected"
          component={lazy(() => import('src/views/auth/LoginView'))}
        />
        <GuestRoute
          exact
          path="/register"
          component={lazy(() => import('src/views/auth/RegisterView'))}
        />
        <Route
          exact
          path="/register-unprotected"
          component={lazy(() => import('src/views/auth/RegisterView'))}
        />
        <AuthRoute
          path="/app"
          render={(props) => (
            <DashboardLayout {...props}>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Redirect
                    exact
                    from="/app"
                    to="/app/reports/dashboard"
                  />
                  <Route
                    exact
                    path="/app/account"
                    component={lazy(() => import('src/views/pages/AccountView'))}
                  />
                  <Route
                    exact
                    path="/app/reports/dashboard"
                    component={lazy(() => import('src/views/reports/DashboardView'))}
                  />
                  <Route
                    exact
                    path="/app/reports/dashboard-alternative"
                    component={lazy(() => import('src/views/reports/DashboardAlternativeView'))}
                  />
                  <Redirect
                    exact
                    from="app/reports"
                    to="/app/reports/dashboard"
                  />
                  <Route
                    exact
                    path="/app/management/customers"
                    component={lazy(() => import('src/views/management/UserListView'))}
                  />
                  <Route
                    exact
                    path="/app/management/customers/:id"
                    component={lazy(() => import('src/views/management/UserDetailsView'))}
                  />
                  <Route
                    exact
                    path="/app/management/customers/:id/edit"
                    component={lazy(() => import('src/views/management/UserEditView'))}
                  />
                  <Route
                    exact
                    path="/app/management/products"
                    component={lazy(() => import('src/views/management/SensorListView'))}
                  />
                  <Route
                    exact
                    path="/app/management/products/create"
                    component={lazy(() => import('src/views/management/SensorCreateView'))}
                  />
                  <Route
                    exact
                    path="/app/management/orders"
                    component={lazy(() => import('src/views/management/ComplaintListView'))}
                  />
                  <Route
                    exact
                    path="/app/management/orders/:id"
                    component={lazy(() => import('src/views/management/OrderDetailsView'))}
                  />
                  <Route
                    exact
                    path="/app/management/invoices"
                    component={lazy(() => import('src/views/management/InvoiceListView'))}
                  />
                  <Route
                    exact
                    path="/app/management/invoices/:id"
                    component={lazy(() => import('src/views/management/InvoiceDetailsView'))}
                  />
                  <Route
                    exact
                    path="/app/calendar"
                    component={lazy(() => import('src/views/calendar/CalendarView'))}
                  />
                  <Route
                    exact
                    path="/app/kanban"
                    component={lazy(() => import('src/views/kanban/KanbanView'))}
                  />
                  <Route
                    path={[
                      '/app/chat/new',
                      '/app/chat/:threadKey'
                    ]}
                    component={lazy(() => import('src/views/chat/ChatView'))}
                  />
                  <Route
                    path={[
                      '/app/mail/label/:customLabel/:mailId?',
                      '/app/mail/:systemLabel/:mailId?'
                    ]}
                    component={lazy(() => import('src/views/mail/MailView'))}
                  />
                  <Route
                    exact
                    path="/app/projects/overview"
                    component={lazy(() => import('src/views/projects/OverviewView'))}
                  />
                  <Route
                    exact
                    path="/app/projects/browse"
                    component={lazy(() => import('src/views/projects/ProjectBrowseView'))}
                  />
                  <Route
                    exact
                    path="/app/projects/create"
                    component={lazy(() => import('src/views/projects/ProjectCreateView'))}
                  />
                  <Route
                    exact
                    path="/app/projects/:id"
                    component={lazy(() => import('src/views/projects/ProjectDetailsView'))}
                  />
                  <Route
                    exact
                    path="/app/social/feed"
                    component={lazy(() => import('src/views/social/FeedView'))}
                  />
                  <Route
                    exact
                    path="/app/social/profile"
                    component={lazy(() => import('src/views/social/ProfileView'))}
                  />
                  <Route
                    exact
                    path="/app/extra/charts/apex"
                    component={lazy(() => import('src/views/extra/charts/ApexChartsView'))}
                  />
                  <Route
                    exact
                    path="/app/extra/forms/formik"
                    component={lazy(() => import('src/views/extra/forms/FormikView'))}
                  />
                  <Route
                    exact
                    path="/app/extra/forms/redux"
                    component={lazy(() => import('src/views/extra/forms/ReduxFormView'))}
                  />
                  <Route
                    exact
                    path="/app/extra/editors/draft-js"
                    component={lazy(() => import('src/views/extra/editors/DraftEditorView'))}
                  />
                  <Route
                    exact
                    path="/app/extra/editors/quill"
                    component={lazy(() => import('src/views/extra/editors/QuillEditorView'))}
                  />
                  <Redirect to="/404" />
                </Switch>
              </Suspense>
            </DashboardLayout>
          )}
        />
        <AdminAuthRoute
          path="/admin"
          render={(props) => (
            <AdminLayout {...props}>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Redirect
                    exact
                    from="/admin"
                    to="/admin/welcome"
                  />
                  <Route
                    exact
                    path="/admin/welcome"
                    component = {
                      lazy(() => import('src/views/management/UserListView'))
                    }
                  />
                  <Route
                    exact
                    path = "/admin/management/users/:userId"
                    component = {lazy(() => import('src/views/management/UserEditView')
                  }
                  />
                  <Route
                    exact
                    path = "/admin/management/users/:userId/edit"
                    component = {
                      lazy(() => import('src/views/management/UserEditView'))
                    }
                  />
                  < Route
                  exact
                  path = "/admin/userManagement/users/user"
                  component = {
                    lazy(() => import('src/views/management/UserCreateView'))
                  }
                  />
                  <Route
                    exact
                    path = "/admin/management/sensors"
                    component = {lazy(() => import('src/views/management/SensorListView'))}
                  />
                  <Route
                    exact
                    path = "/admin/management/senors/create"
                    component = {
                      lazy(() => import('src/views/management/SensorCreateView'))
                    }
                  />
                  <Route
                    exact
                    path = "/admin/management/complaints"
                    component = {
                      lazy(() => import('src/views/management/ComplaintListView'))
                    }
                  />
                  <Route
                    exact
                    path = "/admin/management/complaints/:complaintId"
                    component = {
                      lazy(() => import('src/views/management/OrderDetailsView'))
                    }
                  />
                  <Route
                    exact
                    path = "/admin/management/invoices"
                    component = {
                      lazy(() => import('src/views/management/InvoiceListView'))
                    }
                  />
                  <Route
                    exact
                    path = "/admin/management/invoices/:invoiceId"
                    component = {
                      lazy(() => import('src/views/management/InvoiceDetailsView'))
                    }
                  />
                  <Route
                    exact
                    path = "/admin/management"
                    component = {
                      lazy(() => import('/admin/management/customers'))
                    }
                  />
                  
                  <Redirect to="/404" />
                </Switch>
              </Suspense>
            </AdminLayout>
          )}
        />
        <Route
          path="*"
          render={(props) => (
            <MainLayout {...props}>
              <Switch>
                <Route
                  exact
                  path="/home"
                  component={HomeView}
                />
                <Route
                  exact
                  path="/pricing"
                  component={lazy(() => import('src/views/pages/PricingView'))}
                />
                <Redirect to="/404" />
              </Switch>
            </MainLayout>
          )}
        />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
}

export default Routes;
