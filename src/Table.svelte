<script lang="ts">
	import SingleMenu from './components/contextMenu/SingleMenu.svelte';
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
  import DeleteMenu from './components/contextMenu/DeleteMenu.svelte'
  import Rate from './components/cellTypes/base/rate.svelte'
  import clickOutside from './clickOutside.js'
  import SingleSelect from './UI/SingleSelect.svelte';
  import Currency from './components/cellTypes/base/currency.svelte'
  import Percent from './components/cellTypes/base/percent.svelte'
  import { money, percent } from './format-number'
  import {DatePicker} from 'attractions'
  export let data: ScoutField[];
  export let headings: Heading[];
  export let title: string;
  let currency = '¥'

  let editIndex: number;
  let editProperty: string;
  let activePropery: string
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

  function deleteSingleRow():void {
    const data = filteredData && filteredData.filter(item => !item.checked)
    filteredData = data
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
    filteredData.splice(index + 1, 0, item);
    filteredData = filteredData;
  }

  function saveChange(event, index: number, property: string): void {
    filteredData[index][property] = event.target.value;
    filteredData = filteredData;
    if (event.target.nodeName === 'SELECT') editProperty = '';
  }

  const selectAll = (input: HTMLInputElement) => input.select();

  // 插入行
  function addRow() {
    const len = filteredData.length;
    insertRowAfter(len - 1);
    // console.log('after')
  }

  // 向上插入行
  function insertRowBefore() {
    const index = filteredData && filteredData.findIndex(item => item.checked)
    insertRowAfter(index - 1)
  }

  // 向下插入行
  function handleInsertAfter() {
    const index = filteredData && filteredData.findIndex(item => item.checked)
    insertRowAfter(index)
  }

  // 复制行
  function copyRow() {
    const index = filteredData && filteredData.findIndex(item => item.checked)
    const item: ScoutField = {...filteredData[index], checked:false}
    filteredData.splice(index + 1, 0, item);
    filteredData = filteredData;
  }

  // 展开行
  function expandRow() {}

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
  }

// 修改行高
const handleHeight = e => {
  const { detail } = e
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
  filteredData.map(item => item.checked = isAllSelected)
}

$:isAllChecked = filteredData && filteredData.filter(item => !item.checked).length === 0

$:totalCount = filteredData && filteredData.length

$:checkedCount = filteredData && filteredData.filter(item => item.checked).length


// alert(checkedCount)

// 选中某行的时候，出现选择对话框，并且悬浮色
const handleTrEnter = (index) => {
  filteredData[index].isHover = true
}
// 某一行消失的时候，还原
const handleTrMove = index => {
  filteredData[index].isHover = false
}

// handle checked
const handleToggleChecked = index => {
  const isChecked = filteredData[index].checked
  filteredData[index].checked = !isChecked
}

const showEditStatus = (index, property) => {
  editIndex = index;
  activePropery = property;
}
// todo 增加点击其他地方 还原编辑状态
const resetEditStatus = (index, property) => {
  console.log("reset")
  activePropery = null
  editIndex = null
}

$: showDeleteIcon = isAllSelected || isAllChecked || filteredData && checkedCount > 1
$: showSingleComp = filteredData && checkedCount === 1
// 删除所有数据
const handleDeleteAll = () => {
  filteredData = filteredData && filteredData.filter(item => !item.checked)
}

// 插入行进行补充
const fillRow = data => {
  // console.log(data)
  const {detail} = data
  // const values = Object.values(detail)
  const keys = Object.keys(detail)
  const len = filteredData && filteredData.length - 1
  keys.forEach(item => {
    filteredData[len][item] = detail[item]
  })
}

const beforeRate = rate => {
  console.log(rate);
};
const afterRate = rate => {
  console.log(rate);
};

const handleCurrency = (val,index, property) => {
  filteredData[index][property] = val
}

const handleTimeChange = (val, index, property) => {
  console.log(11)
  const {detail} = val
  console.log(val)
  console.log(index)
  console.log(property)
  filteredData[index][property] = detail && detail.value
}
</script>

