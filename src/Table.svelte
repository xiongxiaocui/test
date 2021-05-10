<script lang="ts">
  import type {Heading, ScoutField} from './types';
  import Modal from './components/modal/Modal.svelte';
  import AddContent from './components/operations/AddContent.svelte'
  import HideContent from './components/operations/HideContent.svelte'
  // import HeaderOperation from './components/header/popup.svelte'
  import SearchOperation from './components/operations/SearchContent.svelte'
  import FilterOperation from './components/operations/FilterContent.svelte'
  import GroupOperation from './components/operations/GroupContent.svelte'
  import RankOperation from './components/operations/RankContent.svelte'
  import HeightOperation from './components/operations/HeightContent.svelte'
  export let data: ScoutField[];
  export let headings: Heading[];
  export let title: string;

  let editIndex: number;
  let editProperty: string;
  let table: HTMLTableElement;
  // let headerPopref: HTMLDivElement
  let filteredData

  let filterSearchStr

  let styles = {
		'row-height': '42px'
	};

	$: cssVarStyles = Object.entries(styles)
		.map(([key, value]) => `--${key}:${value}`)
		.join(';');


  function deleteRow(index: number): void {
    data.splice(index, 1);
    data = data;
  }

  function editCell(index: number, property: string): void {
    editIndex = index;
    editProperty = property;
  }

  function getStyle(heading: Heading) {
    const {width} = heading;
    return width ? `width: ${width}px` : '';
  }

  const handleBlur = () => (editProperty = '');

  function handleKey(event: KeyboardEvent): void {
    const {code} = event;
    if (code === 'Enter' || code === 'Escape') editProperty = '';
  }

  function insertRowAfter(index: number): void {
    const item: ScoutField = {
      scoutName: '',
      growerName: '',
      fieldName: '',
      acres: 0
    };
    data.splice(index + 1, 0, item);
    data = data;
  }

  function saveChange(event, index: number, property: string): void {
    data[index][property] = event.target.value;
    data = data;
    if (event.target.nodeName === 'SELECT') editProperty = '';
  }

  const selectAll = (input: HTMLInputElement) => input.select();

  // 插入行
  function addRow() {
    const len = data.length;
    insertRowAfter(len - 1);
  }

  // 编辑头部
  const editHeader = (el, option) => {
    console.log(el)
    console.log(option)
  }

  // 获取变化的数据
  const handleSearchData = (data) => {
    filteredData = data
  }

  // 筛选变化的数据
  const handleFilter = (e) => {
    // console.log(obj)
    const {detail} = e
    console.log(detail)
    filterSearchStr = detail.value
    filteredData = data.filter((o, oi) => {
      const values = Object.values(o).map(item => String(item).toLowerCase())
      const searchIgnore = filterSearchStr && filterSearchStr.toLocaleLowerCase()
      if (filterSearchStr === '') {
        return true
      }
      const result = values.filter((item, ii) =>{
        if (item.includes(searchIgnore)) {
          return true
        }
        return false
      })
      if (result.length >0) {
        return o
      }
      return false
    })
    // console.log(filterSearchStr)
    // console.log(option, "-----")
  }

// 修改杭高
const handleHeight = e => {
  // console.log(val)
  const {detail} = e
  console.log(detail)
  const heightMap = {
    default: "42px",
    medium: '60px',
    high: '80px',
    highest: '120px'
  }
  styles['row-height'] = heightMap[detail]
}
// 设置全选
let isAllSelected = false
const handleToggleSelectAll = () => {
  isAllSelected = !isAllSelected
}
</script>

