// import React, { useState } from 'react';
// import { MdModeEdit } from "react-icons/md";

// const ProfilePicture = ({avatar, isEditSession, register}) => {
//   console.log(avatar)
//   return (
//     <div className='absolute top-0 -translate-y-1/2'>
//       <div className="relative w-28 h-28">
//         <img
//           src={avatar}
//           alt="Profile"
//           className="w-full h-full object-cover rounded-full border-2"
//         />
//       {isEditSession &&  <label
//           htmlFor="fileInput"
//           className="absolute bottom-0 right-0 p-1 bg-[var(--bg-dark)] text-white text-sm rounded-full cursor-pointer"
//         >
//         <MdModeEdit className='text-xl text-[var(--color-light)]' />

//         </label>}
//       </div>
//       <input
//         id="fileInput"
//         type="file"
//         {...register("avatar")}
//         className="hidden"
//       />
//     </div>
//   );
// };

// export default ProfilePicture;
import React, { useState } from 'react';
import { MdModeEdit } from "react-icons/md";

const ProfilePicture = ({ avatar, isEditSession, register, setValue }) => {
  const [preview, setPreview] = useState(avatar);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setValue("avatar", file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='absolute top-0 -translate-y-1/2'>
      <div className="relative w-28 h-28">
        <img
          src={preview || "/man.png"}
          alt="Profile"
          className="w-full h-full object-cover rounded-full border-2 bg-[var(--bg-secondary)]"
        />
        {isEditSession && (
          <label
            htmlFor="fileInput"
            className="absolute bottom-0 right-0 p-1 bg-[var(--bg-quaternary)] text-sm rounded-full cursor-pointer"
          >
            <MdModeEdit className='text-xl text-[var(--color-primary)]' />
          </label>
        )}
      </div>
      <input
        id="fileInput"
        type="file"
        {...register("avatar", { onChange: handleImageChange })}
        className="hidden"
      />
    </div>
  );
};

export default ProfilePicture;