<section style="{cssVarStyles}">
  <h1>{title}</h1>
  <!-- 操作按钮开始 -->
  <div class="actions">
    <Modal>
      <AddContent on:addRow={addRow} on:fillRow={fillRow} bind:headings={headings}></AddContent>
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
            <svg fill={isAllSelected || isAllChecked ? "#7B67EE": "#8C8C8C"} viewBox="0 0 15 15" width="15" height="15">
              {#if isAllSelected || isAllChecked}
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
      </tr>
    </thead>
    <tbody>
      {#if filteredData.length}
        {#each filteredData as obj, index}
          <tr class={obj.checked ? "selected": ""} on:mouseenter="{handleTrEnter.bind(this, index)}" on:mouseleave="{handleTrMove.bind(this, index)}">
            <td>
              {#if obj.isHover}
                {#if obj.checked}
                  <svg class='cursor' on:click="{handleToggleChecked.bind(this, index)}" viewBox="0 0 15 15" width="15" height="15" fill="#7B67EE"><path class="common_icon_multiple_select_svg__st0" d="M13 1H2c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h11c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zm-1.4 5l-4.3 4.2c-.1.1-.3.2-.5.2s-.4-.1-.5-.2L3.5 7.4c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l2.3 2.3 3.7-3.7c.3-.3.8-.3 1.1 0 .2.3.2.8-.1 1.1z"></path></svg>
                  {:else}
                  <svg class='cursor' on:click="{handleToggleChecked.bind(this, index)}" viewBox="0 0 15 15" width="15" height="15"><path class="common_icon_multiple_normal_svg__st0 svelte-1lgyxdi" d="M12.2 1H2.8C1.8 1 1 1.8 1 2.8v9.5c0 1 .8 1.8 1.8 1.8h9.5c1 0 1.8-.8 1.8-1.8V2.8c-.1-1-.9-1.8-1.9-1.8zm.3 11.2c0 .1-.1.2-.2.2H2.8c-.1 0-.2-.1-.2-.2V2.8c0-.1.1-.2.2-.2h9.5c.1 0 .2.1.2.2v9.4z"></path></svg>
                {/if}
              {:else if isAllSelected || obj.checked || isAllChecked}
                <svg class='cursor' on:click="{handleToggleChecked.bind(this, index)}" viewBox="0 0 15 15" width="15" height="15" fill="#7B67EE"><path class="common_icon_multiple_select_svg__st0" d="M13 1H2c-.6 0-1 .4-1 1v11c0 .6.4 1 1 1h11c.6 0 1-.4 1-1V2c0-.6-.4-1-1-1zm-1.4 5l-4.3 4.2c-.1.1-.3.2-.5.2s-.4-.1-.5-.2L3.5 7.4c-.3-.3-.3-.8 0-1.1s.8-.3 1.1 0l2.3 2.3 3.7-3.7c.3-.3.8-.3 1.1 0 .2.3.2.8-.1 1.1z"></path></svg>
              {:else}
                <span on:click="{handleToggleChecked.bind(this, index)}">{index + 1}</span>
              {/if}
            </td>
            {#each headings as heading}
              {#if heading.show}
                <td class={editIndex === index && (editProperty === heading.property|| activePropery === heading.property) ? "active": ""} on:dblclick={() => editCell(index, heading.property)} on:click="{() => showEditStatus(index, heading.property)}">
                  {#if editIndex === index && editProperty === heading.property && heading.type !== 'rate'}
                    {#if heading.getOptions}
                      <select
                        on:blur={e => saveChange(e, index, heading.property)}
                        on:change={e => saveChange(e, index, heading.property)}
                        value={obj[heading.property]}>
                        {#each heading.getOptions() as option}
                          <option value={option}>{option}</option>
                        {/each}
                      </select>
                    {:else if heading.type === 'number' || heading.type === 'text'}
                      <input
                        on:blur={handleBlur}
                        on:keydown={handleKey}
                        style={getStyle(heading)}
                        type={heading.type}
                        use:selectAll
                        on:change={e => saveChange(e, index, heading.property)}
                        value={filteredData[index][heading.property]} />
                    {:else if heading.type === 'currency'}
                      <Currency onChange={(val) => handleCurrency(val, index, heading.property)} initialValue={filteredData[index][heading.property]}></Currency>
                    {:else if heading.type === 'percent'}
                      <Percent onChange={(val) => handleCurrency(val, index, heading.property)} initialValue={filteredData[index][heading.property]}></Percent>
                    {/if}
                    {:else if heading.type === 'rate'}
                      <Rate {beforeRate}
                        {afterRate}
                        value={obj[heading.property]}
                        length={5}
                        showCount={false} />
                    {:else if heading.type === 'date'}
                      <!-- <div>{obj[heading.property]}</div> -->
                      <DatePicker value={new Date(obj[heading.property])} on:change={(val) => handleTimeChange(val,index, heading.property)} format="%m/%d/%Y"></DatePicker>
                  {:else}
                      {#if heading.property === 'currency'}
                        {currency}{money(obj[heading.property])}
                        {:else if heading.type === 'percent'}
                          {percent(obj[heading.property])}
                        {:else}
                          <span>{obj[heading.property]}</span>
                      {/if}
                  {/if}
                </td>
              {/if}
            {/each}
          </tr>
        {/each}
        {:else}
        <tr><td class='no-data' colspan="{headings.length+1}">暂无数据</td></tr>
      {/if}
    </tbody>
  </table>
</section>
{#if showDeleteIcon }
  <DeleteMenu totalCount={checkedCount} on:deleteAll={handleDeleteAll}></DeleteMenu>
{/if}
{#if showSingleComp}
  <SingleMenu
    on:deleteSingleItem={deleteSingleRow}
    on:insertRowBefore={insertRowBefore}
    on:insertRowAfter={handleInsertAfter}
    on:copyRow={copyRow}
    on:expandRow={expandRow}
  ></SingleMenu>
{/if}
<style>

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
  .cursor{
    cursor: pointer;
    display:block;
  }
  .selected {
    background: #dcd6ff;
  }
  td.active{
    box-shadow: 0 0 0 1px #7b67ee;
    border: 2px solid #7b67ee;
  }
  .no-data {
    text-align:center;
  }
</style>