<section style="{cssVarStyles}">
  <h1>{title}</h1>
  <!-- 操作按钮开始 -->
  <div class="actions">
    <Modal>
      <AddContent on:addRow={addRow} bind:headings={headings}></AddContent>
    </Modal>
      <HideContent bind:headings={headings}></HideContent>
      <FilterOperation  bind:headings={headings} on:filter-table="{handleFilter}"></FilterOperation>
      <GroupOperation  bind:headings={headings} on:filter-table="{handleFilter}"></GroupOperation>
      <RankOperation  bind:headings={headings} on:filter-table="{handleFilter}"></RankOperation>
      <HeightOperation  bind:headings={headings} on:changeHeight="{handleHeight}"></HeightOperation>
      <SearchOperation data={data} onChange="{handleSearchData}"></SearchOperation>
  </div>
  <!-- 操作按钮结束 -->
  <table id="table" bind:this={table} class="display nowrap">
    <thead>
      <tr>
        <th>
          <div class="headerIcon" on:click="{handleToggleSelectAll}">
            <svg fill={isAllSelected? "#7B67EE": "#8C8C8C"} viewBox="0 0 15 15" width="15" height="15">
              {#if isAllSelected}
                <path class="common_icon_multiple_select_svg__st0" d="M13 1H2c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h11c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zm-1.4 5l-4.3 4.2c-.1.1-.3.2-.5.2s-.4-.1-.5-.2L3.5 7.4c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l2.3 2.3 3.7-3.7c.3-.3.8-.3 1.1 0 .2.3.2.8-.1 1.1z"></path>
                {:else}
                <path class="common_icon_multiple_normal_svg__st0" d="M12.2 1H2.8C1.8 1 1 1.8 1 2.8v9.5c0 1 .8 1.8 1.8 1.8h9.5c1 0 1.8-.8 1.8-1.8V2.8c-.1-1-.9-1.8-1.9-1.8zm.3 11.2c0 .1-.1.2-.2.2H2.8c-.1 0-.2-.1-.2-.2V2.8c0-.1.1-.2.2-.2h9.5c.1 0 .2.1.2.2v9.4z">
              </path>
              {/if}

						</svg>
					</div>
        </th>
        {#each headings as heading}
          {#if heading.show}
            <th on:click="{editHeader.bind(this, heading)}" style={getStyle(heading)}>{heading.title}</th>
          {/if}
        {/each}
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each filteredData as obj, index}
        <tr>
          <td>{index + 1}</td>
          {#each headings as heading}
            {#if heading.show}
              <td on:dblclick={() => editCell(index, heading.property)}>
                {#if editIndex === index && editProperty === heading.property}
                  {#if heading.getOptions}
                    <select
                      on:blur={e => saveChange(e, index, heading.property)}
                      on:change={e => saveChange(e, index, heading.property)}
                      value={obj[heading.property]}>
                      {#each heading.getOptions() as option}
                        <option value={option}>{option}</option>
                      {/each}
                    </select>
                  {:else}
                    <input
                      on:blur={handleBlur}
                      on:keydown={handleKey}
                      style={getStyle(heading)}
                      type={heading.type}
                      use:selectAll
                      on:change={e => saveChange(e, index, heading.property)}
                      value={data[index][heading.property]} />
                  {/if}
                {:else}<span>{obj[heading.property]}</span>{/if}
              </td>
            {/if}
          {/each}
          <td class="actions">
            <button on:click={() => deleteRow(index)} title="delete">✖</button>
            <button
              on:click={() => insertRowAfter(index)}
              title="insert after">➕</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</section>

<style>
  .actions button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    margin-bottom: 0;

  }

  input,
  select {
    margin-bottom: 0;
  }

  section :global(.clone-table),
  section :global(table) {
    border-collapse: collapse;
  }

  section :global(.draggable) {
    cursor: ns-resize;
    user-select: none;
  }

  section :global(.dragging) {
    background: white;
    z-index: 999; /* probably don't need this */
  }

  section :global(.placeholder) {
    --border-width: 2px;
    --fudge: 3px;
    background-color: #edf2f7;
    border: var(--border-width) dashed #cbd5e0;
    height: calc(var(--row-height) - 2 * var(--border-width) - var(--fudge));
  }

  section :global(td),
  section :global(th) {
    border: 1px solid lightgray;
    padding: 0 10px !important;
  }

  section :global(.clone-list td) {
    border-top-width: 0;
  }

  section :global(.dragging td) {
    border-top-width: 1px;
  }

  section :global(tr) {
    height: var(--row-height);
  }
  .actions {
    background-color: #f2f4f6;
    padding: 10px;
  }
  * {
    box-sizing: border-box;
  }
  button {
    cursor: pointer;
  }
</style>
