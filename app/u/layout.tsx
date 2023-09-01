import { TWrapperComponent } from "@/common/interfaces/component"
import AuthenticatedLayout from "@/layouts/authenticated"

const UserPagesLayout: React.FC<TWrapperComponent> = ({ children }) => {
  return (
    <AuthenticatedLayout>{children}</AuthenticatedLayout>
  )
}

export default UserPagesLayout;