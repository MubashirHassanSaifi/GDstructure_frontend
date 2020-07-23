/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
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
import AuthGuard from 'src/components/AuthGuard';
import AdminAuthGuard from 'src/components/AdminAuthGuard';
import AdminGuestGuard from 'src/components/AdminGuestGuard';
import GuestGuard from 'src/components/GuestGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    path: '/admin-login',
    guard: AdminGuestGuard,
    component: lazy(() => import('src/views/Admin/AdminLoginView'))
  },
  {
    exact: true,
    path: '/login-unprotected',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/register',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    exact: true,
    path: '/register-unprotected',
    component: lazy(() => import('src/views/auth/RegisterView'))
  },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/reports/dashboard" />
      },
      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('src/views/pages/AccountView'))
      },
      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('src/views/reports/DashboardView'))
      },
      {
        exact: true,
        path: '/app/reports/dashboard-alternative',
        component: lazy(() => import('src/views/reports/DashboardAlternativeView'))
      },
      {
        exact: true,
        path: '/app/reports/complaint',
        component: lazy(() => import('src/views/reports/ComplaintCreateView'))

      },
      {
        exact: true,
        path: '/app/reports/charts',
        component: lazy(() => import('src/views/reports/ChartsView'))

      },
      {
        exact: true,
        path: '/app/reports/logs',
        component: lazy(() => import('src/views/reports/LogsView'))

      },
      {
        exact: true,
        path: '/app/reports/alerts',
        component: lazy(() => import('src/views/reports/AlertsView'))

      },

      {
        exact: true,
        path: '/app/reports',
        component: () => <Redirect to="/app/reports/dashboard" />
      },

      {
        exact: true,
        path: '/app/social/profile',
        component: lazy(() => import('src/views/social/ProfileView'))
      },
      {
        exact: true,
        path: '/app/social',
        component: () => <Redirect to="/app/social/profile" />
      },
      {
        exact: true,
        path: '/app/extra/forms/formik',
        component: lazy(() => import('src/views/extra/forms/FormikView'))
      },
      {
        exact: true,
        path: '/app/extra/forms/redux',
        component: lazy(() => import('src/views/extra/forms/ReduxFormView'))
      },

      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '/admin',
    guard: AdminAuthGuard,
    layout: AdminLayout,
    routes: [
      {
        exact: true,
        path: '/admin',
        component: lazy(() => import('src/views/management/UserListView'))
      },

      {
        exact: true,
        path: '/admin/welcome',
        component: lazy(() => import('src/views/management/UserListView'))
      },
      {
        exact: true,
        path: '/admin/management/users/:userId',
        component: lazy(() => import('src/views/management/UserDetailsView'))
      }, {
        exact: true,
        path: '/admin/management/users/:userId/edit',
        component: lazy(() => import('src/views/management/UserEditView'))
      }, {
        exact: true,
        path: '/admin/userManagement/users/user',
        component: lazy(() => import('src/views/management/UserCreateView'))
      },
      {
        exact: true,
        path: '/admin/management/sensors',
        component: lazy(() => import('src/views/management/SensorListView'))
      }, {
        exact: true,
        path: '/admin/management/senors/create',
        component: lazy(() => import('src/views/management/SensorCreateView'))
      }, {
        exact: true,
        path: '/admin/management/complaints',
        component: lazy(() => import('src/views/management/ComplaintListView'))
      }, {
        exact: true,
        path: '/admin/management/complaints/:complaintId',
        component: lazy(() => import('src/views/management/ComplaintDetailsView'))
      }, {
        exact: true,
        path: '/admin/management/invoices',
        component: lazy(() => import('src/views/management/InvoiceListView'))
      }, {
        exact: true,
        path: '/admin/management/invoices/:invoiceId',
        component: lazy(() => import('src/views/management/InvoiceDetailsView'))
      }, {
        exact: true,
        path: '/admin/management',
        component: () => <Redirect to="/admin/management/customers" />
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      },
      {
        exact: true,
        path: '/pricing',
        component: lazy(() => import('src/views/pages/PricingView'))
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
