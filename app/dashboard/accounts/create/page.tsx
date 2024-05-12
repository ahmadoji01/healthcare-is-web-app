import Breadcrumb from "@/components/Dashboard/Breadcrumbs/Breadcrumb";
import UserForm from "@/modules/users/application/form/user.form";


const AccountCreatePage = () => {
  return (
    <>
      <Breadcrumb pageName="Create a User" />
      <UserForm />
    </>
  );
};

export default AccountCreatePage;
