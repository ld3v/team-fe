export type TAccount = {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
};

export type TProgram = {
  id: string;
  name: string;
  description: string;
  projects: TProject[];
  members: TAccount[];
  createdAt: Date;
  updatedAt: Date;
};

export type TProject = {
  id: string;
  name: string;
  description: string;
  members: TProjectMember[];
  iterations: any[];
  createdAt: Date;
  updatedAt: Date;
};

export type TProjectMember = {
  id: string;
  accountId: string;
  displayName: string;
  avatar: string;
  username: string;
};
