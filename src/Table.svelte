<script lang="ts">
  import type {Heading, ScoutField} from './types';
  import Modal from './components/modal/Modal.svelte';
  import AddContent from './components/operations/AddContent.svelte'
  import HideContent from './components/operations/HideContent.svelte'
  import HeaderOperation from './components/header/popup.svelte'
  import SearchOperation from './components/operations/SearchContent.svelte'
  import FilterOperation from './components/operations/FilterContent.svelte'
  export let data: ScoutField[];
  export let headings: Heading[];
  export let title: string;

  let editIndex: number;
  let editProperty: string;
  let table: HTMLTableElement;
  let headerPopref: HTMLDivElement
  let filteredData

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
  const handleSearchData = (data, key) => {
    filteredData = data
    // search = key
  }
</script>

<section>
  <h1>{title}</h1>
  <!-- 操作按钮开始 -->
  <div class="actions">
    <Modal>
      <AddContent on:addRow={addRow} bind:headings={headings}></AddContent>
    </Modal>
      <HideContent bind:headings={headings}></HideContent>
      <FilterOperation  bind:headings={headings}></FilterOperation>
    <button
      type="button"
      class="btn"><span
        class="btn-icon"><svg
          viewBox="0 0 16 16"
          width="16"
          height="16"
          class=""
          fill="#636363"><path
            d="M11 3H5c-1.1 0-2 .9-2 2v1h10V5c0-1.1-.9-2-2-2zm.5 4h-7C3.7 7 3 7.7 3 8.5S3.7 10 4.5 10h7c.8 0 1.5-.7 1.5-1.5S12.3 7 11.5 7zM3 12c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2v-1H3v1z" /></svg></span><span>分组</span></button>
    <button
      type="button"
      class="btn"><span
        class="btn-icon"><svg
          viewBox="0 0 1024 1024"
          width="16"
          height="16"
          fill="#636363"
          class=""><path
            d="M426.5 153.4c-1.2-1.3-2.4-2.5-3.7-3.7-14.4-13.5-33.6-21.7-54.8-21.7-10.8 0-21 2.1-30.4 6-9.5 3.9-18.4 9.7-26.2 17.5L108 354.9c-31.2 31.2-31.2 81.9 0 113.1 31.2 31.2 81.9 31.2 113.1 0l66.9-66.9V816c0 44.2 35.8 80 80 80s80-35.8 80-80V208c0-11.2-2.3-21.8-6.4-31.5-3.6-8.3-8.6-16.2-15.1-23.1zM916 556c-31.2-31.2-81.9-31.2-113.1 0L736 622.9V208c0-44.2-35.8-80-80-80s-80 35.8-80 80v608c0 21.1 8.2 40.3 21.5 54.6 1.2 1.3 2.5 2.6 3.9 3.9 6.9 6.5 14.8 11.5 23.1 15.1 9.7 4.2 20.3 6.5 31.5 6.5s21.9-2.3 31.5-6.5c8.3-3.6 16.1-8.6 23.1-15.1.7-.7 1.5-1.4 2.2-2.1L916 669.1c31.2-31.2 31.2-81.9 0-113.1z" /></svg></span><span>排序</span></button>
      <SearchOperation data={data} onChange="{handleSearchData}"></SearchOperation>
  </div>
  <!-- 操作按钮结束 -->
  <table id="table" bind:this={table} class="display nowrap" style="width:100%">
    <thead>
      <tr>
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
    padding: 0 6px;
  }

  input,
  select {
    margin-bottom: 0;
  }

  section {
    --row-height: 52px;
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
    padding: 0.5rem;
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
  .hidden {
    display: none!important;
  }
  .block{
    display:block;
  }

</style>
