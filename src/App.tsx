import { Navigate, Route, Routes } from 'react-router-dom';

import { routes } from 'src/common';
import Layout from 'src/components/layout/Layout.tsx';
import RequireActivation from 'src/components/requireActivation/RequireActivation.tsx';
import RequireAgreement from 'src/components/requireAgreement/RequireAgreement.tsx';
import RequireAuth from 'src/components/requireAuth/RequireAuth.tsx';
import ActivateUser from 'src/pages/activateUser/ActivateUser.tsx';
import ForgotPassword from 'src/pages/forgotPassword/ForgotPassword.tsx';
import Invoice from 'src/pages/invoices/invoice.tsx';
import Invoices from 'src/pages/invoices/invoices.tsx';
import Refunds from 'src/pages/invoices/Refunds.tsx';
import Login from 'src/pages/login/Login.tsx';
import Module from 'src/pages/modules/Module.tsx';
import Modules from 'src/pages/modules/Modules.tsx';
import Package from 'src/pages/packages/Package';
import Packages from 'src/pages/packages/Packages.tsx';
import PaymentFailed from 'src/pages/paymentFailed/PaymentFailed.tsx';
import PaymentMethods from 'src/pages/paymentMethods/PaymentMethods.tsx';
import PaymentSuccessful from 'src/pages/paymentSuccessful/PaymentSuccessful.tsx';
import Product from 'src/pages/products/Product.tsx';
import Products from 'src/pages/products/Products.tsx';
import Profile from 'src/pages/profile/Profile.tsx';
import ResetPassword from 'src/pages/resetPassword/ResetPassword.tsx';
import Settings from 'src/pages/settings/Settings.tsx';
import SignUp from 'src/pages/signup/Signup.tsx';
import Subscriptions from 'src/pages/subscriptions/Subscriptions.tsx';
import TermsConditions from 'src/pages/termsConditions/TermsConditions.tsx';
import Verify from 'src/pages/verify/Verify.tsx';
import 'src/App.css';

function App() {
  return (
    <Routes>
      <Route path={routes.LOGIN} element={<Login />} />
      <Route path={routes.SIGNUP} element={<SignUp />} />
      <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
      <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
      <Route path={routes.ACTIVATE_USER} element={<ActivateUser />} />

      <Route element={<Layout />}>
        <Route path={routes.HOME} />
        <Route element={<RequireAuth />}>
          <Route path={routes.VERIFY} element={<Verify />} />
          <Route element={<RequireActivation />}>
            <Route path={routes.PROFILE} element={<Profile />} />
            <Route path={routes.SETTINGS} element={<Settings />} />
            <Route path={routes.TERMS_AND_CONDITIONS} element={<TermsConditions />} />
            <Route element={<RequireAgreement />}>
              <Route path={routes.PRODUCTS} element={<Products />} />
              <Route path={routes.PRODUCT(':id')} element={<Product />} />
              <Route path={routes.PACKAGES} element={<Packages />} />
              <Route path={routes.PACKAGE(':id')} element={<Package />} />
              <Route path={routes.SUBSCRIPTIONS} element={<Subscriptions />} />
              <Route path={routes.PAYMENT_SUCCESSFUL} element={<PaymentSuccessful />} />
              <Route path={routes.PAYMENT_FAILED} element={<PaymentFailed />} />
              <Route path={routes.INVOICES} element={<Invoices />} />
              <Route path={routes.INVOICE(':id')} element={<Invoice />} />
              <Route path={routes.REFUNDS} element={<Refunds />} />
              <Route path={routes.PAYMENT_METHODS} element={<PaymentMethods />} />
              <Route path={routes.MODULES} element={<Modules />} />
              <Route path={`${routes.MODULE(':module')}/*`} element={<Module/>}/>
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path='*' element={<Navigate to={routes.HOME} replace />} />
    </Routes>
  );
}

export default App;
