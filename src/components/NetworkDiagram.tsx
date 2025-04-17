import { IconColoredCreateLogic } from '@consta/icons/IconColoredCreateLogic'
import { IconAttributes } from '@consta/icons/IconAttributes'
import { Text } from '@consta/uikit/Text';
import { Grid, GridItem } from '@consta/uikit/Grid';

type NetworkDiagramProps = {
  nodes: { id: string | number, type: string, data: { ip: string, model: string } }[]
}

export const NetworkDiagram = ({ nodes }: NetworkDiagramProps) => {
  return (
    <Grid cols={2} gap="xl" xAlign="center" yAlign="center">
      {nodes.map(({ id, type, data }) => {
        return (
          <GridItem key={id} cols={1} gap="xl" style={{ display: "flex", flexFlow: "column", margin: "0 5px;" }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
            {type === "router" ? <IconColoredCreateLogic /> : <IconAttributes />}
            </div>
            <Text align='center'>{type}</Text>
            <Text align='center'>ip: {data.ip}</Text>
            <Text size='s' >{data.model}</Text>
          </GridItem>
        )
      })}
    </Grid>
  )
};