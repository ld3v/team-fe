"use client";

import { random as randomItem } from "@/common/utils";
import { Button, Card, Checkbox, Col, Form, Input, Row } from "antd";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

const ToolRandomMemberPage = () => {
  const searchParams = useSearchParams();
  const memberAliases = useMemo(
    () => (searchParams.get("members") || "").split(",").filter(item => item),
    [searchParams.get("members")]
  );

  const [membersRendered, setMembersRendered] =
    useState<string[]>(memberAliases.map(alias => alias.startsWith('!') ? alias.replace('!', '') : alias));
  const [membersSelected, setMembersSelected] =
    useState<string[]>(memberAliases.filter(alias => !alias.startsWith('!')));
  const [newItem, setNewItem] = useState<string>("");
  const [result, setResult] = useState<string>("");

  const handleGetRandom = () => {
    const random = randomItem(membersSelected);
    setResult(random);
  };

  const handleAddNewItem = () => {
    if (!newItem || newItem.trim() === "") {
      setNewItem("");
      return;
    }
    const memberRender = Array.from(new Set([...membersRendered, newItem.trim()]));
    setMembersRendered([...memberRender]);
    setNewItem("")
  };

  return (
    <div className="tw-w-full tw-h-screen tw-flex tw-items-center tw-justify-center">
      <Card title="Get random member" className="tw-w-[calc(100%-40px)] sm:tw-w-[600px] tw-shadow-md">
        <div className="sm:tw-flex tw-justify-between">
          <div className="tw-w-full sm:tw-w-1/2 ">
            <Input
              className="tw-w-full"
              placeholder="Type & press ENTER to add new"
              onPressEnter={() => handleAddNewItem()}
              value={newItem}
              onChange={({ target }) => setNewItem(target.value)}
            />
            <div className="tw-mt-5 tw-mb-2">
              <Checkbox
                checked={membersSelected.length > 0 && membersSelected.length === membersRendered.length}
                indeterminate={!!membersSelected.length && membersSelected.length !== memberAliases.length}
                onChange={({ target }) =>
                  target.checked
                    ? setMembersSelected([...membersRendered])
                    : setMembersSelected([])
                }
              >Select all</Checkbox>
            </div>
            <Checkbox.Group
              rootClassName="tw-w-full"
              value={membersSelected}
              onChange={(itemsSelected) => setMembersSelected([...itemsSelected] as string[])}
            >
              <Row>
                {membersRendered.map(item => <Col span={12} key={item}><Checkbox value={item}>{item}</Checkbox> </Col>)}
              </Row>
            </Checkbox.Group>
            <div className="tw-mt-5">
              <Button onClick={() => handleGetRandom()}>Get member</Button>
            </div>
          </div>
          <div className="tw-w-full tw-pt-5 tw-mt-5 tw-border tw-border-gray-400 tw-border-l-0 tw-border-r-0 tw-border-b-0 sm:tw-pt-0 sm:tw-mt-0 sm:tw-border-t-0 sm:tw-border-l sm:tw-w-1/2 sm:tw-pl-5 sm:tw-ml-5">
            <div className="tw-text-sm tw-text-gray-400">Got</div>
            <div className="tw-font-bold tw-text-2xl">{result || '----'}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ToolRandomMemberPage;
