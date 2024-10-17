import { useState } from "react";
import useSettings from "../features/settings/useSettings";
import Spinner from "./Spinner";
import useUser from "../features/authentication/useUser";
import { useUpdateSettings } from "../features/settings/useUpdateSettings";
import { useDeleteUser } from "../features/authentication/useDeleteUser";
import { FaOpenid } from "react-icons/fa";
import ConfirmationWindow from "./ConfirmationWindow";

function SettingsUI() {
  const { isAuthenticated, user } = useUser() || {};
  const {
    updateSettings,
    isPending: isUpdatingSettings,
    isSuccess: settingsUpdated,
  } = useUpdateSettings();
  const {
    deleteUser,
    isPending: isDeletingUser,
    isSuccess: userDeleted,
  } = useDeleteUser();
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);

  const { settingsData: { settings } = {}, isLoading } =
    useSettings(user?.id) || {};
  const { public_profile, allow_messages, allow_likes } = settings || {};

  function handleUpdate(e, fieldName) {
    const value = e.target.checked;
    updateSettings({
      settingsData: { ...settings, [fieldName]: value },
      userId: user?.id,
    });
  }

  if (!isAuthenticated)
    return (
      <div className="flex items-center capitalize justify-center pb-28 text-[var(--color-primary)] text-3xl font-medium h-full">
        please register or login to see settings
      </div>
    );

  if (isLoading) return <Spinner />;
  return (
    <div className="bg-primary text-light p-5 rounded-lg max-w-xl mx-auto relative h-full text-[var(--color-dark)] font-medium">
      <h2 className="text-2xl mb-5">Settings</h2>
      <div className="settings-container space-y-4">
       
        <div className="setting-item flex items-center justify-between">
          <label className="text-lg">Allow Messages</label>
          <label className="switch">
            <input
              disabled={isUpdatingSettings}
              type="checkbox"
              name="allow_comments"
              defaultChecked={allow_messages}
              onChange={(e) => {
                handleUpdate(e, "allow_messages");
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="setting-item flex items-center justify-between">
          <label className="text-lg">Allow Likes</label>
          <label className="switch">
            <input
              disabled={isUpdatingSettings}
              onChange={(e) => {
                handleUpdate(e, "allow_likes");
              }}
              type="checkbox"
              name="allow_likes"
              defaultChecked={allow_likes}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <button
        disabled={isDeletingUser}
        className="bg-red-600 text-light py-2 px-4 rounded text-[var(--color-light)] hover:bg-red-700 bottom-20 right-2 absolute"
        onClick={() => setOpenConfirmationWindow((open) => !open)}
      >
        Delete Account
      </button>
      {openConfirmationWindow && (
        <ConfirmationWindow
          actionCancel={() => setOpenConfirmationWindow(close)}
          actionConfirm={() => {
            deleteUser({ userId: user?.id });
            setOpenConfirmationWindow(close);
          }}
          btnColor="bg-red-600"
          message={`Are you sure you want to delete your account permanently? This is an irreversible action`}
        />
      )}
    </div>
  );
}

export default SettingsUI;
