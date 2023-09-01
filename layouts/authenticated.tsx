"use client";
import {
  ProLayout,
  MenuDataItem,
} from "@ant-design/pro-components";
import { Dropdown, Skeleton } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { TWrapperComponent } from "@/common/interfaces/component";
import { usePathname, useRouter } from "next/navigation";
import { ToolOutlined, DollarOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useAccountState, useLoadingState } from "@/stores";
import { useEffect } from "react";
import { logout } from "@/actions";

const items: MenuDataItem[] = [
  {
    path: "/u/working",
    name: "Working",
    icon: <DollarOutlined />,
  },
  {
    path: "/u/tools",
    name: "Tools",
    icon: <ToolOutlined />,
  },
];

const AuthenticatedLayout: React.FC<TWrapperComponent> = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { current, dic } = useAccountState()
  const { appStatus } = useLoadingState()

  useEffect(() => {
    if (!current && !appStatus) {
      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appStatus])

  return (
    <div className="tw-h-screen tw-overflow-auto">
      <ProLayout
        prefixCls="my-prefix"
        location={{ pathname }}
        defaultCollapsed
        avatarProps={{
          src: dic[current || '']?.avatar || "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
          size: "small",
          title: dic[current || '']?.username || "Account",
          render: (_, dom) => {
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "Logout",
                      onClick: async () => await logout({
                        onSuccess: () => router.push('/'),
                      }),
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        headerTitleRender={() => (
          <a>
            <Image src="/logo.png" width={32} height={32} className="!tw-h-8" alt="app-logo" />
            <span className="tw-font-bold tw-text-gray-600">team</span>
          </a>
        )}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return <div className="tw-text-center">nqhuy</div>;
        }}
        menuItemRender={(item, dom) => (
          <div
            onClick={() =>
              item.path ? router.push(item.path) : item.onClick?.()
            }
          >
            {dom}
          </div>
        )}
        fixSiderbar={true}
        layout="mix"
        route={{
          children: items,
        }}
      >
        {!appStatus ? children : <Skeleton active />}
      </ProLayout>
    </div>
  );
};

export default AuthenticatedLayout;
