import React from "react";

function ProfileSocialLinks({
  isEditSession,
  children,
  placeholder,
  link,
  label,
  register,
}) {
  const isValidUrl =
    link?.startsWith("http://") || link?.startsWith("https://");
  const finalLink = isValidUrl ? link : `https://${link}`;
  return (
    <>
      {isEditSession ? (
        <div className="flex items-center space-x-1">
          {children}
          <input
            type="text"
            {...register(label)}
            placeholder={placeholder}
            className="bg-[var(--bg-secondary)] w-3/4 text-sm font-medium border-[1px] p-1 animate-blink"
          />
        </div>
      ) : (
        <a
          href={link ? finalLink : undefined}
          target={link ? "_blank" : undefined}
          rel={link ? "noopener noreferrer" : undefined}
          className="underline text-2xl"
        >
          {children}
        </a>
      )}
    </>
  );
}

export default ProfileSocialLinks;
