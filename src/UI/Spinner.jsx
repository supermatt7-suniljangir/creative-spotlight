import React from "react";

function Spinner() {
  return (
    <div className="flex text-[var(--color-primary)] gap-4  flex-col items-center z-10  bg-[var(--bg-primary)] justify-center min-h-screen fixed left-0 top-0 w-full">
      <div className=" -ml-4 animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[var(--color-primary)]"></div>
      <div className="text-2xl font-medium capitalize">
        loading please wait ...
      </div>
    </div>
  );
}

export default Spinner;
