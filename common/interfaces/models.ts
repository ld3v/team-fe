type TDefaultModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type TAccount = TDefaultModel & {
  username: string;
  displayName: string;
  avatar: string;
};

export type TProgram = TDefaultModel & {
  name: string;
  description: string;
  projects: TProject[];
  members: TAccount[];
  createdAt: Date;
  updatedAt: Date;
};

export type TProject = TDefaultModel & {
  name: string;
  description: string;
  members: TProjectMember[];
  iterations: any[];
};

export type TProjectMember = TDefaultModel & {
  accountId: string;
  displayName: string;
  avatar: string;
  username: string;
};

export type TAppIntegrated = TDefaultModel & {
  name: string;
  app: string;
  description: string;
  createdBy: TAccount;
};
