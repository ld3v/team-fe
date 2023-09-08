import { Breadcrumb, BreadcrumbProps, Button } from "antd"
import React from "react";

export interface IHeader {
  breadcrumb?: BreadcrumbProps;
  onAddClick?: () => void;
}
export const Header: React.FC<IHeader> = ({ breadcrumb, onAddClick }) => {
  return (
    <div className="tw-flex tw-justify-between tw-items-center">
      <Breadcrumb {...(breadcrumb || {})} />
      {onAddClick && <Button onClick={onAddClick}>Add</Button>}
    </div>
  )
}
