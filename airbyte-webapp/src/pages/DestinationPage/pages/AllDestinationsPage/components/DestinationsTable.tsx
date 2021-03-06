import React from "react";
import { useResource } from "rest-hooks";

import { ImplementationTable } from "components/EntityTable";
import { Routes } from "pages/routes";
import useRouter from "components/hooks/useRouterHook";
import ConnectionResource from "core/resources/Connection";
import config from "config";
import { Destination } from "core/resources/Destination";
import { getEntityTableData } from "components/EntityTable/utils";
import { EntityTableDataItem } from "components/EntityTable/types";
import DestinationDefinitionResource from "core/resources/DestinationDefinition";

type IProps = {
  destinations: Destination[];
};

const DestinationsTable: React.FC<IProps> = ({ destinations }) => {
  const { push } = useRouter();

  const { connections } = useResource(ConnectionResource.listShape(), {
    workspaceId: config.ui.workspaceId,
  });

  const { destinationDefinitions } = useResource(
    DestinationDefinitionResource.listShape(),
    {
      workspaceId: config.ui.workspaceId,
    }
  );

  const data = getEntityTableData(
    destinations,
    connections,
    destinationDefinitions,
    "destination"
  );

  const clickRow = (destination: EntityTableDataItem) =>
    push(`${Routes.Destination}/${destination.entityId}`);

  return (
    <ImplementationTable
      data={data}
      onClickRow={clickRow}
      entity="destination"
    />
  );
};

export default DestinationsTable;
