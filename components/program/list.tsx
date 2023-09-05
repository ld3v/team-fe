"use client"
import { useLoadingState, useProgramState } from "@/stores"
import { Card, Skeleton } from "antd";
import moment from "moment";
import Link from "next/link";

const ListPrograms: React.FC = () => {
  const { listPrograms } = useLoadingState();
  const { ids, dic } = useProgramState()

  if (listPrograms) {
    return (
      <Skeleton active />
    )
  }
  return (
    <>
      {ids.map(id => (
        <Card title={<Link href={`/u/working/${id}/projects`}>{dic[id].name}</Link>} key={id} className="tw-shadow-md tw-mb-5">
          <div className="tw-flex">
            <div className="tw-mr-10">
              <span className="tw-font-bold">{dic[id].projects.length}</span>
              &nbsp;
              {dic[id].projects.length > 1 ? 'projects' : 'project'}
            </div>
            <div className="tw-mr-10">
              <span className="tw-font-bold">{dic[id].members.length}</span>
              &nbsp;
              {dic[id].members.length > 1 ? 'members' : 'member'}
            </div>
            <div className="tw-ml-auto tw-italic tw-text-gray-400">
              Started from {moment(dic[id].createdAt).format('DD/MM/YYYY')}
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}

export default ListPrograms;