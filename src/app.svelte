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
      show: false,
      width: 85
    },
    {title: 'Field', property: 'fieldName', width: 200, type: 'text', show: true},
    {title: 'Acres', property: 'acres', type: 'number' , show: true},
    {title: '打分', property: 'rate', type: 'rate' , show: true},
    {title: '货币', property: 'currency', type: 'currency' , show: true},
    {title: '百分比', property: 'percent', type: 'percent' , show: true},
    {title: '日期', property: 'date', type: 'date' , show: true},
    {title: '附件', property: 'file', type: 'fileDropZone' , show: true},
    {title: '网址', property: 'website', type: 'website' , show: true},
    {title: '勾选', property: 'checkbox', type: 'checkbox' , show: true},
  ];

  const data = [
    {scoutName: 'S1', growerName: 'G1', fieldName: 'F1', acres: 100, rate: 0, currency: 10000, percent: 0.01, date: 1621239215963, file: null, checkbox: 0, website: 'www.baidu.com'},
    {scoutName: 'S1', growerName: 'G2', fieldName: 'F2', acres: 200, rate: 1, currency: 20000, percent: 0.02, date: 1577836800000, file: null, checkbox: 1, website: 'www.google.com'},
    {scoutName: 'S2', growerName: 'G3', fieldName: 'F3', acres: 300, rate: 2, currency: 30000, percent: 0.03, date: 1621239115963, file: null, checkbox: 1, website: 'www.idgcapital.com'},
    {scoutName: 'S2', growerName: 'G4', fieldName: 'F4', acres: 400, rate: 3, currency: 40000, percent: 0.04, date: 1621238215963, file: null, checkbox: 0, website: 'www.baidu.com'}
  ];
</script>

<main>
  <Table {headings} {data} {title} />
</main>

<style>
</style>
