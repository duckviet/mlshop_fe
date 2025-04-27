// app/@modal/(.)CustomerLogin/page.tsx

import LoginForm from "@/components/auth/LoginForm";
import { Modal } from "./modal";

export default function Page() {
  return (
    <Modal>
      <LoginForm />
    </Modal>
  );
}
