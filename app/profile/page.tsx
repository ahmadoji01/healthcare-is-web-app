'use client';

import Image from "next/image";
import defaultAvatar from "@/public/images/avatar-256.jpg";
import { ChangeEvent, useEffect, useState } from "react";
import { useUserContext } from "@/contexts/user-context";
import { imageHandler } from "@/utils/request-handler";
import { getAllUsers, updateUserMe, uploadAvatar } from "@/modules/users/domain/users.actions";
import { useAlertContext } from "@/contexts/alert-context";
import { useTranslations } from "next-intl";
import { errorMapper } from "@/modules/errors/domains/error";
import { ERROR_CODE } from "@/modules/errors/domains/errors.constants";

const Profile = () => {

  const [avatar, setAvatar] = useState(defaultAvatar.src);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const {accessToken, user, setUser} = useUserContext();
  const {openSnackbarNotification} = useAlertContext();
  const t = useTranslations();

  useEffect(() => {
    if (user.avatar !== null) {
      setAvatar(imageHandler(user.avatar.id, user.avatar.filename_download));
    }
  }, [user]);

  const handleSubmit = () => {
    if (password !== confirmPassword){
      openSnackbarNotification(t('alert_msg.password_different'), 'warning');
      return;
    }

    if (user.email === email && password === "") {
      openSnackbarNotification(t('alert_msg.same_user_info'), 'warning');
      return;
    }

    let editProfile = {};
    
    if (email !== "") {
      
    }

    if (password === "")
      editProfile = { email: email };
    else if (email === "")
      editProfile = { password: password };
    else
      editProfile = { email: email, password: password };

    updateUserMe(accessToken, editProfile)
      .then( () => { openSnackbarNotification(t('alert_msg.success'), 'success') })
      .catch( err => { 
        let error = errorMapper(err);
        let msg = t('alert_msg.server_error');
        
        if (error.code === ERROR_CODE.not_unique)
          msg = t('alert_msg.email_exists');
        
        openSnackbarNotification(msg, 'error') 
      })
  }

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      return;
    }

    let file = e.target.files[0];
    let data = new FormData();
    data.append('file-1', file, file.name);
    let avatar = {};
    await uploadAvatar(accessToken, data)
      .then( res => avatar = res)
      .catch( err => {
        openSnackbarNotification(t('alert_msg.server_error'), "error");
      });
    await updateUserMe(accessToken, { avatar: avatar })
      .then( res => { 
        openSnackbarNotification(t('alert_msg.success'), "success");
        setUser({ ...user, avatar: { id: avatar.id, filename_download: avatar.filename_download } })
      })
      .catch( err => {
        openSnackbarNotification(t('alert_msg.server_error'), "success");
      });
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Profile
        </h2>
      </div>

      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="relative z-20 h-35 md:h-65">
          <Image
            src={"/images/cover/cover-01.png"}
            alt="profile cover"
            className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
            width={970}
            height={260}
          />
          <div className="absolute bottom-1 right-1 z-10 xsm:bottom-4 xsm:right-4">
            <label
              htmlFor="cover"
              className="flex cursor-pointer items-center justify-center gap-2 rounded bg-primary py-1 px-2 text-sm font-medium text-white hover:bg-opacity-80 xsm:px-4"
            >
              <input type="file" name="cover" id="cover" className="sr-only" />
              <span>
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.99992 5.83329C6.03342 5.83329 5.24992 6.61679 5.24992 7.58329C5.24992 8.54979 6.03342 9.33329 6.99992 9.33329C7.96642 9.33329 8.74992 8.54979 8.74992 7.58329C8.74992 6.61679 7.96642 5.83329 6.99992 5.83329ZM4.08325 7.58329C4.08325 5.97246 5.38909 4.66663 6.99992 4.66663C8.61075 4.66663 9.91659 5.97246 9.91659 7.58329C9.91659 9.19412 8.61075 10.5 6.99992 10.5C5.38909 10.5 4.08325 9.19412 4.08325 7.58329Z"
                    fill="white"
                  />
                </svg>
              </span>
              <span>Edit</span>
            </label>
          </div>
        </div>
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              <img src={avatar} width={160} height={160} className="shadow-lg rounded-full max-w-full h-auto align-middle border-none" />
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
              {user.first_name + " " + user.last_name}
            </h3>
            <p className="font-medium">{user.role_name}</p>
            <div className="mx-auto max-w-180 mt-4">
              <h4 className="font-semibold text-black dark:text-white">
                Change Account Information
              </h4>
              <form onSubmit={ e => { e.preventDefault(); handleSubmit() } } className="mt-2">
                <div>
                  <label className="mb-1 block text-black dark:text-white">
                    { t('email') }    
                  </label>
                  <input
                    type="email"
                    defaultValue={email}
                    required
                    onChange={ e => setEmail(e.target.value)}
                    placeholder={ t('input_email') }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div>
                  <label className="mt-4 mb-1 block text-black dark:text-white">
                    { t('password') }    
                  </label>
                  <input
                    type="password"
                    defaultValue={password}
                    required
                    onChange={ e => setPassword(e.target.value)}
                    placeholder={ t('input_password') }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <div>
                  <label className="mt-2 mb-1 block text-black dark:text-white">
                    { t('confirm_password') }    
                  </label>
                  <input
                    type="password"
                    defaultValue={confirmPassword}
                    required={ password? true : false }
                    onChange={ e => setConfirmPassword(e.target.value)}
                    placeholder={ t('input_confirm_password') }
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    />
                </div>
                <p className="text-left">{t("leave_password_blank")}</p>
                { password !== confirmPassword && <p className="font-bold text-black dark:text-white my-1">{t("password_not_the_same")}</p> }
                <button className="sticky bottom-0 z-50 mt-2 w-full justify-center rounded bg-primary py-5 px-3 font-medium text-2xl text-gray">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
