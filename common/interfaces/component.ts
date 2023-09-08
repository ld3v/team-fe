export type TWrapperComponent = {
  children: React.ReactElement[] | React.ReactElement;
};

export interface IModal {
  open: boolean;
  onClose: () => void;
  onReloadData?: () => void;
}

export interface IDrawer {
  open: boolean;
  onClose: () => void;
}
