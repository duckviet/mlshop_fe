// app/@modal/(.)CustomerLogin/modal.tsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dialogRef = useRef<null | HTMLDialogElement>(null);

  const closeDialog = () => {
    dialogRef.current?.close();
    router.back();
  };

  useEffect(() => {
    // Open the dialog when the component mounts
    dialogRef.current?.showModal();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 flex items-center justify-center z-50  rounded-lg backdrop-blur-lg"
    >
      <div className="bg-white p-10 rounded-2xl relative">
        <div className="flex justify-between">
          <h1>Login to continue</h1>
          <button onClick={closeDialog}>x</button>
        </div>
        <div>{children}</div>
      </div>
    </dialog>
  );
}
