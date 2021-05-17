<script lang="ts">
  import Table from './Table.svelte';

  // import type { Heading, ScoutField } from './types';

  const getGrowers = () => ['G1', 'G2', 'G3', 'G4', 'G5','G1', 'G2', 'G3', 'G4', 'G5'];

  const getScouts = () => ['S1', 'S2', 'S3', 'S4', 'S5'];

  const title = '旅游地点调研';

  const headings = [
    {title: 'Scout', property: 'scoutName', getOptions: getScouts, width: 75, type: 'select', show: true},
    {
      title: 'Grower',
      property: 'growerName',
      getOptions: getGrowers,
      type: 'select',
      show: true,
      width: 85
    },
    {title: 'Field', property: 'fieldName', width: 200, type: 'text', show: true},
    {title: 'Acres', property: 'acres', type: 'number' , show: true},
    {title: '打分', property: 'rate', type: 'rate' , show: true}
  ];

  const data = [
    {scoutName: 'S1', growerName: 'G1', fieldName: 'F1', acres: 100, rate: 0},
    {scoutName: 'S1', growerName: 'G2', fieldName: 'F2', acres: 200, rate: 1},
    {scoutName: 'S2', growerName: 'G3', fieldName: 'F3', acres: 300, rate: 2},
    {scoutName: 'S2', growerName: 'G4', fieldName: 'F4', acres: 400, rate: 3}
  ];
</script>

<main>
  <Table {headings} {data} {title} />
</main>

<style>
</style>
